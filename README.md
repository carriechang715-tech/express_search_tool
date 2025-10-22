# 🚀 国际/国内快递评估工具

一个智能的快递费用和时效评估工具，支持国际和国内主流快递公司的价格对比和性价比推荐。

## ✨ 功能特点

- 📦 支持10个国家的寄收件地选择
- 🌍 包含6家国际快递公司（DHL, FedEx, UPS, EMS, TNT, 顺丰国际）
- 🇨🇳 包含7家国内快递公司（顺丰, 京东, 中通, 圆通, 韵达, 邮政, 极兔）
- 💰 智能计算费用，支持重量阶梯优惠
- ⭐ 自动推荐性价比最高的快递公司
- 🔗 一键访问快递公司官网
- 📱 完全响应式设计

## 🚀 在线访问

- **网页版**：`https://carriechang715-tech.github.io/express_search_tool/`
- **API 接口**：`https://carriechang715-tech.github.io/express_search_tool/api/calculate`
- **API 测试**：`https://carriechang715-tech.github.io/express_search_tool/api-test.html`

## 💻 本地运行

### 方法一：使用 Python（推荐）

```bash
cd express-tool
python3 -m http.server 8080
```

然后访问：`http://localhost:8080`

### 方法二：使用 Node.js

```bash
npx http-server -p 8080
```

### 方法三：直接打开

由于使用纯HTML/CSS/JS，也可以直接双击 `index.html` 文件在浏览器中打开。

## 📦 项目结构

```
express-tool/
├── index.html          # 主页面
├── style.css           # 样式文件
├── app.js              # 应用逻辑
├── calculator.js       # 计算引擎
├── data.js             # 快递公司数据
└── README.md           # 说明文档
```

## 🌐 发布到 GitHub Pages

### 步骤1：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+" → "New repository"
3. 仓库名称填写：`express-tool`
4. 选择 "Public"（公开）
5. 点击 "Create repository"

### 步骤2：上传代码

在项目目录下执行：

```bash
cd /Users/moxin/Qcoder/express-tool
git init
git add .
git commit -m "Initial commit: 快递评估工具"
git branch -M main
git remote add origin https://github.com/你的用户名/express-tool.git
git push -u origin main
```

### 步骤3：启用 GitHub Pages

1. 进入仓库页面
2. 点击 "Settings"（设置）
3. 左侧菜单找到 "Pages"
4. 在 "Source" 下选择 "main" 分支
5. 点击 "Save"（保存）
6. 等待几分钟，页面就会发布到：`https://你的用户名.github.io/express-tool/`

## 🎯 其他发布方案

### 方案1：Vercel（推荐）
- 访问：https://vercel.com
- 导入 GitHub 仓库
- 自动部署，支持自定义域名
- 完全免费

### 方案2：Netlify
- 访问：https://netlify.com
- 拖拽文件夹即可发布
- 支持自定义域名
- 完全免费

### 方案3：Cloudflare Pages
- 访问：https://pages.cloudflare.com
- 连接 GitHub 仓库
- 全球 CDN 加速
- 完全免费

## 📡 API 接口

本工具提供 **HTTP API 接口**，支持其他应用调用！

### 快速开始

```bash
# GET 请求
curl "https://carriechang715-tech.github.io/express_search_tool/api/calculate?from=CN&to=US&weight=2.5"

# POST 请求
curl -X POST "https://carriechang715-tech.github.io/express_search_tool/api/calculate" \
  -H "Content-Type: application/json" \
  -d '{"fromCountry":"CN","toCountry":"US","weight":2.5}'
```

### 在线测试

访问 API 测试页面：`https://carriechang715-tech.github.io/express_search_tool/api-test.html`

### 完整文档

查看完整 API 文档：[API.md](./API.md)

---

## 📝 技术栈

- 纯 HTML5
- CSS3（渐变、动画、响应式设计）
- 原生 JavaScript（ES6+）
- Serverless Functions（API 接口）
- 无任何第三方依赖

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，欢迎通过 GitHub Issues 联系。
