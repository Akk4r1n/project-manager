import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import { MessageCreateRequest, MessageResponse } from './models';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(projectUuid: string): Observable<MessageResponse[]> {
    return this.http.get<MessageResponse[]>(
      `${this.configService.getUrl()}/projects/${projectUuid}/chat/messages`
    );
  }

  create(
    projectUuid: string,
    model: MessageCreateRequest
  ): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.configService.getUrl()}/projects/${projectUuid}/chat/messages`,
      model
    );
  }
}
