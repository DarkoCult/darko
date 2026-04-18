import TopBar from './TopBar'

import UrlBar from './UrlBar'

import BottomBar from './BottomBar'

interface LayoutProps {

  children: React.ReactNode

}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (

    <div className="min-h-screen bg-background text-foreground scanline">

      <TopBar />

      <UrlBar />

      <main className="p-4">

        {children}

      </main>

      <BottomBar />

    </div>

  )

}

export default Layout