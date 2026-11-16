import { useState, useEffect } from 'react'

// Molde para guardar cada opção de curso/universidade que você está mirando para 2028/29
interface MetaFaculdade {
  id: number
  curso: string
  universidade: string
  notaCorte: number
}

export function Faculdade() {
  // Estados para o formulário de cadastrar universidades desejadas
  const [curso, setCurso] = useState<string>('')
  const [universidade, setUniversidade] = useState<string>('')
  // Como inputs HTML sempre devolvem texto (string), guardamos como string e convertemos para número ao salvar
  const [notaCorte, setNotaCorte] = useState<string>('')

  // Estado que guarda a sua melhor média atual nos simulados do ENEM (salva separada no localStorage)
  const [minhaMedia, setMinhaMedia] = useState<number>(() => {
    const mediaSalva = localStorage.getItem('@brandao-estudos:media-simulado')
    // 'Number(...)' transforma o texto salvo de volta em número matemático
    return mediaSalva ? Number(mediaSalva) : 650
  })

  // Lista de metas de faculdade salva no navegador
  const [metas, setMetas] = useState<MetaFaculdade[]>(() => {
    const salvas = localStorage.getItem('@brandao-estudos:faculdade')
    if (salvas) return JSON.parse(salvas)

    return [
      { id: 1, curso: 'Ciência da Computação', universidade: 'UFMG', notaCorte: 765 },
      { id: 2, curso: 'Engenharia de Software', universidade: 'USP / Federal', notaCorte: 780 },
    ]
  })

  // Salva a lista de metas toda vez que ela mudar
  useEffect(() => {
    localStorage.setItem('@brandao-estudos:faculdade', JSON.stringify(metas))
  }, [metas])

  // Salva a sua média de simulado toda vez que você alterar o número lá em cima
  useEffect(() => {
    localStorage.setItem('@brandao-estudos:media-simulado', String(minhaMedia))
  }, [minhaMedia])

  function adicionarMeta(evento: React.FormEvent) {
    evento.preventDefault()
    if (curso.trim() === '' || universidade.trim() === '' || notaCorte === '') return

    const novaMeta: MetaFaculdade = {
      id: Date.now(),
      curso,
      universidade,
      notaCorte: Number(notaCorte), // Converte o texto do input para número real
    }

    setMetas([...metas, novaMeta])

    // Limpa os campos do formulário
    setCurso('')
    setUniversidade('')
    setNotaCorte('')
  }

  function removerMeta(id: number) {
    setMetas(metas.filter((meta) => meta.id !== id))
  }

  return (
    <section className="area-faculdade">
      <h2>Meta: Faculdade (2028/2029)</h2>
      <p>Acompanhe quanto falta nos simulados para alcançar o curso desejado.</p>

      {/* Painel destaque onde você atualiza sua nota média atual nos simulados */}
      <div className="painel-media">
        <label htmlFor="input-media">Minha média atual nos simulados (ENEM):</label>
        <input
          id="input-media"
          type="number"
          min="0"
          max="1000"
          value={minhaMedia}
          // 'Number(e.target.value)' garante que o estado receba um número e não um texto
          onChange={(e) => setMinhaMedia(Number(e.target.value))}
        />
      </div>

      {/* Formulário para adicionar novos cursos/universidades */}
      <form onSubmit={adicionarMeta} className="form-estudo">
        <input
          type="text"
          placeholder="Curso (ex: Sistemas de Informação)"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
        />

        <input
          type="text"
          placeholder="Faculdade (ex: UFMG, Unicamp)"
          value={universidade}
          onChange={(e) => setUniversidade(e.target.value)}
        />

        <input
          type="number"
          placeholder="Nota de corte"
          value={notaCorte}
          onChange={(e) => setNotaCorte(e.target.value)}
          style={{ width: '140px', flex: 'none' }}
        />

        <button type="submit">Adicionar Meta</button>
      </form>

      {/* Lista de universidades com cálculo automático de diferença de pontos */}
      <div className="lista-notas">
        {metas.map((meta) => {
          // Lógica matemática feita dentro do '.map()' para cada cartão individual:
          const diferenca = minhaMedia - meta.notaCorte
          const passou = diferenca >= 0

          return (
            <article key={meta.id} className="card-nota">
              <div className="card-topo">
                <span className="tag-materia">{meta.universidade}</span>
                <button
                  type="button"
                  className="btn-remover"
                  onClick={() => removerMeta(meta.id)}
                >
                  🗑️
                </button>
              </div>

              <h3>{meta.curso}</h3>
              <p>Nota de corte alvo: <strong>{meta.notaCorte} pts</strong></p>

              {/* Operador ternário '? :' para mudar a mensagem e a cor dependendo se atingiu a nota */}
              <p className={passou ? 'status-aprovado' : 'status-faltando'}>
                {passou
                  ? `🎉 Você já atingiu a nota! (+${diferenca.toFixed(0)} pts acima)`
                  : `🎯 Faltam ${Math.abs(diferenca).toFixed(0)} pontos para alcançar`}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
