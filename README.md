# React Dynamic Import Demo

这个项目演示了在React中如何实现动态导入（Dynamic Import）组件的功能。

## 功能描述

- 页面上有一个按钮
- 点击按钮后，会动态加载另一个JS文件中定义的React组件
- 加载完成后，将该组件渲染到页面上

## 技术栈

- React
- Vite
- JavaScript
- pnpm

## 关于模块导入的执行顺序

当我们点击按钮时，会看到如下日志输出：
```
### 开始导入main.js
### 成功导入main.js
### 开始导入main.js
### 成功导入main.js
### 递归导入完成，module: Module {Symbol(Symbol.toStringTag): 'Module'}
### 递归导入完成，module: Module {Symbol(Symbol.toStringTag): 'Module'}
```

为什么会看到两次模块执行，而不是一次或无限次？这涉及到ES模块的加载机制：

1. 第一次导入 main.js 开始执行：
   ```javascript
   console.log('### 开始导入main.js');     // 第一次执行
   // ... DOM操作 ...
   import('./main.js')                    // 此时第一次导入还未完成！
   console.log('### 成功导入main.js');     // 第一次执行结束
   ```

2. 因为第一次导入还没完成，所以第二次导入会真实执行：
   ```javascript
   console.log('### 开始导入main.js');     // 第二次执行
   // ... DOM操作 ...
   import('./main.js')                    // 此时第一次导入已完成
   console.log('### 成功导入main.js');     // 第二次执行结束
   ```

3. 当第二次执行中的 `import('./main.js')` 试图发起第三次导入时，由于第一次的模块加载已经完成，
   模块系统就直接返回了缓存的模块实例，不会再次执行模块代码。

这说明模块的缓存机制是在模块完全执行完成后才生效的！

## 如何运行

1. 安装依赖：
```bash
pnpm install
```

2. 启动开发服务器：
```bash
pnpm start
```

3. 在浏览器中访问 http://localhost:5173
