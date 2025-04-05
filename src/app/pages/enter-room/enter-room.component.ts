import { Component } from '@angular/core'
import { Router } from '@angular/router'
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
    private request: RequestService,
    private room: ActiveRoomService,
    private router: Router
  ) { }

  roomCode: string = ''
  userName: string = ''

  loader: boolean = false

  async enterRoom(): Promise<void> {
    this.loader = true

    try {
      await this.request.post('/room/enter', {
        roomCode: this.roomCode,
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
      console.error(error)
    } finally {
      this.loader = false
    }
  }
}