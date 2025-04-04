import { Component } from '@angular/core';
import { InputComponent } from "../../components/input/input.component"
import { ButtonComponent } from "../../components/button/button.component"

@Component({
  selector: 'app-new-room',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './new-room.component.html',
  styleUrl: './new-room.component.scss'
})
export class NewRoomComponent {

}
