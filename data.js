// 国家和城市数据
const COUNTRIES = {
    'CN': {
        name: '中国',
        cities: ['北京', '上海', '广州', '深圳', '杭州', '成都', '重庆', '西安', '武汉', '南京']
    },
    'US': {
        name: '美国',
        cities: ['纽约', '洛杉矶', '芝加哥', '旧金山', '西雅图', '波士顿', '华盛顿']
    },
    'UK': {
        name: '英国',
        cities: ['伦敦', '曼彻斯特', '伯明翰', '爱丁堡', '利物浦']
    },
    'JP': {
        name: '日本',
        cities: ['东京', '大阪', '京都', '名古屋', '福冈', '札幌']
    },
    'AU': {
        name: '澳大利亚',
        cities: ['悉尼', '墨尔本', '布里斯班', '珀斯', '阿德莱德']
    },
    'CA': {
        name: '加拿大',
        cities: ['多伦多', '温哥华', '蒙特利尔', '卡尔加里', '渥太华']
    },
    'DE': {
        name: '德国',
        cities: ['柏林', '慕尼黑', '法兰克福', '汉堡', '科隆']
    },
    'FR': {
        name: '法国',
        cities: ['巴黎', '马赛', '里昂', '图卢兹', '尼斯']
    },
    'SG': {
        name: '新加坡',
        cities: ['新加坡市']
    },
    'KR': {
        name: '韩国',
        cities: ['首尔', '釜山', '仁川', '大邱', '大田']
    }
};

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
