import { useState } from 'react'

import { Button } from '@darko/ui'

import { OracleResponse } from '@darko/api-types'

const Oracle = () => {

  const [question, setQuestion] = useState('')

  const [result, setResult] = useState<OracleResponse | null>(null)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setLoading(true)

    try {

      const res = await fetch('/api/oracle', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ question }),

      })

      const data = await res.json()

      setResult(data)

    } catch (e) {

      console.error(e)

    }

    setLoading(false)

  }

  return (

    <div>

      <h1 className="font-vt323 text-xl">ORACLE</h1>

      <form onSubmit={handleSubmit} className="mb-4">

        <textarea

          value={question}

          onChange={e => setQuestion(e.target.value)}

          placeholder="Ask the oracle"

          className="border border-border bg-background p-2 w-full"

        />

        <Button type="submit" disabled={loading}>CONSULT</Button>

      </form>

      {result && (

        <div className="border border-border p-4">

          <h2 className="font-pixel">{result.ritual}</h2>

          <p>{result.answer}</p>

        </div>

      )}

    </div>

  )

}

export default Oracle