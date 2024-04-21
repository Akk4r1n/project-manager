import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';

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

  @Input()
  set uuid(projectUuid: string) {
    console.log('setting uuid of project detail...');
    this._uuid = projectUuid;
  }
}
