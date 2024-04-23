import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { lastValueFrom } from 'rxjs';
import { cookieInterceptor } from './interceptors/cookie.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([cookieInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () =>
        lastValueFrom(configService.loadConfig()),
      deps: [ConfigService],
      multi: true,
    },
  ],
};
