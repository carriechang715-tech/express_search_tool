// 快递计算器

// 判断是否为国际快递
function isInternational(fromCountry, toCountry) {
    return fromCountry !== toCountry;
}

// 计算性价比分数
function calculateCostPerformance(price, days, rating) {
    // 性价比 = (评分 * 10) / (价格的对数 * 时间)
    // 分数越高性价比越好
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
    
    // 重量超过5kg，额外优惠
    if (weight > 5) {
        price = price * 0.95;
    }
    
    // 重量超过10kg，额外优惠
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
function calculateExpressOptions(formData) {
    const { fromCountry, toCountry, weight, urgent } = formData;
    const isIntl = isInternational(fromCountry, toCountry);
    
    const companies = isIntl ? INTERNATIONAL_EXPRESS : DOMESTIC_EXPRESS;
    
    // 计算所有选项
    const options = companies.map(company => 
        calculateOption(company, weight, urgent)
    );
    
    // 按性价比排序
    options.sort((a, b) => b.costPerformance - a.costPerformance);
    
    // 推荐性价比最高的
    const recommended = options[0];
    
    return {
        type: isIntl ? 'international' : 'domestic',
        options: options,
        recommended: recommended
    };
}
