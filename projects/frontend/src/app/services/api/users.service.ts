import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { UserLoginRequest, UserRegisterRequest, UserResponse } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  login(model: UserLoginRequest): Observable<void> {
    return this.http.post<void>(
      `${this.configService.getUrl()}/users/login`,
      model
    );
  }

  register(model: UserRegisterRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${this.configService.getUrl()}/users/register`,
      model
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.configService.getUrl()}/users/logout`,
      {}
    );
  }
}
