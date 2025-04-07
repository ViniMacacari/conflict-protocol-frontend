import { Component, ElementRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss'
})
export class RulesComponent {
  displayedText = ''
  private index = 0
  private alreadyTyped = false

  @ViewChild('terminal', { static: false }) terminalRef!: ElementRef

  constructor(
    private router: Router
  ) { }

  fullText = `
1. Introdução
Conflict Protocol é um jogo de tabuleiro competitivo inspirado em RPGs de mesa, ambientado no mundo da tecnologia e desenvolvimento de software. Os jogadores controlam personagens em um combate por turnos, com o objetivo de coletar insígnias espalhadas pelo mapa e levá-las até o altar.

2. Componentes do Jogo
A caixa do jogo contém:
- 1 Tabuleiro com o mapa de Conflict Protocol
- 4 Peões representando os personagens jogáveis
- Cartas de Habilidade (decks únicos por personagem, com diferentes tipos de dano)
- Cartas de Buff
- Cartas de Insígnias

Importante: O jogo não acompanha dados físicos. Em vez disso, a caixa traz um QR Code que leva a este site do Conflict Protocol. Aqui, você encontrará:
- Todas as regras atualizadas
- Separação de rodadas e turnos
- Um rolador virtual de dados (D2 até D20)

3. Criação de Personagens
Os jogadores escolhem entre 4 personagens pré-criados, inspirados em cargos do mercado de desenvolvimento de software. Cada personagem possui habilidades e cartas próprias, e um valor fixo de movimentação por turno.

4. Mecânica do Jogo
- Iniciativa: Todos rolam um D20 no início da partida para definir a ordem dos turnos.
- Movimentação: Cada personagem tem um número fixo de casas que pode andar por turno.
- Buffs: Estão posicionados no mapa. Ao chegar a uma casa de buff, o jogador rola um D4 para sortear qual buff receberá (vida, ataque, defesa ou movimentação).
- Combate: Ocorre quando dois jogadores estão a duas casas de distância. Se pelo menos um quiser lutar, o combate inicia. Para atacar, rola-se um D20:
- Acerta se o valor for maior que a Defesa (CA) do inimigo
- 20: acerto crítico (dano dobrado)
- 1: erro crítico (sofre o próprio dano da carta)
- Fugir do Combate (rolagem de D20):
- 1 a 5: Não foge e perde uma insígnia
- 6 a 10: Não foge e mantém as insígnias
- 11 a 15: Foge, mas perde uma insígnia
- 16 a 20: Foge e mantém as insígnias

5. Morte e Reviver
Quando um jogador atinge 0 de vida, entra em Modo Vegetativo e tem 3 turnos para tentar reviver.
- Rola D20 no início de cada turno. Se tirar 19 ou 20, revive com metade da vida base.
- Se falhar nas 3 tentativas, é eliminado da partida.

6. Objetivo e Condições de Vitória
- Vencer levando as 4 insígnias até o altar no mapa.
- Ou sendo o último jogador vivo.
Duração média da partida: 20 a 50 minutos (pode variar).

7. Estratégia e Interações
- Jogadores podem lutar, evitar combates ou negociar livremente durante seus turnos.
- Ao derrotar outro jogador, recebe suas insígnias e buffs.

8. Recursos Online
Use o QR Code incluso na caixa para acessar o site oficial, onde você encontrará:
- Regras atualizadas
- Rolador de dados digitais (D2 a D20)
- Medidor de Vida
`

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0]
      if (entry.isIntersecting && !this.alreadyTyped) {
        this.alreadyTyped = true
        this.typeText()
      }
    }, { threshold: 0.4 })

    if (this.terminalRef) {
      observer.observe(this.terminalRef.nativeElement)
    }
  }

  typeText(): void {
    const speed = 1
    const interval = setInterval(() => {
      if (this.index < this.fullText.length) {
        this.displayedText += this.fullText.charAt(this.index)
        this.index++
      } else {
        clearInterval(interval)
      }
    }, speed)
  }

  navigate(url: string): void {
    this.router.navigate([url])
  }
}