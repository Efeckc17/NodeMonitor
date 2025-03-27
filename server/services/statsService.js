const si = require("systeminformation");
const axios = require("axios");

async function getInternalIP() {
  try {
    const interfaces = await si.networkInterfaces();
    const internal = interfaces.find(i => !i.internal && i.ip4 && i.ip4.startsWith("192.168"));
    if (internal) return internal.ip4;
    const nonInternal = interfaces.find(i => !i.internal && i.ip4);
    return nonInternal ? nonInternal.ip4 : "";
  } catch {
    return "";
  }
}

async function getExternalIP() {
  try {
    const res = await axios.get("https://api64.ipify.org?format=json", { timeout: 2000 });
    return res.data.ip || "";
  } catch {
    return "";
  }
}

async function getStats() {
  let cpuLoad = {}, memory = {}, cpuInfo = {}, diskIO = {}, network = [{}], disks = [], cpuTemp = {}, gpuInfo = {}, sysTime = {};
  try { cpuLoad = await si.currentLoad(); } catch {}
  try { memory = await si.mem(); } catch {}
  try { cpuInfo = await si.cpu(); } catch {}
  try { diskIO = await si.disksIO(); } catch {}
  try { network = await si.networkStats(); } catch {}
  try { disks = await si.fsSize(); } catch {}
  try { cpuTemp = await si.cpuTemperature(); } catch {}
  try { gpuInfo = await si.graphics(); } catch {}
  try { sysTime = await si.time(); } catch {}

  let storage = "";
  try {
    const totalUsage = disks.reduce((acc, d) => acc + (d.use || 0), 0);
    storage = disks.length ? (totalUsage / disks.length).toFixed(2) : "";
  } catch {}

  let gpuTempValue = "";
  try {
    if (gpuInfo.controllers && gpuInfo.controllers.length > 0 && gpuInfo.controllers[0].temperatureGpu !== undefined && gpuInfo.controllers[0].temperatureGpu !== null) {
      gpuTempValue = gpuInfo.controllers[0].temperatureGpu.toFixed(2);
    }
  } catch {}

  let fanSpeeds = "";
  if (typeof si.fans === "function") {
    try {
      const fans = await si.fans();
      if (fans && fans.length > 0) {
        fanSpeeds = fans.map(f => f.rpm).filter(rpm => rpm !== undefined && rpm !== null).join(", ");
      }
    } catch {}
  }

  const internalIP = await getInternalIP();
  const externalIP = await getExternalIP();

  return {
    cpu: cpuLoad.currentLoad != null ? cpuLoad.currentLoad.toFixed(2) : "",
    cpuAvg: cpuLoad.avgLoad != null ? cpuLoad.avgLoad.toFixed(2) : "",
    ram: memory.active != null && memory.total ? ((memory.active / memory.total) * 100).toFixed(2) : "",
    memDetail: memory.active != null && memory.total ? `${memory.active} / ${memory.total}` : "",
    cpuModel: cpuInfo.manufacturer && cpuInfo.brand ? `${cpuInfo.manufacturer} ${cpuInfo.brand}` : "",
    cpuTemp: cpuTemp.main != null && cpuTemp.main !== -1 ? cpuTemp.main.toFixed(2) : "",
    diskIO: {
      read: diskIO.rIO_sec != null ? diskIO.rIO_sec.toFixed(2) : "",
      write: diskIO.wIO_sec != null ? diskIO.wIO_sec.toFixed(2) : ""
    },
    netRx: network[0] && network[0].rx_sec != null ? (network[0].rx_sec / 1024).toFixed(2) : "",
    netTx: network[0] && network[0].tx_sec != null ? (network[0].tx_sec / 1024).toFixed(2) : "",
    storage,
    gpuTemp: gpuTempValue,
    fanSpeeds,
    uptime: sysTime.uptime != null ? sysTime.uptime : "",
    currentTime: sysTime.current ? new Date(sysTime.current).toLocaleString() : "",
    ips: {
      internal: internalIP,
      external: externalIP
    }
  };
}

module.exports = { getStats };
