// 快递计算 API
// 访问地址：/api/calculate

// 国际快递公司数据
const INTERNATIONAL_EXPRESS = [
    {
        name: 'DHL国际快递',
        tag: '速度最快',
        basePrice: 180,
        pricePerKg: 80,
        baseDays: 3,
        rating: 5,
        features: ['全球网络覆盖', '清关能力强', '实时追踪', '签收快'],
        website: 'https://www.dhl.com/cn-zh/home.html',
        urgentMultiplier: 1.5,
        urgentDays: 2
    },
    {
        name: 'FedEx联邦快递',
        tag: '可靠稳定',
        basePrice: 170,
        pricePerKg: 75,
        baseDays: 4,
        rating: 5,
        features: ['美国线路优势', '保险服务全面', '包装专业', '客服响应快'],
        website: 'https://www.fedex.com/zh-cn/home.html',
        urgentMultiplier: 1.5,
        urgentDays: 2
    },
    {
        name: 'UPS快递',
        tag: '欧美首选',
        basePrice: 165,
        pricePerKg: 70,
        baseDays: 5,
        rating: 4,
        features: ['欧美线路优势', '清关效率高', '包裹保护好', '理赔便捷'],
        website: 'https://www.ups.com/cn/zh/Home.page',
        urgentMultiplier: 1.4,
        urgentDays: 3
    },
    {
        name: 'EMS国际快递',
        tag: '性价比高',
        basePrice: 120,
        pricePerKg: 50,
        baseDays: 7,
        rating: 4,
        features: ['覆盖范围广', '价格实惠', '清关便利', '国企保障'],
        website: 'https://www.ems.com.cn/',
        urgentMultiplier: 1.3,
        urgentDays: 4
    },
    {
        name: 'TNT国际快递',
        tag: '欧洲专线',
        basePrice: 160,
        pricePerKg: 68,
        baseDays: 5,
        rating: 4,
        features: ['欧洲线路优势', '清关速度快', '服务专业', '时效稳定'],
        website: 'https://www.tnt.com/express/zh_cn/site/home.html',
        urgentMultiplier: 1.4,
        urgentDays: 3
    },
    {
        name: 'SF国际快递',
        tag: '国内品牌',
        basePrice: 140,
        pricePerKg: 60,
        baseDays: 6,
        rating: 4,
        features: ['中国品牌', '服务完善', '追踪及时', '价格合理'],
        website: 'https://www.sf-express.com/cn/sc/dynamic_function/S.F.International/',
        urgentMultiplier: 1.3,
        urgentDays: 4
    }
];

// 国内快递公司数据
const DOMESTIC_EXPRESS = [
    {
        name: '顺丰快递',
        tag: '高端快递',
        basePrice: 18,
        pricePerKg: 8,
        baseDays: 1,
        rating: 5,
        features: ['速度快', '服务好', '安全性高', '实时追踪'],
        website: 'https://www.sf-express.com/',
        urgentMultiplier: 1.6,
        urgentDays: 0.5
    },
    {
        name: '京东快递',
        tag: '电商首选',
        basePrice: 15,
        pricePerKg: 6,
        baseDays: 2,
        rating: 5,
        features: ['时效稳定', '服务优质', '覆盖面广', '智能配送'],
        website: 'https://www.jdl.com/',
        urgentMultiplier: 1.5,
        urgentDays: 1
    },
    {
        name: '中通快递',
        tag: '性价比之王',
        basePrice: 8,
        pricePerKg: 3,
        baseDays: 3,
        rating: 4,
        features: ['价格实惠', '网点多', '派送快', '全国覆盖'],
        website: 'https://www.zto.com/',
        urgentMultiplier: 1.4,
        urgentDays: 2
    },
    {
        name: '圆通快递',
        tag: '经济实惠',
        basePrice: 8,
        pricePerKg: 3,
        baseDays: 3,
        rating: 4,
        features: ['价格低廉', '网络完善', '服务稳定', '性价比高'],
        website: 'https://www.yto.net.cn/',
        urgentMultiplier: 1.4,
        urgentDays: 2
    },
    {
        name: '韵达快递',
        tag: '稳定可靠',
        basePrice: 8,
        pricePerKg: 3,
        baseDays: 3,
        rating: 4,
        features: ['服务稳定', '价格合理', '网点密集', '追踪准确'],
        website: 'https://www.yunda.com/',
        urgentMultiplier: 1.4,
        urgentDays: 2
    },
    {
        name: '邮政快递',
        tag: '覆盖最广',
        basePrice: 10,
        pricePerKg: 4,
        baseDays: 4,
        rating: 3,
        features: ['覆盖偏远地区', '国企保障', '价格稳定', '服务全面'],
        website: 'https://www.chinapost.com.cn/',
        urgentMultiplier: 1.3,
        urgentDays: 2
    },
    {
        name: '极兔快递',
        tag: '新兴之选',
        basePrice: 7,
        pricePerKg: 2.5,
        baseDays: 3,
        rating: 4,
        features: ['价格超低', '速度不错', '服务改善', '年轻品牌'],
        website: 'https://www.jtexpress.cn/',
        urgentMultiplier: 1.4,
        urgentDays: 2
    }
];

// 判断是否为国际快递
function isInternational(fromCountry, toCountry) {
    return fromCountry !== toCountry;
}

// 计算性价比分数
function calculateCostPerformance(price, days, rating) {
    return (rating * 10) / (Math.log10(price + 1) * (days + 1));
}

// 计算单个快递选项
function calculateOption(company, weight, urgent) {
    let price = company.basePrice + (weight - 1) * company.pricePerKg;
    let days = company.baseDays;
    
    if (urgent) {
        price = price * company.urgentMultiplier;
        days = company.urgentDays;
    }
    
    // 重量优惠
    if (weight > 5) {
        price = price * 0.95;
    }
    if (weight > 10) {
        price = price * 0.9;
    }
    
    return {
        name: company.name,
        tag: company.tag,
        price: Math.round(price),
        time: days < 1 ? `${days * 24}小时内` : `${Math.ceil(days)}-${Math.ceil(days) + 1}天`,
        rating: company.rating,
        features: company.features,
        website: company.website,
        costPerformance: calculateCostPerformance(price, days, company.rating)
    };
}

// 主计算函数
function calculateExpressOptions(params) {
    const { fromCountry, toCountry, weight, urgent } = params;
    const isIntl = isInternational(fromCountry, toCountry);
    
    const companies = isIntl ? INTERNATIONAL_EXPRESS : DOMESTIC_EXPRESS;
    const options = companies.map(company => calculateOption(company, weight, urgent));
    
    // 按性价比排序
    options.sort((a, b) => b.costPerformance - a.costPerformance);
    
    return {
        type: isIntl ? 'international' : 'domestic',
        options: options,
        recommended: options[0]
    };
}

// Vercel Serverless Function Handler
module.exports = (req, res) => {
    // 设置 CORS 头，允许跨域访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // 处理 OPTIONS 预检请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    try {
        let params;
        
        // 支持 GET 和 POST 两种方式
        if (req.method === 'GET') {
            // GET 请求从 query 参数获取
            params = {
                fromCountry: req.query.fromCountry || req.query.from || 'CN',
                toCountry: req.query.toCountry || req.query.to || 'US',
                weight: parseFloat(req.query.weight || 1),
                urgent: req.query.urgent === 'true' || req.query.urgent === '1'
            };
        } else if (req.method === 'POST') {
            // POST 请求从 body 获取
            params = {
                fromCountry: req.body.fromCountry || req.body.from || 'CN',
                toCountry: req.body.toCountry || req.body.to || 'US',
                weight: parseFloat(req.body.weight || 1),
                urgent: req.body.urgent === true || req.body.urgent === 'true'
            };
        } else {
            res.status(405).json({
                success: false,
                error: 'Method not allowed. Please use GET or POST.'
            });
            return;
        }
        
        // 参数验证
        if (!params.fromCountry || !params.toCountry) {
            res.status(400).json({
                success: false,
                error: 'Missing required parameters: fromCountry and toCountry'
            });
            return;
        }
        
        if (params.weight <= 0 || params.weight > 100) {
            res.status(400).json({
                success: false,
                error: 'Weight must be between 0.1 and 100 kg'
            });
            return;
        }
        
        // 计算结果
        const result = calculateExpressOptions(params);
        
        // 返回成功响应
        res.status(200).json({
            success: true,
            data: result,
            params: params,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        // 错误处理
        res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
};
