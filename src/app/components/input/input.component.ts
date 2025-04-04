import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() message: string = ''
  @Input() placeholder: string = 'Seu texto...'
  @Input() icon: string = 'fa-magnifying-glass'
  @Input() model: string = ''
  @Output() modelChange = new EventEmitter<string>()
}