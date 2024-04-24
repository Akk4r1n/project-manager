import { Routes } from '@angular/router';
import { ProjectsComponent } from './views/projects/projects.component';
import { ProjectDetailComponent } from './views/project-detail/project-detail.component';
import { ProjectChatComponent } from './views/project-chat/project-chat.component';
import { AuthComponent } from './views/auth/auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  { path: 'projects/:uuid/detail', component: ProjectDetailComponent },
  {
    path: 'projects/:uuid',
    redirectTo: 'projects/:uuid/detail',
    pathMatch: 'full',
  },
  {
    path: 'projects/:uuid/chat',
    component: ProjectChatComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent,
      },
      {
        path: 'register',
        component: RegisterFormComponent,
      },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },
];
