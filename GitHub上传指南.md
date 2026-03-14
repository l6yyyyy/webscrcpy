# GitHub上传指南

本指南将教你如何将Web-Scrcpy项目上传到GitHub，变成你自己的项目。

## 准备工作

1. **创建GitHub账号**：如果你还没有GitHub账号，先在 [GitHub官网](https://github.com/) 注册一个
2. **安装Git**：确保你的电脑上安装了Git版本控制工具
   - Windows用户：下载并安装 [Git for Windows](https://git-scm.com/download/win)
   - macOS用户：使用Homebrew安装 `brew install git`
   - Linux用户：使用包管理器安装，如 `apt install git`

## 步骤1：初始化Git仓库

1. **打开命令行终端**：
   - Windows：打开Git Bash或PowerShell
   - macOS/Linux：打开终端

2. **进入项目目录**：
   ```bash
   cd c:\Users\Administrator\Documents\trae_projects\zz
   ```

3. **初始化Git仓库**：
   ```bash
   git init
   ```

4. **配置Git用户名和邮箱**（首次使用Git时需要）：
   ```bash
   git config --global user.name "你的GitHub用户名"
   git config --global user.email "你的GitHub邮箱"
   ```

## 步骤2：创建GitHub仓库

1. **登录GitHub**：打开浏览器，登录你的GitHub账号

2. **创建新仓库**：
   - 点击页面右上角的「+」号，选择「New repository」
   - 填写仓库名称，如 `web-scrcpy`
   - 选择仓库类型（公开或私有）
   - 不需要初始化README.md（我们已经创建了）
   - 点击「Create repository」按钮

3. **复制仓库URL**：在新创建的仓库页面，复制仓库的HTTPS或SSH URL

## 步骤3：关联本地仓库和GitHub仓库

1. **添加远程仓库**：在命令行中执行以下命令，将 `<repository-url>` 替换为你复制的仓库URL
   ```bash
   git remote add origin <repository-url>
   ```

2. **验证远程仓库**：
   ```bash
   git remote -v
   ```
   你应该看到类似以下输出：
   ```
   origin  https://github.com/your-username/web-scrcpy.git (fetch)
   origin  https://github.com/your-username/web-scrcpy.git (push)
   ```

## 步骤4：添加和提交文件

1. **查看项目文件**：
   ```bash
   ls -la
   ```
   确保所有必要的文件都在目录中：
   - Dockerfile
   - docker-compose.yml
   - package.json
   - server.js
   - public/index.html
   - README.md
   - GitHub上传指南.md

2. **添加文件到暂存区**：
   ```bash
   git add .
   ```

3. **提交文件**：
   ```bash
   git commit -m "Initial commit: Web-Scrcpy project"
   ```

## 步骤5：推送到GitHub

1. **推送代码**：
   ```bash
   git push -u origin main
   ```
   （如果你的默认分支是master而不是main，使用 `git push -u origin master`）

2. **输入GitHub凭证**：如果是首次推送，Git会提示你输入GitHub用户名和密码或个人访问令牌

3. **验证推送**：打开GitHub仓库页面，确认所有文件都已成功上传

## 步骤6：设置仓库信息

1. **更新仓库描述**：在GitHub仓库页面，点击「Settings」选项卡，更新仓库描述和其他信息

2. **添加README**：如果需要，可以进一步美化README.md文件，添加更多项目信息和截图

## 步骤7：Docker镜像发布（可选）

1. **注册Docker Hub账号**：如果你想将Docker镜像发布到Docker Hub，先在 [Docker Hub](https://hub.docker.com/) 注册账号

2. **构建并推送Docker镜像**：
   ```bash
   # 登录Docker Hub
   docker login

   # 构建镜像
   docker build -t your-username/web-scrcpy .

   # 推送镜像
   docker push your-username/web-scrcpy
   ```

## 常见问题

1. **推送失败**：
   - 检查网络连接
   - 确保GitHub凭证正确
   - 确保远程仓库URL正确

2. **文件未上传**：
   - 确保使用 `git add .` 添加了所有文件
   - 确保执行了 `git commit` 命令

3. **权限错误**：
   - 确保你有仓库的写入权限
   - 如果使用SSH URL，确保SSH密钥已正确配置

## 后续维护

1. **更新代码**：
   - 修改文件后，使用 `git add .` 和 `git commit -m "更新描述"` 提交更改
   - 使用 `git push` 推送到GitHub

2. **创建分支**：
   ```bash
   git checkout -b feature-branch
   # 进行更改
   git add .
   git commit -m "添加新功能"
   git push origin feature-branch
   ```

3. **合并分支**：在GitHub上创建Pull Request并合并

## 总结

通过以上步骤，你已经成功将Web-Scrcpy项目上传到GitHub，变成了你自己的项目。现在你可以：

- 邀请其他开发者参与项目
- 跟踪项目的开发进度
- 发布新版本
- 与社区分享你的作品

祝你项目成功！
