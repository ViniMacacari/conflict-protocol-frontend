import { Component } from '@angular/core'
import { ButtonHomeComponent } from "../../components/button-home/button-home.component"

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
