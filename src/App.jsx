import { useState } from 'react'

function App() {
  const [DynamicComponent, setDynamicComponent] = useState(null)

  const loadComponent = async () => {
    // 动态导入组件
    const module = await import('./components/DynamicComponent')
    setDynamicComponent(() => module.default)
  }

  return (
    <div>
      <h1>React Dynamic Import Demo</h1>
      <button onClick={loadComponent}>
        Load Dynamic Component
      </button>
      {DynamicComponent && (
        <div style={{ marginTop: '20px' }}>
          <DynamicComponent />
        </div>
      )}
    </div>
  )
}

export default App
