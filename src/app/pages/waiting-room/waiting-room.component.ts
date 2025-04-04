import { Component, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router'
import { LoaderComponent } from "../../components/loader/loader.component"
import { RequestService } from '../../services/request/request.service'
import { ActiveRoomService } from '../../services/room/active-room.service'

@Component({
  selector: 'app-waiting-room',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './waiting-room.component.html',
  styleUrl: './waiting-room.component.scss'
})
export class WaitingRoomComponent {
  loader: boolean = false
  roomCode: string = ''
  playerName: string = ''

  seconds: number = 0

  players: any[] = []
  characters = [
    { nome: 'Hacker Ético', slug: 'hacker', id: 1 },
    { nome: 'DBA', slug: 'dba', id: 2 },
    { nome: 'Project Manager', slug: 'project-manager', id: 3 },
    { nome: 'Eng. DevOps', slug: 'backend', id: 4 }
  ]

  private streamSource: EventSource | null = null

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private request: RequestService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe(params => {
      this.roomCode = params['room']
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.waitPlayers()
    })

    setInterval(() => {
      this.seconds++
    }, 1000)
  }

  getPlayerNameByCharacter(characterName: string): string {
    const found = this.players.find(p => p.personagem === characterName)

    return found?.nome_usuario || 'Aguardando...'
  }

  async waitPlayers(): Promise<void> {
    this.loader = true

    this.streamSource = this.request.stream(
      '/users/rooms/' + this.roomCode,
      (data) => {
        this.players = data
        this.cdr.detectChanges()

        if (this.players.length >= 4) {
          this.streamSource?.close()
          this.loader = false
          this.router.navigate(['sala', this.roomCode])
        }
      }
    )
  }
}