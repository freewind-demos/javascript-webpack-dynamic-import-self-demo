console.log('### 开始导入main.js');

console.log("### 当前URL:", import.meta.url);

const container = document.getElementById('container');
const div = document.createElement('div');
const timestamp = new Date().toISOString();
div.textContent = `Hello from main.js! (${timestamp})`;
container.appendChild(div);

// 立即导入自己，不等待前面的代码执行完
console.log('### 准备递归导入');
const importPromise = import('./main.js');

// 继续执行一些耗时操作
await new Promise(resolve => setTimeout(resolve, 2000));

importPromise.then(module => {
    console.log('### 递归导入完成，module:', module);
    // 如果模块被重新执行,会看到不同的时间戳
    console.log('### 原始时间戳:', timestamp);
});

console.log('### 成功导入main.js');
