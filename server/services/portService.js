const { exec } = require("child_process");

function getOpenPortsList() {
  return new Promise((resolve, reject) => {
    exec("ss -tuln", (error, stdout) => {
      if (error) return reject(error);
      const lines = stdout.split("\n").slice(1);
      const ports = [];
      lines.forEach(line => {
        if (!line.trim()) return;
        const parts = line.trim().split(/\s+/);
        let local = parts[4];
        let port = local.split(":").pop();
        let protocol = parts[0];
        ports.push({ protocol, port, local });
      });
      resolve(ports);
    });
  });
}

module.exports = { getOpenPortsList };
