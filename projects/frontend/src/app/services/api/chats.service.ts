import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import { ChatResponse } from './models';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  get(projectUuid: string): Observable<ChatResponse> {
    return this.http.get<ChatResponse>(
      `${this.configService.getUrl()}/projects/${projectUuid}/chat/`
    );
  }
}
