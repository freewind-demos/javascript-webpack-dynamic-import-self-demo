console.log('### index.js loaded');

// 确保window.loadModule存在
window.loadModule = async function () {
    await import('./main.js');
}; 