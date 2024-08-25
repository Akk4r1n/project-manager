import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import { TaskResponse, TaskCreateRequest, TaskUpdateRequest } from './models';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAll(projectUuid: string): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(
      `${this.configService.getUrl()}/projects/${projectUuid}/tasks`
    );
  }

  get(projectUuid: string, taskUuid: string): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(
      `${this.configService.getUrl()}/projects/${projectUuid}/tasks/${taskUuid}`
    );
  }

  create(
    projectUuid: string,
    model: TaskCreateRequest
  ): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(
      `${this.configService.getUrl()}/projects/${projectUuid}/tasks`,
      model
    );
  }

  update(
    projectUuid: string,
    taskUuid: string,
    model: TaskUpdateRequest
  ): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(
      `${this.configService.getUrl()}/projects/${projectUuid}/tasks/${taskUuid}`,
      model
    );
  }

  delete(projectUuid: string, taskUuid: string): Observable<void> {
    return this.http.delete<void>(
      `${this.configService.getUrl()}/projects/${projectUuid}/tasks/${taskUuid}`
    );
  }
}
