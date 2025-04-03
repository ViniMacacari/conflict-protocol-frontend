import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MenuComponent } from "./components/menu/menu.component"
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
        group([
          query(':leave', [
            animate('400ms ease', style({ opacity: 0, transform: 'translateX(-20px)' }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'translateX(20px)' }),
            animate('400ms ease', style({ opacity: 1, transform: 'translateX(0)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'conflict-protocol-frontend'

  prepareRoute(outlet: any) {
    return outlet?.activatedRouteData?.['animation']
  }
}
