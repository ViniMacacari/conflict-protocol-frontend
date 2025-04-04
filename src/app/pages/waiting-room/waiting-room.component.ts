import { Component, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router'
import { LoaderComponent } from "../../components/loader/loader.component"
import { RequestService } from '../../services/request/request.service'
import { ButtonComponent } from "../../components/button/button.component"

@Component({
  selector: 'app-waiting-room',
  standalone: true,
  imports: [CommonModule, LoaderComponent, ButtonComponent],
  templateUrl: './waiting-room.component.html',
  styleUrl: './waiting-room.component.scss'
})
export class WaitingRoomComponent {
  loader: boolean = false
  roomCode: string = ''
  playerName: string = ''

  seconds: number = 0

  userId: number = 0
  username: string = ''

  roomCreator: boolean = false

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
      this.roomCode = params['room'],
        this.userId = params['visitorId'],
        this.username = params['visitorName']
    })
  }

  async ngAfterViewInit(): Promise<void> {
    setTimeout(async () => {
      this.loader = true
      await this.validateUser()
      await this.validateRoomCreator()
      this.waitPlayers()
      this.loader = false
    }, 600)

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

    try {
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

          if (this.players.length == 0) {
            this.router.navigate([''])
          }
        }, () => { }, (errorMessage: string) => {
          this.streamSource?.close()
          console.error('Erro no stream:', errorMessage)
          this.router.navigate([''])
        }
      )
    } catch (error: any) {
      this.router.navigate([''])
      console.error(error)
    }
  }

  async validateUser(): Promise<void> {
    try {
      const user = await this.request.post('/users/visitor-validator', {
        username: this.username,
        id: this.userId
      })

      if (!user.userId) {
        this.router.navigate([''])
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  async closeRoom(): Promise<void> {
    try {
      this.loader = true
      await this.request.post('/room/close', {
        roomCode: this.roomCode,
        userId: this.userId
      })
    } catch (error: any) {
      console.error(error)
    } finally {
      this.loader = false
      this.streamSource?.close()
      this.router.navigate([''])
    }
  }

  async validateRoomCreator(): Promise<void> {
    try {
      const result = await this.request.post('/room/validate', {
        roomCode: this.roomCode,
        userId: this.userId
      })

      if (result.result === true) {
        this.roomCreator = true
      } else {
        this.roomCreator = false
      }
    } catch (error: any) {
      console.error(error)
    }
  }
}