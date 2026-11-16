// Importa o 'useState' do React para guardar e atualizar nossa lista de estudos.
import { useState } from 'react'

// 'interface' é do TypeScript: ela define o formato obrigatório de cada item da nossa lista.
// Todo tópico de estudo PRECISA ter um id (número), um texto (string) e um status concluido (verdadeiro/falso).
interface TopicoEnem {
  id: number
  titulo: string
  materia: string
  concluido: boolean
}

// Exportamos a função 'Enem' para que o 'App.tsx' consiga importá-la e exibi-la na tela.
export function Enem() {
  // Estado 1: Guarda o que você está digitando no campo de texto no momento. Começa vazio ''.
  const [novoTitulo, setNovoTitulo] = useState<string>('')

  // Estado 2: Guarda a matéria selecionada no campo de escolha. Começa em 'Matemática'.
  const [materia, setMateria] = useState<string>('Matemática')

  // Estado 3: Guarda uma LISTA (array []) de objetos do tipo 'TopicoEnem'.
  // Já deixamos 2 exemplos iniciais para você ver a lista funcionando assim que abrir.
  const [topicos, setTopicos] = useState<TopicoEnem[]>([
    { id: 1, titulo: 'Porcentagem e Regra de Três', materia: 'Matemática', concluido: false },
    { id: 2, titulo: 'Estrutura da Redação Dissertativa', materia: 'Redação', concluido: true },
  ])

  // Função disparada quando você envia o formulário para adicionar um novo assunto.
  // 'React.FormEvent' avisa ao TypeScript que 'evento' vem de um formulário HTML.
  function adicionarTopico(evento: React.FormEvent) {
    // Impede o comportamento padrão do navegador de recarregar a página inteira ao enviar formulário.
    evento.preventDefault()

    // '.trim()' remove espaços em branco nas pontas. Se o campo estiver vazio, 'return' para a função aqui.
    if (novoTitulo.trim() === '') return

    // Monta o novo objeto seguindo exatamente a 'interface TopicoEnem' criada lá em cima.
    const novoItem: TopicoEnem = {
      id: Date.now(), // Gera um número único usando o horário atual em milissegundos.
      titulo: novoTitulo,
      materia: materia,
      concluido: false, // Todo assunto recém-criado começa como não concluído.
    }

    // Atualiza a lista: os três pontos '...' (spread operator) copiam todos os itens antigos
    // e colocam o 'novoItem' no final da nova lista.
    setTopicos([...topicos, novoItem])

    // Limpa o campo de digitação depois de adicionar.
    setNovoTitulo('')
  }

  // Função para marcar ou desmarcar um assunto como concluído pelo 'id' dele.
  function alternarConclusao(idParaAlterar: number) {
    // '.map()' percorre cada item da lista e cria uma nova lista atualizada:
    const listaAtualizada = topicos.map((item) => {
      // Se o id deste item for o mesmo que clicamos, invertemos o valor de 'concluido' (!item.concluido).
      if (item.id === idParaAlterar) {
        return { ...item, concluido: !item.concluido }
      }
      // Se não for o item clicado, devolve ele exatamente como estava.
      return item
    })

    // Salva a nova lista atualizada no estado, fazendo a tela redesenhar.
    setTopicos(listaAtualizada)
  }

  // Parte visual (JSX/TSX) do componente Enem:
  return (
    <section className="area-enem">
      <h2>Foco: ENEM 2027</h2>
      <p>Organize seus assuntos por área e marque o que já dominou.</p>

      {/* Formulário para adicionar novos tópicos. 'onSubmit' chama nossa função ao clicar no botão ou apertar Enter */}
      <form onSubmit={adicionarTopico} className="form-estudo">
        {/* Input controlado: o valor dele vem do estado 'novoTitulo' e cada tecla digitada atualiza esse estado */}
        <input
          type="text"
          placeholder="Ex: Revolução Industrial, Ecologia..."
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
        />

        {/* Menu suspenso para escolher a área do ENEM */}
        <select value={materia} onChange={(e) => setMateria(e.target.value)}>
          <option value="Matemática">Matemática</option>
          <option value="Linguagens">Linguagens</option>
          <option value="Humanas">Humanas</option>
          <option value="Natureza">Natureza</option>
          <option value="Redação">Redação</option>
        </select>

        <button type="submit">Adicionar</button>
      </form>

      {/* Lista visual de tópicos */}
      <ul className="lista-topicos">
        {/* '.map()' transforma cada objeto do array 'topicos' em um item visual <li> na tela */}
        {/* 'key={item.id}' é obrigatório no React para ele saber exatamente qual item mudou na lista */}
        {topicos.map((item) => (
          <li
            key={item.id}
            className={item.concluido ? 'item-concluido' : ''}
            onClick={() => alternarConclusao(item.id)}
          >
            <span className="tag-materia">{item.materia}</span>
            <span className="titulo-topico">{item.titulo}</span>
            <span>{item.concluido ? '✅' : '⬜'}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
