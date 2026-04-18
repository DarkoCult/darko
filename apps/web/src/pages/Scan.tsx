import { useState } from 'react'

import { Button } from '@darko/ui'

import { ScanResponse } from '@darko/api-types'

const Scan = () => {

  const [ca, setCa] = useState('')

  const [result, setResult] = useState<ScanResponse | null>(null)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setLoading(true)

    try {

      const res = await fetch('/api/scan', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ ca }),

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

      <h1 className="font-vt323 text-xl">INVOKE</h1>

      <form onSubmit={handleSubmit} className="mb-4">

        <input

          type="text"

          value={ca}

          onChange={e => setCa(e.target.value)}

          placeholder="Enter CA"

          className="border border-border bg-background p-2 w-full"

        />

        <Button type="submit" disabled={loading}>INVOKE</Button>

      </form>

      {result && (

        <div className="border border-border p-4">

          <h2 className="font-pixel">RESULT</h2>

          <p>CA: {result.ca}</p>

          <p>Verdict: {result.verdict}</p>

          <p>Risk Score: {result.riskScore}</p>

          <p>{result.cultAnalysis}</p>

        </div>

      )}

    </div>

  )

}

export default Scan