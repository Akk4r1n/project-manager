import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface Config {
  backend: {
    protocol: 'http' | 'https';
    host: string;
    port: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config!: Config;
  private configUrl = './assets/config.json';

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<Config> {
    return this.http
      .get<Config>(this.configUrl)
      .pipe(tap((config) => (this.config = config)));
  }

  getUrl(): string {
    return `${this.config.backend.protocol}://${this.config.backend.host}:${this.config.backend.port}`;
  }
}
