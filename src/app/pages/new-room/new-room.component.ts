import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { InputComponent } from "../../components/input/input.component"
import { ButtonComponent } from "../../components/button/button.component"
import { LoaderComponent } from "../../components/loader/loader.component"
import { RequestService } from '../../services/request/request.service'
import { ActiveRoomService } from '../../services/room/active-room.service'

@Component({
  selector: 'app-new-room',
  standalone: true,
  imports: [InputComponent, ButtonComponent, LoaderComponent],
  templateUrl: './new-room.component.html',
  styleUrl: './new-room.component.scss'
})
export class NewRoomComponent {

  constructor(
    private request: RequestService,
    private room: ActiveRoomService,
    private router: Router
  ) { }

  roomName: string = ''
  userName: string = ''
  time: string = ''

  loader: boolean = false

  async newRoom() {
    try {
      this.loader = true

      const result = await this.request.post('/room/new', {
        name: this.roomName,
        user: this.userName,
        time: this.time
      })

      this.room.setRoom(result.roomCode)

      this.router.navigate(['/sala-espera'], {
        queryParams: {
          room: result.roomCode,
          user: this.userName
        }
      })
    } catch (error: any) {
      alert(error.erro)
      console.error(error)
    } finally {
      this.loader = false
    }
  }
}