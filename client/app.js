const socket = io();
let processData = [];
let portsData = [];
let sshData = [];
const userFilterEl = document.getElementById("userFilter");

socket.on("stats", (data) => {
  document.getElementById("cpuModel").innerText = data.cpuModel || "";
  document.getElementById("cpuUsage").innerText = data.cpu ? "Usage: " + data.cpu + " %" : "";
  document.getElementById("cpuTemp").innerText = data.cpuTemp ? "Temp: " + data.cpuTemp + " °C" : "";
  document.getElementById("cpuAvg").innerText = data.cpuAvg ? "Avg Load: " + data.cpuAvg : "";
  document.getElementById("ramUsage").innerText = data.ram ? "Usage: " + data.ram + " %" : "";
  document.getElementById("ramDetail").innerText = data.memDetail || "";
  document.getElementById("diskIO").innerText = (data.diskIO && data.diskIO.read && data.diskIO.write) ? "Read: " + data.diskIO.read + " IOPS, Write: " + data.diskIO.write + " IOPS" : "";
  document.getElementById("network").innerText = (data.netRx && data.netTx) ? "RX: " + data.netRx + " KB/s, TX: " + data.netTx + " KB/s" : "";
  document.getElementById("storage").innerText = data.storage ? "Usage: " + data.storage + " %" : "";
  document.getElementById("gpuTemp").innerText = data.gpuTemp ? "GPU Temp: " + data.gpuTemp : "";
  document.getElementById("fanSpeeds").innerText = data.fanSpeeds ? "Fan Speeds: " + data.fanSpeeds : "";
  document.getElementById("uptime").innerText = data.uptime ? "Uptime: " + data.uptime + " sec" : "";
  document.getElementById("currentTime").innerText = data.currentTime ? "Current Time: " + data.currentTime : "";
  document.getElementById("internalIP").innerText = (data.ips && data.ips.internal) ? "Internal IP: " + data.ips.internal : "";
  document.getElementById("externalIP").innerText = (data.ips && data.ips.external) ? "External IP: " + data.ips.external : "";
  
  processData = data.processes || [];
  portsData = data.openPorts || [];
  sshData = data.sshConnections || [];
  renderProcessTable();
  renderPortsTable();
  renderSSHTable();
});

userFilterEl.addEventListener("change", renderProcessTable);

function renderProcessTable() {
  const filter = userFilterEl.value;
  const tableBody = document.getElementById("processTable");
  tableBody.innerHTML = "";
  let filtered = processData;
  if (filter !== "all") {
    filtered = processData.filter(proc => filter === "root" ? proc.user === "root" : proc.user !== "root");
  }
  filtered.forEach(proc => {
    const tr = document.createElement("tr");
    tr.innerHTML = "<td class='border px-2 py-1'>" + (proc.pid || "") + "</td><td class='border px-2 py-1'>" + (proc.user || "") + "</td><td class='border px-2 py-1'>" + (proc.cpu ? proc.cpu.toFixed(2) : "") + "</td><td class='border px-2 py-1'>" + (proc.mem ? proc.mem.toFixed(2) : "") + "</td><td class='border px-2 py-1'>" + (proc.command || "") + "</td>";
    tableBody.appendChild(tr);
  });
}

function renderPortsTable() {
  const tableBody = document.getElementById("portsTable");
  tableBody.innerHTML = "";
  portsData.forEach(port => {
    const tr = document.createElement("tr");
    tr.innerHTML = "<td class='border px-2 py-1'>" + (port.protocol || "") + "</td><td class='border px-2 py-1'>" + (port.port || "") + "</td><td class='border px-2 py-1'>" + (port.local || "") + "</td>";
    tableBody.appendChild(tr);
  });
}

function renderSSHTable() {
  const tableBody = document.getElementById("sshTable");
  tableBody.innerHTML = "";
  sshData.forEach(conn => {
    const tr = document.createElement("tr");
    tr.innerHTML = "<td class='border px-2 py-1'>" + (conn.user || "") + "</td><td class='border px-2 py-1'>" + (conn.tty || "") + "</td><td class='border px-2 py-1'>" + (conn.date || "") + "</td><td class='border px-2 py-1'>" + (conn.time || "") + "</td><td class='border px-2 py-1'>" + (conn.host || "") + "</td>";
    tableBody.appendChild(tr);
  });
}
