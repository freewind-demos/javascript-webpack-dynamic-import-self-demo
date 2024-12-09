# Dynamic Import Self Demo

这个demo演示了在JavaScript中动态导入模块自身时的行为。

## 关键代码

```javascript
// main.js
console.log('### 开始导入main.js');
console.log("### 当前URL:", import.meta.url);

const container = document.getElementById('container');
const div = document.createElement('div');
div.textContent = `Hello from main.js! (${new Date().toISOString()})`;
container.appendChild(div);

// 立即导入自己
console.log('### 准备递归导入');
const importPromise = import('./main.js');

importPromise.then(module => {
    console.log('### 递归导入完成，module:', module);
});

console.log('### 成功导入main.js');
```

## 模块加载行为分析

当点击按钮时，会看到如下日志输出：

```
### 开始导入main.js
### 当前URL: http://localhost:5173/main.js
### 准备递归导入
### 成功导入main.js
### 开始导入main.js
### 当前URL: http://localhost:5173/main.js?t=1733750455748
### 准备递归导入
### 成功导入main.js
### 递归导入完成，module: Module {Symbol(Symbol.toStringTag): 'Module'}
### 递归导入完成，module: Module {Symbol(Symbol.toStringTag): 'Module'}
```

这个输出揭示了几个关键点：

1. 第一次执行：
   - URL是 `http://localhost:5173/main.js`
   - 执行完整个模块代码
   - 遇到 `import('./main.js')` 时，Vite 会添加时间戳

2. 第二次执行：
   - URL变成了 `http://localhost:5173/main.js?t=1733750455748`
   - 由于URL不同，被视为新的模块，触发了第二次执行
   - 当这次执行遇到 `import('./main.js')` 时，Vite 会复用相同的时间戳
   - 因此第三次导入实际上和第二次是同一个URL，不会触发新的执行

3. 最后两个"递归导入完成"消息：
   - 来自两次执行中的 `importPromise.then` 回调
   - 虽然是不同的Module对象（因为URL不同），但结构相同

## 关键发现

1. Vite的开发服务器对动态import的处理策略：
   - 首次遇到重复import时，添加时间戳参数
   - 后续的重复import会复用同样的时间戳
   - 这个机制确保了模块最多只会执行两次

2. 不同URL（即使指向同一个文件）会被视为不同的模块
3. 每个模块实例都有完整的执行上下文

## 运行项目

```bash
npm install
npm start
```

然后点击页面上的按钮，观察控制台输出。
