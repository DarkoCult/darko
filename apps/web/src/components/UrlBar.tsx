import { useLocation } from 'wouter'

const UrlBar = () => {

  const [location] = useLocation()

  const path = location === '/' ? 'sanctum/index' : location.slice(1).replace(/\//g, '/')

  const address = `darko://${path}.html`

  return (

    <div className="flex justify-between p-2 border-b border-border bg-gray-900">

      <div className="font-mono text-xs">// darknet markets //</div>

      <div className="font-mono text-xs">{address}</div>

      <div className="font-mono text-xs">_</div>

      <div className="font-vt323 text-xs">DARKO</div>

    </div>

  )

}

export default UrlBar