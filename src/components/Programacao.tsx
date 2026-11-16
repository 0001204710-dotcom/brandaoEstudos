import { useState, useEffect } from 'react'

// Molde de cada anotação de programação
interface NotaDev {
  id: number
  titulo: string
  linguagem: string
  codigoOuNota: string
}

export function Programacao() {
  const [titulo, setTitulo] = useState<string>('')
  const [linguagem, setLinguagem] = useState<string>('TypeScript / TSX')
  const [codigoOuNota, setCodigoOuNota] = useState<string>('')

  // Carrega as notas salvas no navegador ou inicia com um card explicando o useState
  const [notas, setNotas] = useState<NotaDev[]>(() => {
    const salvas = localStorage.getItem('@brandao-estudos:dev')
    if (salvas) return JSON.parse(salvas)

    return [
      {
        id: 1,
        titulo: 'Como funciona o useState',
        linguagem: 'React / TSX',
        codigoOuNota: 'const [valor, setValor] = useState<tipo>(valorInicial)\n// Sempre que setValor é chamado, a tela atualiza.',
      },
    ]
  })

  // Salva automaticamente qualquer alteração nas notas de programação
  useEffect(() => {
    localStorage.setItem('@brandao-estudos:dev', JSON.stringify(notas))
  }, [notas])

  function salvarNota(evento: React.FormEvent) {
    evento.preventDefault()
    if (titulo.trim() === '' || codigoOuNota.trim() === '') return

    const novaNota: NotaDev = {
      id: Date.now(),
      titulo,
      linguagem,
      codigoOuNota,
    }

    // Coloca a nota mais recente no TOPO da lista (antes de '...notas')
    setNotas([novaNota, ...notas])

    // Limpa os campos após salvar
    setTitulo('')
    setCodigoOuNota('')
  }

  function apagarNota(id: number) {
    setNotas(notas.filter((nota) => nota.id !== id))
  }

  return (
    <section className="area-dev">
      <h2>Área Dev & Programação</h2>
      <p>Guarde seus resumos de código, hooks do React e lógica.</p>

      {/* Formulário em coluna para título, tecnologia e bloco de anotações */}
      <form onSubmit={salvarNota} className="form-dev">
        <div className="linha-inputs">
          <input
            type="text"
            placeholder="Título da anotação (ex: Como usar .map)"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <select value={linguagem} onChange={(e) => setLinguagem(e.target.value)}>
            <option value="TypeScript / TSX">TypeScript / TSX</option>
            <option value="React">React</option>
            <option value="CSS">CSS</option>
            <option value="Lógica / Algoritmos">Lógica / Algoritmos</option>
          </select>
        </div>

        {/* '<textarea>' é uma caixa de texto grande de várias linhas para escrever código ou resumos */}
        <textarea
          rows={4}
          placeholder="Escreva sua explicação ou cole um trecho de código aqui..."
          value={codigoOuNota}
          onChange={(e) => setCodigoOuNota(e.target.value)}
        />

        <button type="submit">Salvar Anotação</button>
      </form>

      {/* Grade de cards com as anotações salvas */}
      <div className="lista-notas">
        {notas.map((nota) => (
          <article key={nota.id} className="card-nota">
            <div className="card-topo">
              <span className="tag-materia">{nota.linguagem}</span>
              <button
                type="button"
                className="btn-remover"
                onClick={() => apagarNota(nota.id)}
              >
                🗑️
              </button>
            </div>

            <h3>{nota.titulo}</h3>

            {/* A tag '<pre>' mantém as quebras de linha e espaços exatos de um código */}
            <pre className="bloco-codigo">{nota.codigoOuNota}</pre>
          </article>
        ))}
      </div>
    </section>
  )
}
