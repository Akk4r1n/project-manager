import { Routes } from '@angular/router';
import { ProjectsComponent } from './views/projects/projects.component';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
];
