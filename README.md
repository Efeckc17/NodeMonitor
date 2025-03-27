# NodeMonitor

NodeMonitor is a lightweight, self-hosted web dashboard to monitor system resources in real-time.

✨ Built with Node.js + Plain JS frontend for performance and minimal footprint.

---

## 🔧 Features

- 🧠 **CPU Monitoring** – Model, usage %, temperature, core count
- 🧊 **Memory Usage** – Active memory / total memory + RAM usage %
- 💽 **Disk I/O** – Read/write speed per second
- 🌐 **Network** – RX/TX (download/upload) speed
- 📦 **Storage** – Disk usage percentage
- 🧯 **GPU Info** – Temp, usage, memory
- 🔐 **SSH Connections** – Active sessions and users
- 🚪 **Open Ports** – Shows current open ports
- 📋 **Processes** – PID, user, CPU/RAM usage, command
- 🕒 **Uptime & System Time**
- 🌍 **Internal & External IP addresses**

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Efeckc17/NodeMonitor.git
cd NodeMonitor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file (optional for config)

```bash
touch .env
```

### 4. Run the server

```bash
node server/index.js
```

---

## 📡 Access

Once running, visit:

```
http://localhost:3000
```

---

## 📁 Project Structure

```
NodeMonitor
├── client
│   ├── components/
│   ├── app.js
│   ├── index.html
│   └── style.css
├── server
│   ├── services/
│   ├── index.js
│   ├─  .env
│   └── test-info.js
├── package.json
└── README.md
```

---

## 📜 License

MIT License © 2025 [Efeckc17](https://github.com/Efeckc17)
