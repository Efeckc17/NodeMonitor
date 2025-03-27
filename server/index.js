const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const statsService = require("./services/statsService");
const processService = require("./services/processService");
const portService = require("./services/portService");
const sshService = require("./services/sshService");
const temperatureService = require("./services/temperatureService");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("client"));

io.on("connection", (socket) => {
  const interval = setInterval(async () => {
    try {
      const stats = await statsService.getStats();
      const processes = await processService.getProcessList();
      const openPorts = await portService.getOpenPortsList();
      const sshConnections = await sshService.getSSHConnections();
      const cpuTemp = await temperatureService.getCPUTemperature();

      const data = {
        cpu: stats.cpu,
        ram: stats.ram,
        diskIO: stats.diskIO,
        netRx: stats.netRx,
        netTx: stats.netTx,
        storage: stats.storage,
        processes,
        openPorts,
        sshConnections,
        cpuTemp
      };

      socket.emit("stats", data);
    } catch (error) {
      console.error(error);
    }
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
