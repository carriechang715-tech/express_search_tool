// 主应用逻辑

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeCitySelects();
    setupEventListeners();
});

// 初始化城市选择框
function initializeCitySelects() {
    const fromCountry = document.getElementById('fromCountry');
    const toCountry = document.getElementById('toCountry');
    
    updateCitySelect('fromCity', fromCountry.value);
    updateCitySelect('toCity', toCountry.value);
}

// 更新城市选择框
function updateCitySelect(selectId, countryCode) {
    const select = document.getElementById(selectId);
    const cities = COUNTRIES[countryCode].cities;
    
    select.innerHTML = '';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        select.appendChild(option);
    });
}

// 设置事件监听器
function setupEventListeners() {
    const form = document.getElementById('expressForm');
    const fromCountry = document.getElementById('fromCountry');
    const toCountry = document.getElementById('toCountry');
    
    // 国家变化时更新城市
    fromCountry.addEventListener('change', function() {
        updateCitySelect('fromCity', this.value);
        updateDynamicOptions(); // 更新寄件类型和服务类型
    });
    
    toCountry.addEventListener('change', function() {
        updateCitySelect('toCity', this.value);
        updateDynamicOptions(); // 更新寄件类型和服务类型
    });
    
    // 表单提交
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
    
    // 初始化动态选项
    updateDynamicOptions();
}

// 更新动态选项（寄件类型和服务类型）
function updateDynamicOptions() {
    const fromCountry = document.getElementById('fromCountry').value;
    const toCountry = document.getElementById('toCountry').value;
    const isIntl = fromCountry !== toCountry;
    
    const companies = isIntl ? INTERNATIONAL_EXPRESS : DOMESTIC_EXPRESS;
    
    // 收集所有寄件类型
    const allParcelTypes = new Map();
    const allServiceTypes = new Map();
    
    companies.forEach(company => {
        if (company.parcelTypes) {
            company.parcelTypes.forEach(pt => {
                if (!allParcelTypes.has(pt.id)) {
                    allParcelTypes.set(pt.id, pt);
                }
            });
        }
        if (company.serviceTypes) {
            company.serviceTypes.forEach(st => {
                if (!allServiceTypes.has(st.id)) {
                    allServiceTypes.set(st.id, st);
                }
            });
        }
    });
    
    // 更新寄件类型选项
    updateParcelTypeSelect(allParcelTypes);
    
    // 更新服务类型选项
    updateServiceTypeSelect(allServiceTypes);
}

// 更新寄件类型选择框
function updateParcelTypeSelect(parcelTypes) {
    const select = document.getElementById('parcelType');
    if (!select) return;
    
    select.innerHTML = '<option value="">请选择寄件类型</option>';
    
    parcelTypes.forEach((type, id) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${type.name} - ${type.description}`;
        select.appendChild(option);
    });
}

// 更新服务类型选择框
function updateServiceTypeSelect(serviceTypes) {
    const select = document.getElementById('serviceType');
    if (!select) return;
    
    select.innerHTML = '<option value="">请选择服务类型</option>';
    
    serviceTypes.forEach((type, id) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${type.name} - ${type.description}`;
        select.appendChild(option);
    });
}

// 处理表单提交
function handleFormSubmit() {
    const formData = {
        fromCountry: document.getElementById('fromCountry').value,
        fromCity: document.getElementById('fromCity').value,
        toCountry: document.getElementById('toCountry').value,
        toCity: document.getElementById('toCity').value,
        weight: parseFloat(document.getElementById('weight').value),
        urgent: document.getElementById('urgent').checked,
        parcelType: document.getElementById('parcelType')?.value || null,
        serviceType: document.getElementById('serviceType')?.value || null
    };
    
    const results = calculateExpressOptions(formData);
    displayResults(results);
}

// 显示结果
function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    const { type, options, recommended } = results;
    
    const typeText = type === 'international' ? '🌍 国际快递评估结果' : '🇨🇳 国内快递评估结果';
    
    let html = `
        <div class="results-header">
            <h2>${typeText}</h2>
            <button class="reset-btn" onclick="resetForm()">重新评估</button>
        </div>
        
        <div class="recommended-section">
            <div class="recommended-badge">⭐ 推荐</div>
            <div class="recommended-card">
                <div class="company-header">
                    <h3>${recommended.name}</h3>
                    <div class="company-tags">
                        <span class="tag tag-primary">${recommended.tag}</span>
                        <span class="tag tag-value">性价比最高</span>
                    </div>
                </div>
                
                <div class="company-info">
                    <div class="info-item">
                        <span class="info-label">预估费用</span>
                        <span class="info-value price">¥${recommended.price}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">预计时效</span>
                        <span class="info-value">${recommended.time}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">性价比</span>
                        <span class="info-value rating">${'★'.repeat(recommended.rating)}${'☆'.repeat(5-recommended.rating)}</span>
                    </div>
                </div>
                
                <div class="company-features">
                    <h4>服务特点：</h4>
                    <ul>
                        ${recommended.features.map(f => `<li>✓ ${f}</li>`).join('')}
                    </ul>
                </div>
                
                <a href="${recommended.website}" target="_blank" rel="noopener noreferrer" class="website-btn">
                    🌐 访问官网
                </a>
            </div>
        </div>
        
        <div class="other-options-section">
            <h3>📋 其他快递选项</h3>
            <div class="options-grid">
                ${options.filter(opt => opt.name !== recommended.name).map(option => `
                    <div class="option-card">
                        <div class="option-header">
                            <h4>${option.name}</h4>
                            <span class="tag">${option.tag}</span>
                        </div>
                        
                        <div class="option-info">
                            <div class="info-row">
                                <span>💰 费用</span>
                                <strong>¥${option.price}</strong>
                            </div>
                            <div class="info-row">
                                <span>⏱️ 时效</span>
                                <strong>${option.time}</strong>
                            </div>
                            <div class="info-row">
                                <span>⭐ 评分</span>
                                <strong>${'★'.repeat(option.rating)}${'☆'.repeat(5-option.rating)}</strong>
                            </div>
                        </div>
                        
                        <div class="option-features">
                            ${option.features.map(f => `<div class="feature-tag">✓ ${f}</div>`).join('')}
                        </div>
                        
                        <a href="${option.website}" target="_blank" rel="noopener noreferrer" class="website-link">
                            访问官网 →
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="tips-section">
            <h4>💡 温馨提示</h4>
            <ul>
                <li>以上价格为预估价格，实际费用可能因包裹尺寸、目的地偏远程度等因素有所差异</li>
                <li>时效仅供参考，可能受天气、海关检查、节假日等因素影响</li>
                <li>建议联系快递公司客服获取准确报价和服务详情</li>
                <li>发送国际快递前，请确认物品是否符合目的地国家的进口规定</li>
            </ul>
        </div>
    `;
    
    container.innerHTML = html;
    container.style.display = 'block';
    
    // 滚动到结果区域
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 重置表单
function resetForm() {
    const container = document.getElementById('resultsContainer');
    container.style.display = 'none';
    
    // 滚动到表单顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
