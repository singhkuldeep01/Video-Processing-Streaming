
import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {


  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-5xl font-bold">Hello baby</h1>
      <h1>Count is: {count}</h1>
      <Button onClick={() => setCount(count + 1)}>click me</Button>
    </>
  )
}

export default App
