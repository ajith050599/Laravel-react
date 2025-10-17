import React, { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4 border rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Counter Component</h2>
      <p className="mb-2">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Increment
      </button>
    </div>
  )
}
