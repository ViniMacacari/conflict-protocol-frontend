import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() durationInSeconds: number = 5

  progress: number = 0
  private interval: any

  ngOnInit(): void {
    const totalSteps = this.durationInSeconds * 10
    let currentStep = 0

    this.interval = setInterval(() => {
      currentStep++
      this.progress = Math.min((currentStep / totalSteps) * 100, 100)


      if (currentStep >= totalSteps) {
        clearInterval(this.interval)
      }
    }, 100)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
}
