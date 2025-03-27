const si = require("systeminformation");

async function getCPUTemperature() {
  const tempData = await si.cpuTemperature();
  return tempData.main !== -1 ? tempData.main.toFixed(2) : "N/A";
}

module.exports = { getCPUTemperature };
