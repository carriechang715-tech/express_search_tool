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
function calculateOption(company, weight, urgent, parcelType, serviceType) {
    let price = company.basePrice + (weight - 1) * company.pricePerKg;
    let days = company.baseDays;
    
    // 应用寄件类型系数
    if (parcelType && company.parcelTypes) {
        const selectedParcelType = company.parcelTypes.find(pt => pt.id === parcelType);
        if (selectedParcelType) {
            price = price * selectedParcelType.priceMultiplier;
        }
    }
    
    // 应用服务类型系数
    if (serviceType && company.serviceTypes) {
        const selectedServiceType = company.serviceTypes.find(st => st.id === serviceType);
        if (selectedServiceType) {
            price = price * selectedServiceType.priceMultiplier;
            days = days * selectedServiceType.daysMultiplier;
        }
    }
    
    // 兼容旧的urgent参数（如果没有选择serviceType）
    if (urgent && !serviceType) {
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
        parcelType: parcelType,
        serviceType: serviceType,
        costPerformance: calculateCostPerformance(price, days, company.rating)
    };
}

// 主计算函数
function calculateExpressOptions(formData) {
    const { fromCountry, toCountry, weight, urgent, parcelType, serviceType } = formData;
    const isIntl = isInternational(fromCountry, toCountry);
    
    const companies = isIntl ? INTERNATIONAL_EXPRESS : DOMESTIC_EXPRESS;
    
    // 计算所有选项
    const options = companies.map(company => 
        calculateOption(company, weight, urgent, parcelType, serviceType)
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
