import { Routes } from '@angular/router';
import { ProjectsComponent } from './views/projects/projects.component';
import { ProjectDetailComponent } from './views/project-detail/project-detail.component';
import { ProjectChatComponent } from './views/project-chat/project-chat.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
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
    path: 'multi-select',
    component: MultiSelectComponent,
  },
];
