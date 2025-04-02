import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { RulesComponent } from './pages/rules/rules.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'regras', component: RulesComponent }
]