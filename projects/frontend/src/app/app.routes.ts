import { Routes } from '@angular/router';
import { ProjectsComponent } from './views/projects/projects.component';
import { ProjectDetailComponent } from './views/project-detail/project-detail.component';
import { ProjectMetaComponent } from './views/project-meta/project-meta.component';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  { path: 'projects/:uuid/detail', component: ProjectDetailComponent },
  { path: 'projects/:uuid/meta', component: ProjectMetaComponent },
  {
    path: 'projects/:uuid',
    redirectTo: 'projects/:uuid/detail',
    pathMatch: 'full',
  },
];
