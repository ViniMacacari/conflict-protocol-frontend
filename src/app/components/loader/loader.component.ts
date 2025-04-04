import { Component, Input, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() text: string = ''
  @Input() open: boolean = false

  domElement: boolean = false
  animation: boolean = false

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open']) {
      if (this.open) {
        this.domElement = true

        setTimeout(() => {
          requestAnimationFrame(() => {
            this.animation = true
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
}