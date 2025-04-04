import { Component } from '@angular/core';
import { InputComponent } from "../../components/input/input.component"
import { ButtonComponent } from "../../components/button/button.component"
import { RequestService } from '../../services/request/request.service'

@Component({
  selector: 'app-new-room',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './new-room.component.html',
  styleUrl: './new-room.component.scss'
})
export class NewRoomComponent {

  constructor(
    private request: RequestService
  ) { }

  roomName: string = ''
  userName: string = ''
  time: string = ''

  async newRoom() {
    try {
      const result = await this.request.post('/room/new', {
        name: this.roomName,
        user: this.userName,
        time: this.time
      })
  
      console.log(result)
    } catch (error: any) {
      console.error(error)
    }
  }
}