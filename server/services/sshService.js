const { exec } = require("child_process");

function getSSHConnections() {
  return new Promise((resolve, reject) => {
    exec("who", (error, stdout) => {
      if (error) return reject(error);
      const lines = stdout.split("\n").filter(line => line.includes("pts/"));
      const connections = lines.map(line => {
        const parts = line.trim().split(/\s+/);
        return {
          user: parts[0],
          tty: parts[1],
          date: parts[2],
          time: parts[3],
          host: parts[4] || ""
        };
      });
      resolve(connections);
    });
  });
}

module.exports = { getSSHConnections };
