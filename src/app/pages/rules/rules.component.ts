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
# Regras do Conflict Protocol

Este jogo pode ser jogado em até 4 pessoas.

1. Um personagem será sorteado para cada jogador via dado d-4 ou pelo site, os personagens são:
- Hacker Ético
- DBA
- Project Manager
- Backend

2. O objetivo é conquistar 4 insígnias escondidas pelo tabuleiro.
- A insignía não gera vantagem competitiva
- Quando o jogador é derrotado o oponente obtem as insígnias

3. As batalhas ocorrem por turnos, usando habilidades exclusivas de cada personagem.
- Enquanto dois jogadores batalham os outros podem, no mesmo ciclo de jogo, andar pelo mapa
- Um jogador pode abandonar a batalha 

4. É permitido formar alianças temporárias, mas trair é parte do jogo.

5. O primeiro jogador a coletar todas as insígnias e vencer o último desafio finaliza o jogo.

6. A estratégia, lógica e conhecimento de programação são essenciais para vencer.
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
    const speed = 15
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