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
  @Input() label: string = ''
  @Input() placeholder: string = 'Seu texto...'
  @Input() icon: string = 'fa-magnifying-glass'
  @Input() model: string = ''
  @Input() type: string = 'text'
  @Output() modelChange = new EventEmitter<string>()

  onInputChange(value: string): void {
    const lowercased = value.toLowerCase()
    this.model = lowercased
    this.modelChange.emit(lowercased)
  }
}