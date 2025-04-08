import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from "../button/button.component"

@Component({
  selector: 'app-help-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './help-dialog.component.html',
  styleUrl: './help-dialog.component.scss'
})
export class HelpDialogComponent {
  @Input() text: string = ''
  @Input() number: number = 0
  @Input() open: boolean = false
  @Output() closeDialog = new EventEmitter<void>()

  domElement: boolean = false
  animation: boolean = false
  result: number = 0

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

9. Criado por: Hugo, Leonardo, Vidal e Vinícius
  `

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open']) {
      if (this.open) {
        this.domElement = true

        setTimeout(() => {
          requestAnimationFrame(() => {
            this.animation = true
            this.rollDice()
          })
        }, 0)
      } else {
        this.animation = false

        setTimeout(() => {
          this.domElement = false
        }, 200)
      }
    }
  }

  openHelp() {
    this.domElement = true

    setTimeout(() => {
      requestAnimationFrame(() => {
        this.animation = true
        this.rollDice()
      })
    }, 0)
  }

  close() {
    this.animation = false

    setTimeout(() => {
      this.domElement = false
    }, 200)
  }

  private rollDice() {
    if (this.number > 0) {
      this.result = Math.floor(Math.random() * this.number) + 1
    }
  }
}