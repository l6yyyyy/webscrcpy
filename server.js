const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 存储设备信息和scrcpy进程
const devices = new Map();
const scrcpyProcesses = new Map();

// 扫描设备
function scanDevices() {
  return new Promise((resolve, reject) => {
    exec('adb devices', (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      
      const lines = stdout.trim().split('\n');
      const deviceList = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const [deviceId, status] = line.split('\t');
          deviceList.push({ id: deviceId, status });
        }
      }
      
      resolve(deviceList);
    });
  });
}

// 启动scrcpy
function startScrcpy(deviceId, socket) {
  // 停止已有的scrcpy进程
  if (scrcpyProcesses.has(deviceId)) {
    scrcpyProcesses.get(deviceId).kill();
  }
  
  // 启动scrcpy进程
  const scrcpy = spawn('scrcpy', [
    '--serial', deviceId,
    '--no-display',
    '--no-control',
    '--record', '-',
    '--codec', 'h264',
    '--max-fps', '30'
  ]);
  
  scrcpyProcesses.set(deviceId, scrcpy);
  
  // 处理视频流
  scrcpy.stdout.on('data', (data) => {
    socket.emit('video-stream', data);
  });
  
  scrcpy.stderr.on('data', (data) => {
    console.error(`scrcpy stderr: ${data}`);
  });
  
  scrcpy.on('close', (code) => {
    console.log(`scrcpy process closed with code ${code}`);
    scrcpyProcesses.delete(deviceId);
  });
  
  return scrcpy;
}

// 发送控制指令
function sendControl(deviceId, action, data) {
  // 这里实现控制指令的发送
  // 可以使用adb shell input命令
  console.log(`Sending control ${action} to ${deviceId}`);
}

// 处理Socket.io连接
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // 扫描设备
  socket.on('scan-devices', async () => {
    try {
      const deviceList = await scanDevices();
      socket.emit('devices', deviceList);
    } catch (error) {
      console.error('Error scanning devices:', error);
      socket.emit('error', 'Failed to scan devices');
    }
  });
  
  // 连接设备
  socket.on('connect-device', (deviceId) => {
    console.log(`Connecting to device: ${deviceId}`);
    startScrcpy(deviceId, socket);
  });
  
  // 断开设备
  socket.on('disconnect-device', (deviceId) => {
    if (scrcpyProcesses.has(deviceId)) {
      scrcpyProcesses.get(deviceId).kill();
      scrcpyProcesses.delete(deviceId);
    }
  });
  
  // 控制指令
  socket.on('control', (data) => {
    const { deviceId, action, payload } = data;
    sendControl(deviceId, action, payload);
  });
  
  // 断开连接
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // 清理所有scrcpy进程
    scrcpyProcesses.forEach((process) => {
      process.kill();
    });
    scrcpyProcesses.clear();
  });
});

// 启动服务器
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
