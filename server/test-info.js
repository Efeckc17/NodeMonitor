const si = require("systeminformation");

async function testAll() {
  try {
    const cpu = await si.cpu();
    const temp = await si.cpuTemperature();
    const mem = await si.mem();
    const fans = si.fans ? await si.fans() : 'fans() fonksiyonu yok';
    const graphics = await si.graphics();
    const net = await si.networkInterfaces();
    const time = await si.time();

    console.log("CPU:", cpu);
    console.log("CPU Temp:", temp);
    console.log("Memory:", mem);
    console.log("Fans:", fans);
    console.log("GPU/Graphics:", graphics);
    console.log("Network Interfaces:", net);
    console.log("System Time:", time);
  } catch (err) {
    console.error("HATA:", err);
  }
}

testAll();
