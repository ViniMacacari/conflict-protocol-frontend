import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-button-home',
  standalone: true,
  imports: [],
  templateUrl: './button-home.component.html',
  styleUrl: './button-home.component.scss'
})
export class ButtonHomeComponent {
  @Input() text: string = ''
  @Input() secondText: string = ''
}