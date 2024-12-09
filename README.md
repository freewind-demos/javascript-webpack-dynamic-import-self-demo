# javascript-webpack-dynamic-import-self-demo

这个demo用来测试在webpack环境下,一个模块动态导入自身时的行为,并与vite的行为进行对比。

## 实验内容

在`main.js`中:
1. 执行一些初始化代码(创建div等)
2. 使用`import('./main.js')`动态导入自身
3. 等待2秒后检查导入结果

## 实验结果

### Webpack行为

1. 模块只会执行一次
2. 重复导入时会返回缓存的模块实例
3. 日志显示:
   ```
   ### 开始导入main.js
   ### 当前URL: file:///path/to/main.js
   ### 准备递归导入
   ### 成功导入main.js
   ### 递归导入完成，module: Module {__esModule: true, Symbol(Symbol.toStringTag): 'Module'}
   ### 原始时间戳: 2024-12-09T13:39:23.936Z
   ```
   - 时间戳保持不变,说明模块没有被重新执行

### Vite行为

1. 模块会被重复执行
2. 每次导入都会重新运行模块代码
3. 日志会显示多次"开始导入main.js"

## 行为差异分析

1. Webpack和Vite对动态导入的实现方式不同:
   - Webpack使用模块缓存,相同模块只执行一次
   - Vite会重新执行被导入的模块

2. 这个差异是在模块系统实现层面的,与开发/生产环境无关

## 运行Demo

1. 安装依赖:
   ```bash
   pnpm install
   ```

2. 启动开发服务器:
   ```bash
   pnpm start
   ```

3. 点击页面上的"Import Self"按钮测试动态导入
