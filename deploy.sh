#!/bin/bash

# 快递评估工具 - GitHub Pages 发布脚本

echo "🚀 开始发布快递评估工具到 GitHub Pages..."
echo ""

# 检查是否已经初始化 Git
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git branch -M main
fi

# 添加所有文件
echo "📝 添加文件到 Git..."
git add .

# 提交
echo "💾 提交更改..."
read -p "请输入提交信息 (默认: Update): " commit_message
commit_message=${commit_message:-"Update"}
git commit -m "$commit_message"

# 检查是否已经添加远程仓库
if ! git remote | grep -q origin; then
    echo ""
    echo "🔗 请输入您的 GitHub 仓库地址："
    echo "格式示例: https://github.com/username/express-tool.git"
    read -p "仓库地址: " repo_url
    git remote add origin "$repo_url"
fi

# 推送到 GitHub
echo ""
echo "⬆️  推送到 GitHub..."
git push -u origin main

echo ""
echo "✅ 发布完成！"
echo ""
echo "📌 下一步："
echo "1. 访问您的 GitHub 仓库"
echo "2. 进入 Settings → Pages"
echo "3. 在 Source 选择 'main' 分支"
echo "4. 点击 Save"
echo "5. 等待几分钟后访问您的网站"
echo ""
echo "🌐 您的网站地址将是："
echo "https://您的用户名.github.io/express-tool/"
echo ""
