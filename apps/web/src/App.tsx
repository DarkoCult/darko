import { Router, Route } from 'wouter'

import Layout from './components/Layout'

import Sanctum from './pages/Sanctum'

import Scan from './pages/Scan'

import Oracle from './pages/Oracle'

import Dao from './pages/Dao'

import Prophecies from './pages/Prophecies'

import Brotherhood from './pages/Brotherhood'

import Signals from './pages/Signals'

import Codex from './pages/Codex'

function App() {

  return (

    <Router>

      <Layout>

        <Route path="/" component={Sanctum} />

        <Route path="/scan" component={Scan} />

        <Route path="/oracle" component={Oracle} />

        <Route path="/dao" component={Dao} />

        <Route path="/prophecies" component={Prophecies} />

        <Route path="/brotherhood" component={Brotherhood} />

        <Route path="/signals" component={Signals} />

        <Route path="/docs" component={Codex} />

      </Layout>

    </Router>

  )

}

export default App