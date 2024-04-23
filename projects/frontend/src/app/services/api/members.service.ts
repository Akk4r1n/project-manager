import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import {
  ProjectMemberResponse,
  ProjectMemberCreateRequest,
  ProjectMemberDeleteRequest,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(projectUuid: string): Observable<ProjectMemberResponse[]> {
    return this.http.get<ProjectMemberResponse[]>(
      `${this.configService.getUrl()}/projects/${projectUuid}/members`
    );
  }

  create(
    projectUuid: string,
    model: ProjectMemberCreateRequest
  ): Observable<void> {
    return this.http.post<void>(
      `${this.configService.getUrl()}/projects/${projectUuid}/members`,
      model
    );
  }

  delete(
    projectUuid: string,
    model: ProjectMemberDeleteRequest
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.configService.getUrl()}/projects/${projectUuid}/members`,
      {
        body: model,
      }
    );
  }
}
