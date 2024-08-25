import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import {
  ProjectCreateRequest,
  ProjectResponse,
  ProjectUpdateRequest,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<ProjectResponse[]> {
    return this.http.get<ProjectResponse[]>(
      `${this.configService.getUrl()}/projects`
    );
  }

  get(uuid: string): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(
      `${this.configService.getUrl()}/projects/${uuid}`
    );
  }

  create(model: ProjectCreateRequest): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>(
      `${this.configService.getUrl()}/projects`,
      model
    );
  }

  update(
    uuid: string,
    model: ProjectUpdateRequest
  ): Observable<ProjectResponse> {
    return this.http.put<ProjectResponse>(
      `${this.configService.getUrl()}/projects/${uuid}`,
      model
    );
  }

  delete(uuid: string): Observable<void> {
    return this.http.delete<void>(
      `${this.configService.getUrl()}/projects/${uuid}`
    );
  }
}
