FROM node:18-alpine

# 安装依赖
RUN apk add --no-cache \
    android-tools \
    ffmpeg \
    scrcpy \
    python3 \
    py3-pip \
    make \
    gcc \
    g++ \
    libc-dev

# 创建工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package.json ./

# 安装Node.js依赖
RUN npm install

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 8080

# 启动命令
CMD ["npm", "start"]
