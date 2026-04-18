import { useEffect, useState } from 'react'

import { Link } from 'wouter'

import { ScanResponse, Signal } from '@darko/api-types'

const Sanctum = () => {

  const [scans, setScans] = useState<ScanResponse[]>([])

  const [signals, setSignals] = useState<Signal[]>([])

  useEffect(() => {

    fetch('/api/scan/history?limit=5').then(r => r.json()).then(setScans)

    fetch('/api/signals/pinned').then(r => r.json()).then(setSignals)

  }, [])

  return (

    <div>

      <h1 className="font-vt323 text-xl">SANCTUM</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>

          <h2 className="font-pixel">LATEST SCANS</h2>

          {scans.map(s => <div key={s.id} className="border border-border p-2">{s.ca} - {s.verdict}</div>)}

        </div>

        <div>

          <h2 className="font-pixel">PINNED SIGNALS</h2>

          {signals.map(s => <div key={s.id} className="border border-border p-2">{s.title}</div>)}

        </div>

      </div>

      <div className="mt-4 flex space-x-4">

        <Link href="/scan" className="font-pixel uppercase">INVOKE RITUAL</Link>

        <Link href="/oracle" className="font-pixel uppercase">CONSULT ORACLE</Link>

      </div>

    </div>

  )

}

export default Sanctum