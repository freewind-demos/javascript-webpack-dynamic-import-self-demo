console.log('### 开始导入main.js');

const container = document.getElementById('container');
const div = document.createElement('div');
div.textContent = `Hello from main.js! (${new Date().toISOString()})`;
container.appendChild(div);

// 继续导入自己
console.log('### [${Math.random().toFixed(3)}] 准备递归导入');
import('./main.js').then(module => {
    console.log('### 递归导入完成，module:', module);
});

console.log('### 成功导入main.js');
