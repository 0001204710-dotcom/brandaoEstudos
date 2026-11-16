import { useState } from 'react'
import './App.css'
import { Enem } from './components/Enem'
import { Programacao } from './components/Programacao'
import { Faculdade } from './components/Faculdade'
// Importa o componente do cronômetro
import { Pomodoro } from './components/Pomodoro'

type AreaEstudo = 'enem' | 'programacao' | 'faculdade'

function App() {
  const [areaAtiva, setAreaAtiva] = useState<AreaEstudo>('enem')

  return (
    <div className="app-container">
      <header className="topo">
        <h1>Brandão Estudos</h1>

        {/* O cronômetro fica fixo no topo, funcionando mesmo se você trocar de aba */}
        <Pomodoro />

        <nav className="menu">
          <button
            className={areaAtiva === 'enem' ? 'ativo' : ''}
            onClick={() => setAreaAtiva('enem')}
          >
            ENEM 2027
          </button>

          <button
            className={areaAtiva === 'programacao' ? 'ativo' : ''}
            onClick={() => setAreaAtiva('programacao')}
          >
            Programação
          </button>

          <button
            className={areaAtiva === 'faculdade' ? 'ativo' : ''}
            onClick={() => setAreaAtiva('faculdade')}
          >
            Faculdade 2028/29
          </button>
        </nav>
      </header>

      <main className="conteudo">
        {areaAtiva === 'enem' && <Enem />}
        {areaAtiva === 'programacao' && <Programacao />}
        {areaAtiva === 'faculdade' && <Faculdade />}
      </main>
    </div>
  )
}

export default App
