import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ActiveRoomService {

  constructor() { }

  room: number = 0

  setRoom(room: number) {
    this.room = room
  }

  getRoom(): number {
    return this.room
  }
}