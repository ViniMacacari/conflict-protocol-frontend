import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = 'http://194.163.182.80:4000'

  constructor(private http: HttpClient) { }

  async get(route: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    try {
      return await lastValueFrom(
        this.http.get<any>(`${this.baseUrl}${route}`)
      )
    } catch (error: any) {
      throw this.handlePromiseError(error)
    }
  }

  async post(route: string, data: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    try {
      return await lastValueFrom(
        this.http.post<any>(`${this.baseUrl}${route}`, data)
      )
    } catch (error: any) {
      throw this.handlePromiseError(error)
    }
  }

  stream(
    route: string,
    onData: (data: any) => void,
    onClose?: () => void,
    onError?: (errorMessage: string) => void
  ): EventSource {
    const source = new EventSource(`${this.baseUrl}${route}`)

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onData(data)
      } catch (e) {
        console.error('Erro ao processar dados do stream:', e)
      }
    }

    if (onClose) {
      source.addEventListener('close', () => {
        source.close()
        onClose()
      })
    }

    if (onError) {
      source.addEventListener('error', (event: MessageEvent) => {
        source.close()
        onError(event.data || 'Erro desconhecido')
      })
    }

    source.onerror = (error) => {
      console.error('Erro de conexão com o stream:', error)
      source.close()
      if (onError) onError('Erro na conexão com o servidor.')
    }

    return source
  }

  private handlePromiseError(error: HttpErrorResponse): any {
    const errorMessage = this.extractErrorMessage(error)
    console.error('Erro capturado no serviço (Promise):', errorMessage)
    return errorMessage
  }

  private extractErrorMessage(error: HttpErrorResponse): { erro: string; status: number } {
    let errorMessage: { erro: string; status: number } = { erro: 'Erro desconhecido', status: error.status || 0 }

    if (error.error) {
      if (typeof error.error === 'object') {
        errorMessage = {
          erro: error.error.erro || JSON.stringify(error.error),
          status: error.status
        }
      } else if (typeof error.error === 'string') {
        try {
          const parsedError = JSON.parse(error.error)
          errorMessage = {
            erro: parsedError.erro || parsedError,
            status: error.status
          }
        } catch {
          errorMessage = { erro: error.error, status: error.status }
        }
      }
    } else if (error.status) {
      errorMessage = { erro: `Erro ${error.status}: ${error.statusText}`, status: error.status }
    }

    return errorMessage
  }
}
