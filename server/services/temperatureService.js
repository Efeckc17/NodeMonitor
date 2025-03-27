const si = require("systeminformation");

async function getCPUTemperature() {
  const tempData = await si.cpuTemperature();
  const mainTemp = tempData.main;

  if (typeof mainTemp === "number" && !isNaN(mainTemp) && mainTemp !== -1) {
    return mainTemp.toFixed(2);
  } else {
    return "N/A";
  }
}

module.exports = { getCPUTemperature };
