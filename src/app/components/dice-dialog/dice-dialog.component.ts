import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from "../button/button.component"

@Component({
  selector: 'app-dice-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dice-dialog.component.html',
  styleUrl: './dice-dialog.component.scss'
})
export class DiceDialogComponent {
  @Input() text: string = ''
  @Input() number: number = 0
  @Input() open: boolean = false
  @Output() closeDialog = new EventEmitter<void>()

  domElement: boolean = false
  animation: boolean = false
  result: number = 0

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open']) {
      if (this.open) {
        this.domElement = true

        setTimeout(() => {
          requestAnimationFrame(() => {
            this.animation = true
            this.rollDice()
          })
        }, 0)
      } else {
        this.animation = false

        setTimeout(() => {
          this.domElement = false
        }, 200)
      }
    }
  }

  openDice() {
    this.domElement = true

    setTimeout(() => {
      requestAnimationFrame(() => {
        this.animation = true
        this.rollDice()
      })
    }, 0)
  }

  close() {
    this.animation = false

    setTimeout(() => {
      this.domElement = false
    }, 200)
  }

  private rollDice() {
    if (this.number > 0) {
      this.result = Math.floor(Math.random() * this.number) + 1
    }
  }
}