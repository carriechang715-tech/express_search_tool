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
        urgentDays: 2,
        // 寄件类型（根据DHL官网）
        parcelTypes: [
            { id: 'document', name: '文件', priceMultiplier: 0.8, description: '非商品类文件、资料' },
            { id: 'package', name: '包裹', priceMultiplier: 1.0, description: '普通商品包裹' },
            { id: 'sample', name: '样品', priceMultiplier: 0.9, description: '商业样品、展示品' },
            { id: 'merchandise', name: '商品', priceMultiplier: 1.1, description: '商业货物' }
        ],
        // 服务类型（根据DHL官网）
        serviceTypes: [
            { id: 'express', name: 'DHL Express 特快', priceMultiplier: 1.5, daysMultiplier: 0.5, description: '全球最快' },
            { id: 'standard', name: 'DHL 标准件', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '标准国际快递' },
            { id: 'economy', name: 'DHL Economy 经济件', priceMultiplier: 0.7, daysMultiplier: 1.5, description: '经济实惠' }
        ]
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
        urgentDays: 2,
        parcelTypes: [
            { id: 'envelope', name: '文件信封', priceMultiplier: 0.75, description: '轻小文件' },
            { id: 'pak', name: 'FedEx Pak', priceMultiplier: 0.85, description: '标准包装文件' },
            { id: 'box', name: '纸箱包裹', priceMultiplier: 1.0, description: '普通包裹' },
            { id: 'freight', name: '货运', priceMultiplier: 1.2, description: '大宗货物' }
        ],
        serviceTypes: [
            { id: 'ip', name: 'FedEx IP 优先型', priceMultiplier: 1.6, daysMultiplier: 0.4, description: '1-3天到达' },
            { id: 'ie', name: 'FedEx IE 经济型', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '4-7天到达' },
            { id: 'ground', name: 'FedEx Ground 陆运', priceMultiplier: 0.6, daysMultiplier: 2.0, description: '经济陆运' }
        ]
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
        urgentDays: 3,
        parcelTypes: [
            { id: 'letter', name: '信函', priceMultiplier: 0.8, description: '文件信函' },
            { id: 'package', name: '包裹', priceMultiplier: 1.0, description: '标准包裹' },
            { id: 'pallet', name: '托盘', priceMultiplier: 1.3, description: '托盘货物' }
        ],
        serviceTypes: [
            { id: 'express', name: 'UPS Express 特快', priceMultiplier: 1.5, daysMultiplier: 0.6, description: '最快递送' },
            { id: 'expedited', name: 'UPS Expedited 加急', priceMultiplier: 1.2, daysMultiplier: 0.8, description: '加急服务' },
            { id: 'standard', name: 'UPS Standard 标准', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '标准服务' },
            { id: 'saver', name: 'UPS Saver 经济', priceMultiplier: 0.75, daysMultiplier: 1.4, description: '经济实惠' }
        ]
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
        urgentDays: 4,
        parcelTypes: [
            { id: 'document', name: '国际文件', priceMultiplier: 0.7, description: '文件资料' },
            { id: 'parcel', name: '国际包裹', priceMultiplier: 1.0, description: '普通包裹' },
            { id: 'epacket', name: 'e邮宝', priceMultiplier: 0.65, description: '小包经济件' }
        ],
        serviceTypes: [
            { id: 'express', name: 'EMS 特快', priceMultiplier: 1.3, daysMultiplier: 0.6, description: '特快业务' },
            { id: 'standard', name: 'EMS 标准', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '标准业务' },
            { id: 'economy', name: 'EMS 经济', priceMultiplier: 0.75, daysMultiplier: 1.5, description: '经济业务' },
            { id: 'air', name: '空运水陆路', priceMultiplier: 0.85, daysMultiplier: 1.3, description: '空运服务' }
        ]
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
        urgentDays: 3,
        parcelTypes: [
            { id: 'document', name: '文件', priceMultiplier: 0.8, description: '文件快递' },
            { id: 'parcel', name: '包裹', priceMultiplier: 1.0, description: '包裹快递' },
            { id: 'pallet', name: '托盘货物', priceMultiplier: 1.25, description: '托盘运输' }
        ],
        serviceTypes: [
            { id: '9am', name: 'TNT 9:00 特快', priceMultiplier: 1.8, daysMultiplier: 0.4, description: '次日9点前' },
            { id: '12pm', name: 'TNT 12:00 快递', priceMultiplier: 1.4, daysMultiplier: 0.6, description: '次日12点前' },
            { id: 'express', name: 'TNT Express', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '标准快递' },
            { id: 'economy', name: 'TNT Economy', priceMultiplier: 0.7, daysMultiplier: 1.5, description: '经济快递' }
        ]
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
        urgentDays: 4,
        parcelTypes: [
            { id: 'document', name: '文件', priceMultiplier: 0.75, description: '国际文件' },
            { id: 'package', name: '包裹', priceMultiplier: 1.0, description: '国际包裹' },
            { id: 'heavy', name: '重货', priceMultiplier: 1.15, description: '重量包裹' }
        ],
        serviceTypes: [
            { id: 'premium', name: 'SF国际特慧', priceMultiplier: 1.5, daysMultiplier: 0.5, description: '特快服务' },
            { id: 'standard', name: 'SF国际标快', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '标准快递' },
            { id: 'economy', name: 'SF国际经济', priceMultiplier: 0.75, daysMultiplier: 1.4, description: '经济快递' },
            { id: 'air', name: '国际航空', priceMultiplier: 1.2, daysMultiplier: 0.7, description: '航空加急' }
        ]
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
        urgentDays: 0.5,
        parcelTypes: [
            { id: 'document', name: '文件', priceMultiplier: 0.8, description: '文件快件' },
            { id: 'package', name: '包裹', priceMultiplier: 1.0, description: '普通包裹' },
            { id: 'fresh', name: '生鲜', priceMultiplier: 1.3, description: '生鲜配送' },
            { id: 'cold', name: '冷运', priceMultiplier: 1.5, description: '冷链运输' }
        ],
        serviceTypes: [
            { id: 'express', name: '顺丰即日', priceMultiplier: 2.0, daysMultiplier: 0.3, description: '当日达' },
            { id: 'next-day', name: '顺丰次晚', priceMultiplier: 1.3, daysMultiplier: 0.5, description: '次日达' },
            { id: 'standard', name: '顺丰标快', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '标准快递' },
            { id: 'economy', name: '顺丰特惠', priceMultiplier: 0.7, daysMultiplier: 1.5, description: '经济实惠' }
        ]
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
        urgentDays: 1,
        parcelTypes: [
            { id: 'document', name: '文件', priceMultiplier: 0.85, description: '文件快递' },
            { id: 'package', name: '包裹', priceMultiplier: 1.0, description: '普通包裹' },
            { id: '3c', name: '3C数码', priceMultiplier: 1.1, description: '数码产品' },
            { id: 'fresh', name: '生鲜', priceMultiplier: 1.4, description: '生鲜配送' }
        ],
        serviceTypes: [
            { id: 'special', name: '特惠送', priceMultiplier: 0.7, daysMultiplier: 1.5, description: '特惠价格' },
            { id: 'standard', name: '普通快递', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '标准服务' },
            { id: 'express', name: '京准达', priceMultiplier: 1.5, daysMultiplier: 0.5, description: '准时送达' },
            { id: 'same-day', name: '京同达', priceMultiplier: 2.0, daysMultiplier: 0.2, description: '同城当日' }
        ]
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
        urgentDays: 2,
        parcelTypes: [
            { id: 'document', name: '文件', priceMultiplier: 0.9, description: '文件快件' },
            { id: 'package', name: '包裹', priceMultiplier: 1.0, description: '普通包裹' },
            { id: 'bulk', name: '大件', priceMultiplier: 1.15, description: '大件包裹' }
        ],
        serviceTypes: [
            { id: 'economy', name: '经济件', priceMultiplier: 0.8, daysMultiplier: 1.3, description: '经济实惠' },
            { id: 'standard', name: '标准快递', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '标准服务' },
            { id: 'express', name: '加急件', priceMultiplier: 1.4, daysMultiplier: 0.7, description: '加急送达' }
        ]
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
        urgentDays: 2,
        parcelTypes: [
            { id: 'document', name: '文件', priceMultiplier: 0.85, description: '文件信函' },
            { id: 'package', name: '包裹', priceMultiplier: 1.0, description: '包裹快递' },
            { id: 'heavy', name: '重货', priceMultiplier: 1.2, description: '重量包裹' }
        ],
        serviceTypes: [
            { id: 'economy', name: '经济快递', priceMultiplier: 0.85, daysMultiplier: 1.2, description: '经济选项' },
            { id: 'standard', name: '标准快递', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '普通快递' },
            { id: 'express', name: '加急快递', priceMultiplier: 1.4, daysMultiplier: 0.65, description: '加急服务' }
        ]
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
        urgentDays: 2,
        parcelTypes: [
            { id: 'document', name: '文件', priceMultiplier: 0.85, description: '文件快件' },
            { id: 'package', name: '包裹', priceMultiplier: 1.0, description: '包裹快递' },
            { id: 'fresh', name: '生鲜', priceMultiplier: 1.35, description: '生鲜配送' }
        ],
        serviceTypes: [
            { id: 'economy', name: '经济件', priceMultiplier: 0.8, daysMultiplier: 1.3, description: '经济实惠' },
            { id: 'standard', name: '标准快递', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '标准服务' },
            { id: 'premium', name: '精准达', priceMultiplier: 1.5, daysMultiplier: 0.6, description: '高端服务' }
        ]
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
        urgentDays: 2,
        parcelTypes: [
            { id: 'letter', name: '信函', priceMultiplier: 0.6, description: '信函邮件' },
            { id: 'package', name: '包裹', priceMultiplier: 1.0, description: '普通包裹' },
            { id: 'ems', name: 'EMS', priceMultiplier: 1.3, description: 'EMS特快' }
        ],
        serviceTypes: [
            { id: 'surface', name: '普通包裹', priceMultiplier: 0.7, daysMultiplier: 1.8, description: '经济选项' },
            { id: 'standard', name: '标准快递', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '标准服务' },
            { id: 'ems', name: 'EMS特快', priceMultiplier: 1.5, daysMultiplier: 0.5, description: '特快服务' }
        ]
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
        urgentDays: 2,
        parcelTypes: [
            { id: 'document', name: '文件', priceMultiplier: 0.9, description: '文件快件' },
            { id: 'package', name: '包裹', priceMultiplier: 1.0, description: '普通包裹' },
            { id: 'bulk', name: '大件', priceMultiplier: 1.1, description: '大件快递' }
        ],
        serviceTypes: [
            { id: 'economy', name: '特惠件', priceMultiplier: 0.75, daysMultiplier: 1.4, description: '超省钱' },
            { id: 'standard', name: '标准快递', priceMultiplier: 1.0, daysMultiplier: 1.0, description: '普通服务' },
            { id: 'express', name: '加急快递', priceMultiplier: 1.4, daysMultiplier: 0.7, description: '加急服务' }
        ]
    }
];
