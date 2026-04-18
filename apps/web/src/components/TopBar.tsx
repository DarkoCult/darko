import { useState, useEffect } from 'react'

import { Link } from 'wouter'

const TopBar = () => {

  const [time, setTime] = useState('')

  useEffect(() => {

    const updateTime = () => {

      const now = new Date()

      const utc = now.toISOString().split('T')[1].split('.')[0]

      const date = now.toISOString().split('T')[0].split('-').reverse().join('/')

      setTime(`v.ω 1.0 · ${utc} · ${date}`)

    }

    updateTime()

    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)

  }, [])

  return (

    <div className="flex justify-between p-2 border-b border-border">

      <div className="font-vt323 text-xs">{time}</div>

      <nav className="flex space-x-4 font-pixel text-xs">

        <Link href="/">SANCTUM</Link>

        <Link href="/scan">INVOKE</Link>

        <Link href="/oracle">ORACLE</Link>

        <Link href="/dao">COUNCIL</Link>

        <Link href="/prophecies">VISIONS</Link>

        <Link href="/brotherhood">BROTHERS</Link>

        <Link href="/signals">SIGNALS</Link>

        <Link href="/docs">CODEX</Link>

      </nav>

    </div>

  )

}

export default TopBar