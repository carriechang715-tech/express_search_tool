# 🎯 快递评估 API 使用指南

## 📌 概述

您的快递评估工具现在已经支持 **HTTP API 调用**！

任何应用（网页、手机APP、后端服务）都可以通过 HTTP 请求获取快递费用和时效数据。

---

## 🌐 部署说明

### GitHub Pages 部署（当前方式）

**限制**：GitHub Pages 是静态托管，**不支持服务端 API**

因此需要额外部署 API 到支持 Serverless 的平台。

### 推荐部署方案：Vercel

**为什么选择 Vercel？**
- ✅ 完全免费
- ✅ 自动部署
- ✅ 支持 Serverless Functions
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS
- ✅ 无需服务器

---

## 🚀 部署到 Vercel（5分钟完成）

### 步骤1：访问 Vercel

打开：https://vercel.com

点击 **Sign Up**，选择 **Continue with GitHub** 登录

### 步骤2：导入项目

1. 点击 **New Project**（新项目）
2. 选择 **Import Git Repository**
3. 找到并选择 `express_search_tool` 仓库
4. 点击 **Import**

### 步骤3：配置项目

- **Framework Preset**: 选择 `Other`
- **Root Directory**: 保持默认 `./`
- **Build Command**: 留空
- **Output Directory**: 留空

点击 **Deploy**（部署）

### 步骤4：等待部署

- 部署时间约 30 秒
- 完成后会显示：🎉 Congratulations!
- 获得您的网站地址，例如：`https://express-search-tool.vercel.app`

### 步骤5：测试 API

您的 API 地址将是：
```
https://express-search-tool.vercel.app/api/calculate
```

测试一下：
```bash
curl "https://express-search-tool.vercel.app/api/calculate?from=CN&to=US&weight=2"
```

---

## 📡 API 使用方法

### 基础信息

- **API 地址**：`https://你的vercel域名/api/calculate`
- **支持方法**：GET、POST
- **返回格式**：JSON
- **CORS**：已启用，支持跨域

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fromCountry | string | 是 | 寄件国家代码（如：CN） |
| toCountry | string | 是 | 收件国家代码（如：US） |
| weight | number | 否 | 重量(kg)，默认1 |
| urgent | boolean | 否 | 是否加急，默认false |

### 国家代码

- `CN` 中国
- `US` 美国
- `UK` 英国
- `JP` 日本
- `AU` 澳大利亚
- `CA` 加拿大
- `DE` 德国
- `FR` 法国
- `SG` 新加坡
- `KR` 韩国

---

## 💻 调用示例

### JavaScript

```javascript
// 浏览器或 Node.js
fetch('https://你的域名/api/calculate?from=CN&to=US&weight=2.5')
  .then(res => res.json())
  .then(data => {
    console.log('推荐快递:', data.data.recommended);
    console.log('价格:', data.data.recommended.price);
  });
```

### Python

```python
import requests

response = requests.get(
    'https://你的域名/api/calculate',
    params={'from': 'CN', 'to': 'US', 'weight': 2.5}
)
data = response.json()
print(data['data']['recommended'])
```

### Java

```java
String url = "https://你的域名/api/calculate?from=CN&to=US&weight=2.5";
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .build();
HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

### PHP

```php
$url = 'https://你的域名/api/calculate?from=CN&to=US&weight=2.5';
$response = file_get_contents($url);
$data = json_decode($response, true);
print_r($data['data']['recommended']);
```

---

## 📊 响应示例

```json
{
  "success": true,
  "data": {
    "type": "international",
    "recommended": {
      "name": "EMS国际快递",
      "tag": "性价比高",
      "price": 280,
      "time": "7-8天",
      "rating": 4,
      "features": ["覆盖范围广", "价格实惠", "清关便利", "国企保障"],
      "website": "https://www.ems.com.cn/"
    },
    "options": [...]
  }
}
```

---

## 🎨 应用场景

### 1. 电商网站集成

```javascript
// 用户下单时自动计算快递费
async function calculateShipping(order) {
  const response = await fetch(`/api/calculate`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      fromCountry: order.warehouse,
      toCountry: order.destination,
      weight: order.totalWeight
    })
  });
  const {data} = await response.json();
  return data.recommended;
}
```

### 2. 移动 APP

```swift
// iOS Swift
let url = URL(string: "https://你的域名/api/calculate?from=CN&to=US&weight=2")!
URLSession.shared.dataTask(with: url) { data, response, error in
    if let data = data {
        let result = try? JSONDecoder().decode(Response.self, from: data)
        print(result?.data.recommended.price)
    }
}.resume()
```

### 3. 批量查询

```python
# 批量查询多个目的地的快递费用
destinations = ['US', 'UK', 'JP', 'AU']
for dest in destinations:
    response = requests.get(f'https://你的域名/api/calculate',
                          params={'from': 'CN', 'to': dest, 'weight': 5})
    data = response.json()
    print(f"{dest}: ¥{data['data']['recommended']['price']}")
```

---

## 🔧 本地测试

在部署到 Vercel 之前，可以本地测试 API：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目目录运行
cd /Users/moxin/Qcoder/express-tool
vercel dev

# API 将在 http://localhost:3000/api/calculate 可用
```

---

## 📈 监控和分析

### Vercel Dashboard

登录 Vercel 后台可以查看：
- 📊 请求次数
- ⏱️ 响应时间
- 🌍 访问地域
- ❌ 错误日志

### 日志查看

```bash
# 查看实时日志
vercel logs

# 查看特定部署的日志
vercel logs [deployment-url]
```

---

## 🎯 下一步优化

### 1. 添加缓存

```javascript
// 使用 Vercel Edge Config 缓存结果
// 减少重复计算，提升响应速度
```

### 2. 添加认证

```javascript
// 添加 API Key 验证
// 防止滥用
```

### 3. 添加速率限制

```javascript
// 限制每个 IP 的请求频率
// 保护服务稳定性
```

### 4. 集成真实快递 API

```javascript
// 对接 DHL、FedEx 等官方 API
// 提供实时价格
```

---

## ❓ 常见问题

### Q: Vercel 免费版够用吗？
A: 对于个人项目完全足够
- 100GB 带宽/月
- 100 次部署/天
- Serverless Functions 无限制

### Q: 如何绑定自定义域名？
A: 在 Vercel 项目设置中
1. 点击 Domains
2. 添加您的域名
3. 配置 DNS 记录

### Q: 支持 HTTPS 吗？
A: Vercel 自动配置 SSL 证书，所有请求都是 HTTPS

### Q: 如何更新 API？
A: 只需 `git push`，Vercel 会自动重新部署

---

## 📞 获取帮助

- Vercel 文档：https://vercel.com/docs
- GitHub Issues：https://github.com/carriechang715-tech/express_search_tool/issues
- API 文档：查看 API.md

---

**祝您使用愉快！** 🎉
