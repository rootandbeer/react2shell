'use client'

import { useState } from 'react'
import { submitAction } from './actions'

export default function Home() {
  const [result, setResult] = useState<string>('')

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await submitAction(formData)
      setResult(JSON.stringify(response, null, 2))
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React2Shell Vulnerable Application</h1>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        This application is intentionally vulnerable to CVE-2025-55182 / CVE-2025-66478
        for educational purposes.
      </p>
      
      <form action={handleSubmit} style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="data1" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Data Field 1:
          </label>
          <input
            type="text"
            id="data1"
            name="1"
            defaultValue="{}"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="data0" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Data Field 0:
          </label>
          <input
            type="text"
            id="data0"
            name="0"
            defaultValue='["$1:a:a"]'
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h3>Result:</h3>
          <pre style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {result}
          </pre>
        </div>
      )}
    </main>
  )
}


