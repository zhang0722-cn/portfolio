@echo off
title 张浩雷作品集 - Vite 开发服务器
echo 正在启动网站服务器，请稍候...
echo 启动后访问: http://localhost:5173/
echo 关闭本窗口即可停止服务器
echo.
cd /d D:\个人网页
"C:\Users\张浩雷\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "D:\个人网页\node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 5173 --strictPort
pause