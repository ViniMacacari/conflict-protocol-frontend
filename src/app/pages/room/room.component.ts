import { Component, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { RequestService } from '../../services/request/request.service'
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar.component"
import { LoaderComponent } from "../../components/loader/loader.component"
import { ButtonComponent } from "../../components/button/button.component"
import { DiceDialogComponent } from "../../components/dice-dialog/dice-dialog.component"
import { HelpDialogComponent } from "../../components/help-dialog/help-dialog.component"
import { LifeDialogComponent } from "../../components/life-dialog/life-dialog.component"

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, LoaderComponent, ButtonComponent, DiceDialogComponent, HelpDialogComponent, LifeDialogComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  loader: boolean = true
  roomCode: string = ''
  currentPlayerName: string = ''
  currentPlayerCharacter: string = ''
  remainingTime: number = 0
  userId: number = 0
  character: string = ''

  actionModal: boolean = false
  action: 0 | 1 = 0

  next: boolean = false

  diceNum: number = 0
  dice: boolean = false

  isPlayer: boolean = false

  @ViewChild(DiceDialogComponent) diceDialog!: DiceDialogComponent
  @ViewChild(HelpDialogComponent) helpDialog!: HelpDialogComponent

  characters = [
    { nome: 'Hacker Ético', slug: 'hacker', id: 1 },
    { nome: 'DBA', slug: 'dba', id: 2 },
    { nome: 'Project Manager', slug: 'project-manager', id: 3 },
    { nome: 'Eng. DevOps', slug: 'backend', id: 4 }
  ]

  private streamSource: EventSource | null = null
  private lastPlayerId: number = 0

  constructor(
    private route: ActivatedRoute,
    private request: RequestService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.route.queryParams.subscribe(params => {
      this.roomCode = params['room'],
        this.userId = params['visitorId']
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.streamSource = this.request.stream(
        '/turn/' + this.roomCode + '?userId=' + this.userId,
        (data) => {
          this.character = data.personagem
          this.currentPlayerName = data.nome_jogador

          const character = this.characters.find(c => c.nome === data.personagem)
          this.currentPlayerCharacter = character?.slug || ''

          const playerChanged = data.id_jogador_atual !== this.lastPlayerId

          if (data.id_jogador_atual !== this.lastPlayerId) {
            this.remainingTime = 0
            this.cdr.detectChanges()
            this.remainingTime = data.tempo_restante
            this.lastPlayerId = data.id_jogador_atual


            if (this.actionModal) {
              this.actionModal = false
              this.cdr.detectChanges()
            }
          }

          this.isPlayer = data.id_jogador_atual == this.userId

          this.cdr.detectChanges()

          if (!this.next && playerChanged) {
            this.next = false
            this.zone.run(() => this.loader = false)
          }
        },
        undefined,
        (err) => {
          console.error('Erro no stream do turno:', err)
        }
      )
    }, 100)
  }

  async nextTurn(): Promise<void> {
    try {
      this.loader = true
      this.next = true

      await this.request.post('/turn/next', {
        roomId: this.roomCode
      })

      this.remainingTime = 0
      this.cdr.detectChanges()
      this.remainingTime = 0
      this.cdr.detectChanges()
    } catch (error: any) {
      console.error('Erro ao avançar turno:', error)
    } finally {
      this.next = false
    }
  }

  ngOnDestroy(): void {
    this.streamSource?.close()
  }

  rollDice(number: number) {
    this.diceNum = number
    this.diceDialog.openDice()
  }
}