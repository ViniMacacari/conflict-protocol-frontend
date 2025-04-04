import { Component } from '@angular/core'
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

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.roomCode = params['room']
    })
  }
}