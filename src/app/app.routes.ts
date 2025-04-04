import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { RulesComponent } from './pages/rules/rules.component'
import { NewRoomComponent } from './pages/new-room/new-room.component'

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { animation: 'Home' } },
    { path: 'regras', component: RulesComponent, data: { animation: 'Rules' } },
    { path: 'nova-sala', component: NewRoomComponent, data: { animation: 'NewRoom' } },
]