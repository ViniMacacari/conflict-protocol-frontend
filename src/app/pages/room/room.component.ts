import { Component, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { RequestService } from '../../services/request/request.service'

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  loader: boolean = false
  roomCode: string = ''
  currentPlayerName: string = ''
  currentPlayerCharacter: string = ''
  remainingTime: number = 0
  userId: number = 0

  characters = [
    { nome: 'Hacker Ético', slug: 'hacker', id: 1 },
    { nome: 'DBA', slug: 'dba', id: 2 },
    { nome: 'Project Manager', slug: 'project-manager', id: 3 },
    { nome: 'Eng. DevOps', slug: 'backend', id: 4 }
  ]

  private streamSource: EventSource | null = null

  constructor(
    private route: ActivatedRoute,
    private request: RequestService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe(params => {
      this.roomCode = params['room'],
      this.userId = params['visitorId']
    })
  }

  ngAfterViewInit(): void {
    this.streamSource = this.request.stream(
      '/turn/' + this.roomCode + '?userId=' + this.userId,
      (data) => {
        this.currentPlayerName = data.nome_jogador
        this.remainingTime = data.tempo_restante

        const character = this.characters.find(c => c.nome === data.personagem)
        this.currentPlayerCharacter = character?.slug || ''

        this.cdr.detectChanges()
      },
      undefined,
      (err) => {
        console.error('Erro no stream do turno:', err)
      }
    )
  }

  ngOnDestroy(): void {
    this.streamSource?.close()
  }
}