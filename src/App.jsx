import { Component, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { RepositorioInnovacionIA } from './pages/RepositorioInnovacionIA'

const EntrenamientoSaber11 = lazy(() => import('./pages/EntrenamientoSaber11'))

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(e) { return { error: e.message } }
  render() {
    if (this.state.error) return <div style={{padding:'2rem',color:'red',fontSize:'14px'}}><b>Error:</b> {this.state.error}</div>
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div style={{padding:'2rem',textAlign:'center'}}>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<RepositorioInnovacionIA />} />
          <Route path="/entrenamiento-saber11-matematicas" element={<EntrenamientoSaber11 />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
