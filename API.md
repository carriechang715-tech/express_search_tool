# 📡 快递评估 API 文档

## 基础信息

- **API 地址**：`https://你的域名/api/calculate`
- **支持方法**：`GET`, `POST`
- **返回格式**：`JSON`
- **编码**：`UTF-8`
- **CORS**：已启用，支持跨域访问

---

## 🔌 API 端点

### 计算快递费用和时效

```
GET  /api/calculate
POST /api/calculate
```

---

## 📝 请求参数

### GET 请求参数（Query String）

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| `fromCountry` 或 `from` | string | 是 | 寄件国家代码 | `CN` |
| `toCountry` 或 `to` | string | 是 | 收件国家代码 | `US` |
| `weight` | number | 否 | 包裹重量(kg)，默认1kg | `2.5` |
| `urgent` | boolean | 否 | 是否加急，默认false | `true` |

**国家代码对照表：**
- `CN` - 中国
- `US` - 美国
- `UK` - 英国
- `JP` - 日本
- `AU` - 澳大利亚
- `CA` - 加拿大
- `DE` - 德国
- `FR` - 法国
- `SG` - 新加坡
- `KR` - 韩国

### POST 请求参数（JSON Body）

```json
{
  "fromCountry": "CN",
  "toCountry": "US",
  "weight": 2.5,
  "urgent": false
}
```

---

## 📤 响应格式

### 成功响应（HTTP 200）

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
      "website": "https://www.ems.com.cn/",
      "costPerformance": 6.123
    },
    "options": [
      {
        "name": "EMS国际快递",
        "tag": "性价比高",
        "price": 280,
        "time": "7-8天",
        "rating": 4,
        "features": ["覆盖范围广", "价格实惠", "清关便利", "国企保障"],
        "website": "https://www.ems.com.cn/",
        "costPerformance": 6.123
      },
      {
        "name": "SF国际快递",
        "tag": "国内品牌",
        "price": 320,
        "time": "6-7天",
        "rating": 4,
        "features": ["中国品牌", "服务完善", "追踪及时", "价格合理"],
        "website": "https://www.sf-express.com/",
        "costPerformance": 5.876
      }
    ]
  },
  "params": {
    "fromCountry": "CN",
    "toCountry": "US",
    "weight": 2.5,
    "urgent": false
  },
  "timestamp": "2025-10-21T10:30:00.000Z"
}
```

### 错误响应

**缺少必填参数（HTTP 400）**
```json
{
  "success": false,
  "error": "Missing required parameters: fromCountry and toCountry"
}
```

**重量参数错误（HTTP 400）**
```json
{
  "success": false,
  "error": "Weight must be between 0.1 and 100 kg"
}
```

**方法不允许（HTTP 405）**
```json
{
  "success": false,
  "error": "Method not allowed. Please use GET or POST."
}
```

**服务器错误（HTTP 500）**
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## 💻 调用示例

### JavaScript (Fetch API)

```javascript
// GET 请求
fetch('https://你的域名/api/calculate?from=CN&to=US&weight=2.5&urgent=false')
  .then(response => response.json())
  .then(data => {
    console.log('推荐快递:', data.data.recommended);
    console.log('所有选项:', data.data.options);
  });

// POST 请求
fetch('https://你的域名/api/calculate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fromCountry: 'CN',
    toCountry: 'US',
    weight: 2.5,
    urgent: false
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### Python (requests)

```python
import requests

# GET 请求
params = {
    'from': 'CN',
    'to': 'US',
    'weight': 2.5,
    'urgent': False
}
response = requests.get('https://你的域名/api/calculate', params=params)
data = response.json()
print(data['data']['recommended'])

# POST 请求
payload = {
    'fromCountry': 'CN',
    'toCountry': 'US',
    'weight': 2.5,
    'urgent': False
}
response = requests.post('https://你的域名/api/calculate', json=payload)
data = response.json()
print(data)
```

### cURL

```bash
# GET 请求
curl "https://你的域名/api/calculate?from=CN&to=US&weight=2.5&urgent=false"

# POST 请求
curl -X POST "https://你的域名/api/calculate" \
  -H "Content-Type: application/json" \
  -d '{
    "fromCountry": "CN",
    "toCountry": "US",
    "weight": 2.5,
    "urgent": false
  }'
```

### Java (HttpClient)

```java
import java.net.http.*;
import java.net.URI;

// GET 请求
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://你的域名/api/calculate?from=CN&to=US&weight=2.5&urgent=false"))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

### PHP

```php
<?php
// GET 请求
$url = 'https://你的域名/api/calculate?from=CN&to=US&weight=2.5&urgent=false';
$response = file_get_contents($url);
$data = json_decode($response, true);
print_r($data['data']['recommended']);

// POST 请求
$data = array(
    'fromCountry' => 'CN',
    'toCountry' => 'US',
    'weight' => 2.5,
    'urgent' => false
);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);

$context  = stream_context_create($options);
$result = file_get_contents('https://你的域名/api/calculate', false, $context);
print_r(json_decode($result, true));
?>
```

---

## 🔒 速率限制

- 每个 IP 地址：**100 请求/分钟**（Vercel 免费版默认限制）
- 如需更高配额，请联系升级

---

## 📊 响应字段说明

### `data.type`
- `international` - 国际快递
- `domestic` - 国内快递

### `data.recommended`
性价比最高的推荐快递公司

### `data.options`
所有快递公司选项，按性价比排序（从高到低）

### `costPerformance`
性价比分数，数值越高性价比越好

---

## 🌐 CORS 支持

API 已启用 CORS，支持：
- ✅ 所有域名跨域访问
- ✅ GET、POST、OPTIONS 方法
- ✅ Content-Type 请求头

---

## 📱 使用场景

1. **电商网站**：集成到订单页面，自动推荐快递
2. **移动 APP**：通过 API 调用获取快递报价
3. **企业系统**：批量计算快递成本
4. **聊天机器人**：提供快递查询服务
5. **数据分析**：收集快递价格趋势

---

## 🆘 常见问题

### Q: API 是否收费？
A: 完全免费，基于 Vercel Serverless Functions

### Q: 有请求次数限制吗？
A: Vercel 免费版有一定限制，正常使用完全足够

### Q: 价格数据多久更新？
A: 当前为静态数据，如需实时数据需要集成快递公司 API

### Q: 支持更多国家吗？
A: 可以，请联系添加

---

## 📞 技术支持

如有问题，请访问：
- GitHub Issues: https://github.com/carriechang715-tech/express_search_tool/issues
- 邮箱: 您的邮箱

---

## 📝 更新日志

### v1.0.0 (2025-10-21)
- ✅ 初始版本发布
- ✅ 支持 GET/POST 请求
- ✅ 支持国际和国内快递计算
- ✅ 启用 CORS 跨域支持
