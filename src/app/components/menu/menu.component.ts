import { Component } from '@angular/core';
import { ButtonHomeComponent } from "../button-home/button-home.component"

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ButtonHomeComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

}
