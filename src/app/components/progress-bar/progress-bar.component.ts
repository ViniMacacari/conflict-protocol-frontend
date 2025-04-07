import { Component, Input, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'] // Note: use "styleUrls" para array de estilos
})
export class ProgressBarComponent implements OnDestroy {
  @Input() set durationInSeconds(value: number) {
    this.startProgress(value);
  }

  progress = 0;
  private frame: number | null = null;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) { }

  startProgress(duration: number): void {
    if (!duration || duration <= 0) return;

    // Cancela animações anteriores e reseta a barra
    cancelAnimationFrame(this.frame!);
    this.progress = 0;

    const start = performance.now();
    const durationMs = duration * 1000;

    // Executa fora da zona para performance
    this.ngZone.runOutsideAngular(() => {
      const animate = (now: number) => {
        const elapsed = now - start;
        this.progress = Math.min((elapsed / durationMs) * 100, 100);

        // Reentra na zona para acionar a detecção de mudanças
        this.ngZone.run(() => {
          this.cdr.detectChanges();
        });

        if (this.progress < 100) {
          this.frame = requestAnimationFrame(animate);
        }
      };

      this.frame = requestAnimationFrame(animate);
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame!);
  }
}