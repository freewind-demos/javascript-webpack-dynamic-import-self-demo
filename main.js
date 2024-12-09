console.log('### 开始导入main.js');

console.log("### 当前URL:", import.meta.url);

const container = document.getElementById('container');
const div = document.createElement('div');
div.textContent = `Hello from main.js! (${new Date().toISOString()})`;
container.appendChild(div);

// 立即导入自己，不等待前面的代码执行完
console.log('### 准备递归导入');
const importPromise = import('./main.js');

// 继续执行一些耗时操作
await new Promise(resolve => setTimeout(resolve, 2000));

importPromise.then(module => {
    console.log('### 递归导入完成，module:', module);
});

console.log('### 成功导入main.js');
