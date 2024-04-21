import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { Project } from '../../interfaces/domain';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
  viewProviders: [
    provideIcons({
      heroArrowLeft,
    }),
  ],
})
export class ProjectDetailComponent {
  public _uuid!: string;

  public project: Project = {
    uuid: '34ed8ba3-f7b4-4565-a5a9-b5605b0d8df4',
    title: 'E-Commerce Platform Development',
    description:
      'Development of a scalable e-commerce platform with advanced search and recommendation features.',
    createdAt: new Date('2023-03-10'),
    ownerEmail: 'project_owner1@example.com',
    chatUuid: 'chat1',
  };

  @Input()
  set uuid(projectUuid: string) {
    console.log('setting uuid of project detail...');
    this._uuid = projectUuid;
  }
}
