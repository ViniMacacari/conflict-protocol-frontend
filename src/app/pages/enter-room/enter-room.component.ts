import { Component, ChangeDetectorRef } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { InputComponent } from "../../components/input/input.component"
import { ButtonComponent } from "../../components/button/button.component"
import { LoaderComponent } from "../../components/loader/loader.component"
import { RequestService } from '../../services/request/request.service'
import { ActiveRoomService } from '../../services/room/active-room.service'

@Component({
  selector: 'app-enter-room',
  standalone: true,
  imports: [InputComponent, ButtonComponent, LoaderComponent],
  templateUrl: './enter-room.component.html',
  styleUrl: './enter-room.component.scss'
})
export class EnterRoomComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private request: RequestService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe(params => {
      this.roomCode = params['room'],
        this.userId = params['visitorId'],
        this.userName = params['visitorName']
    })
  }

  roomCode: string = ''
  userName: string = ''
  userId: number = 0

  loader: boolean = false

  async enterRoom(): Promise<void> {
    this.loader = true

    try {
      await this.request.post('/room/enter', {
        roomCode: Number(this.roomCode),
        user: this.userName
      })

      const userId = await this.request.post('/users/visitor-management', {
        username: this.userName
      })

      this.router.navigate(['/sala-espera'], {
        queryParams: {
          room: this.roomCode,
          visitorId: userId.userId,
          visitorName: this.userName
        }
      })
    } catch (error: any) {
      alert(error.erro)

      console.error(error)
    } finally {
      this.loader = false
    }
  }

  navigate(url: string): void {
    this.router.navigate([url])
  }
}