import { useState, useEffect } from 'react'

export function Pomodoro() {
  // Guarda o tempo restante em SEGUNDOS (25 minutos * 60 segundos = 1500 segundos).
  const [segundosRestantes, setSegundosRestantes] = useState<number>(25 * 60)

  // Guarda se o relógio está rodando (true) ou pausado (false).
  const [rodando, setRodando] = useState<boolean>(false)

  // 'useEffect' controla o relógio a cada segundo.
  // Ele vigia 'rodando' e 'segundosRestantes'. Sempre que um deles muda, esse bloco reavalia o que fazer.
  useEffect(() => {
    // Se o relógio estiver pausado, não faz nada.
    if (!rodando) return

    // Se o tempo chegou a zero, pausa o relógio automaticamente e avisa.
    if (segundosRestantes === 0) {
      setRodando(false)
      alert('⏰ Tempo de estudo concluído! Hora de uma pausa de 5 minutos.')
      return
    }

    // 'setInterval' cria um temporizador no navegador que executa uma função a cada 1000 milissegundos (1 segundo).
    const intervalo = setInterval(() => {
      // Usamos '(tempoAnterior) => tempoAnterior - 1' para garantir que ele sempre pegue o valor mais atualizado.
      setSegundosRestantes((tempoAnterior) => tempoAnterior - 1)
    }, 1000)

    // FUNÇÃO DE LIMPEZA (Cleanup):
    // Quando o componente atualiza ou pausa, 'clearInterval' apaga o relógio antigo para não criar vários relógios sobrepostos.
    return () => clearInterval(intervalo)
  }, [rodando, segundosRestantes])

  // Função para reiniciar o timer para 25 minutos
  function resetarTimer() {
    setRodando(false)
    setSegundosRestantes(25 * 60)
  }

  // CÁLCULOS PARA MOSTRAR O RELÓGIO BONITO (MM:SS):
  // 'Math.floor' arredonda para baixo para pegar apenas os minutos inteiros.
  const minutos = Math.floor(segundosRestantes / 60)
  // O operador '%' (resto da divisão) pega os segundos que sobraram além dos minutos inteiros.
  const segundos = segundosRestantes % 60

  // 'String(...).padStart(2, '0')' garante que o número sempre tenha 2 dígitos (ex: '5' vira '05').
  const minutosFormatados = String(minutos).padStart(2, '0')
  const segundosFormatados = String(segundos).padStart(2, '0')

  return (
    <div className="caixa-pomodoro">
      <span className="label-foco">⏱️ Foco:</span>
      <strong className="relogio">
        {minutosFormatados}:{segundosFormatados}
      </strong>

      {/* Botão que alterna entre Iniciar e Pausar invertendo o estado '!rodando' */}
      <button type="button" onClick={() => setRodando(!rodando)}>
        {rodando ? 'Pausar' : 'Iniciar'}
      </button>

      <button type="button" className="btn-reset" onClick={resetarTimer}>
        Resetar
      </button>
    </div>
  )
}
