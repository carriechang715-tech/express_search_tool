# 🚀 快速发布指南

## 最快 5 分钟发布到互联网！

### 📋 前提条件
- 有 GitHub 账号（没有的话先去 https://github.com 注册）
- 电脑上已安装 Git

---

## ⚡ 超快发布流程

### 1️⃣ 创建 GitHub 仓库（1分钟）

访问：https://github.com/new

- Repository name: `express-tool`
- 选择 **Public**
- 点击 **Create repository**

复制显示的仓库地址（类似：`https://github.com/你的用户名/express-tool.git`）

---

### 2️⃣ 上传代码（2分钟）

打开终端，执行以下命令：

```bash
# 进入项目目录
cd /Users/moxin/Qcoder/express-tool

# 使用自动化脚本
./deploy.sh
```

按提示：
1. 输入提交信息（直接回车使用默认）
2. 粘贴刚才复制的仓库地址

---

### 3️⃣ 启用 GitHub Pages（2分钟）

1. 访问：`https://github.com/你的用户名/express-tool`
2. 点击 **Settings** → 左侧 **Pages**
3. Source 选择 **main** 分支
4. 点击 **Save**

---

### 4️⃣ 访问您的网站！

等待 1-2 分钟，访问：
```
https://你的用户名.github.io/express-tool/
```

🎉 **完成！** 现在可以把这个链接分享给任何人了！

---

## 🔄 如何更新网站？

修改代码后，在项目目录执行：

```bash
git add .
git commit -m "更新内容"
git push
```

等待 1-2 分钟，网站自动更新！

---

## 🆘 遇到问题？

### Git 命令不存在
```bash
# macOS 安装
xcode-select --install

# 或从官网下载
# https://git-scm.com/downloads
```

### 推送需要登录
如果需要输入密码，可能需要：
1. 使用 Personal Access Token 代替密码
2. 或配置 SSH 密钥

详见：https://docs.github.com/zh/authentication

---

## 💡 其他更简单的方法

### 方法1：Netlify Drop（最简单）

1. 访问：https://app.netlify.com/drop
2. 直接拖拽 `express-tool` 文件夹
3. 立即获得网址！

### 方法2：Vercel

1. 访问：https://vercel.com
2. 用 GitHub 登录
3. 导入 `express-tool` 仓库
4. 自动部署完成！

---

## 📱 分享您的网站

发布后可以：
- 发朋友圈、微信群
- 发微博、小红书
- 添加到简历
- 给同事朋友使用

祝您发布顺利！🎊
