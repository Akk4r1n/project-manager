import { Injectable } from '@angular/core';

export interface UserSession {
  userEmail: string;
  userName: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserSession(): UserSession | null {
    const userSession = document.cookie
      .split('; ')
      .find((row: string) => row.startsWith('user_session'));

    if (userSession === undefined) return null;

    // @ts-ignore
    let userSessionString = userSession
      .split('=')[1]
      .slice(1, -1) // Remove the outer quotes
      .replace(/\\054/g, ',') // Replace encoded commas with actual commas
      .replace(/\\/g, ''); // Remove backslashes

    let userSessionObject = JSON.parse(userSessionString);

    return {
      userEmail: userSessionObject['user_email'],
      userName: userSessionObject['user_name'],
    };
  }
}
