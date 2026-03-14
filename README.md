# Web-Scrcpy

基于Web的Android设备远程控制工具，允许用户通过浏览器控制和查看Android设备的屏幕。

## 功能特点

- **高性能**：使用高效的视频编码和解码技术，提供流畅的屏幕镜像体验
- **低延迟**：优化的数据传输协议，确保低延迟的控制响应
- **多功能**：支持屏幕录制、截图、全屏模式等多种功能
- **跨平台**：支持Windows、macOS和Linux操作系统
- **Docker部署**：提供Docker镜像，可在任何支持Docker的环境中运行

## 技术栈

- **后端**：Node.js + Express + Socket.io
- **前端**：HTML5 + CSS3 + JavaScript
- **依赖**：scrcpy、adb、ffmpeg

## 部署方式

### 1. 使用Docker Compose（推荐）

```bash
docker-compose up -d
```

### 2. 手动构建Docker镜像

```bash
docker build -t web-scrcpy .
docker run -d --name web-scrcpy -p 8080:8080 --privileged -v /dev/bus/usb:/dev/bus/usb web-scrcpy
```

### 3. 在飞牛NAS上部署

1. 打开飞牛NAS的Docker套件
2. 进入「注册表」页面，搜索并拉取 `web-scrcpy` 镜像
3. 或通过「从文件创建」功能上传 `docker-compose.yml` 文件
4. 启动容器并访问 `http://[飞牛NAS的IP地址]:8080`

## 使用说明

1. **连接设备**：将Android设备通过USB连接到运行Web-Scrcpy的服务器
2. **启用USB调试**：在Android设备上启用「开发者选项」和「USB调试」
3. **访问服务**：打开浏览器，访问 `http://[服务器IP]:8080`
4. **扫描设备**：点击「扫描设备」按钮，查看已连接的Android设备
5. **连接设备**：选择要连接的设备，点击「连接」按钮
6. **控制设备**：使用鼠标和键盘与设备进行交互
7. **使用功能**：
   - **屏幕录制**：点击「录制」按钮开始录制屏幕
   - **截图**：点击「截图」按钮捕获当前屏幕
   - **全屏模式**：点击「全屏」按钮进入全屏模式
   - **断开连接**：点击「断开连接」按钮断开设备连接

## 项目结构

```
web-scrcpy/
├── Dockerfile          # Docker构建文件
├── docker-compose.yml  # Docker Compose配置
├── package.json        # Node.js项目配置
├── server.js           # 服务器端代码
├── public/             # 前端静态文件
│   └── index.html      # 主页面
└── README.md           # 项目说明
```

## 开发环境

1. **克隆项目**：
   ```bash
   git clone https://github.com/your-username/web-scrcpy.git
   cd web-scrcpy
   ```

2. **安装依赖**：
   ```bash
   npm install
   ```

3. **启动开发服务器**：
   ```bash
   npm run dev
   ```

4. **访问开发服务器**：
   打开浏览器，访问 `http://localhost:8080`

## 注意事项

- 确保设备已启用「开发者选项」和「USB调试」
- 确保服务器有足够的权限访问USB设备
- 建议在局域网内使用，避免暴露到公网
- 如需远程访问，建议使用VPN或其他安全方式

## 许可证

本项目使用 MIT 许可证。

## 贡献

欢迎任何形式的贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建一个新的分支 (`git checkout -b feature-branch`)
3. 提交你的更改 (`git commit -am 'Add some feature'`)
4. 推送到分支 (`git push origin feature-branch`)
5. 创建一个新的Pull Request
