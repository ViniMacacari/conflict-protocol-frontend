import { Component } from '@angular/core'
import { ButtonHomeComponent } from "../../components/button-home/button-home.component"
import { Router } from '@angular/router'
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar.component"

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonHomeComponent, ProgressBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private router: Router
  ) { }

  navigate(router: string): void {
    this.router.navigate([router])
  }
}