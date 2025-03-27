const si = require("systeminformation");

async function getProcessList() {
  const procData = await si.processes();
  let list = procData.list.map(proc => ({
    pid: proc.pid,
    user: proc.user,
    cpu: proc.cpu,
    mem: proc.mem,
    command: proc.command
  }));
  list.sort((a, b) => b.cpu - a.cpu);
  return list;
}

module.exports = { getProcessList };
