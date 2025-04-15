import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '../button/button.component'
import { RequestService } from '../../services/request/request.service'
import { ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'app-life-dialog',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './life-dialog.component.html',
  styleUrl: './life-dialog.component.scss'
})
export class LifeDialogComponent {
  @Input() open: boolean = false
  @Input() roomCode: any = 0
  @Input() action: 0 | 1 = 0

  @Output() closeDialog = new EventEmitter<void>()

  domElement: boolean = false
  animation: boolean = false
  value: number = 0
  selectedId: number | null = null
  players: { id: number, nome: string, vida: number }[] = []

  constructor(
    private request: RequestService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open'] && this.open) {
      this.value = 0
      this.selectedId = null
      this.domElement = true
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.animation = true
          this.fetchPlayers()
        })
      }, 0)
    }

    if (changes['open'] && !this.open) {
      this.animation = false
      setTimeout(() => (this.domElement = false), 200)
    }
  }

  async fetchPlayers(): Promise<void> {
    try {
      const response = await this.request.get(`/room/life-status/${this.roomCode}`)
      this.players = response.map((p: any) => ({
        id: Number(p.id_usuario),
        nome: p.nome,
        vida: p.vida
      }))
      this.cdr.detectChanges()
    } catch (err) {
      alert('Erro ao buscar jogadores.')
      console.error('Erro ao buscar jogadores:', err)
    }
  }

  increase() {
    this.value++
  }

  decrease() {
    if (this.value > 0) this.value--
  }

  selectPlayer(id: number | string) {
    this.selectedId = Number(id)
    this.cdr.detectChanges()
  }

  async confirm() {
    if (!this.selectedId || this.value <= 0) return

    const endpoint = this.action === 0 ? '/room/attack' : '/room/heal'
    const payload =
      this.action === 0
        ? { roomCode: this.roomCode, targetId: this.selectedId, damage: this.value }
        : { roomCode: this.roomCode, targetId: this.selectedId, amount: this.value }

    try {
      await this.request.post(endpoint, payload)
    } catch (err) {
      alert('Erro ao executar ação.')
      console.error('Erro ao executar ação:', err)
    }

    this.close()
  }

  close() {
    this.animation = false
    setTimeout(() => {
      this.domElement = false
      this.closeDialog.emit()
    }, 200)
  }

  trackById(index: number, item: any) {
    return item.id
  }
}