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

  }
}