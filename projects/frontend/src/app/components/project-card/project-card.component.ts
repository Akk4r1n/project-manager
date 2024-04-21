import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBeaker,
  heroPresentationChartBar,
  heroChatBubbleBottomCenterText,
  heroClock,
  heroEllipsisVertical,
  heroPencilSquare,
} from '@ng-icons/heroicons/outline';
import { Project } from '../../interfaces/domain';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    TruncatePipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
  viewProviders: [
    provideIcons({
      heroBeaker,
      heroPresentationChartBar,
      heroChatBubbleBottomCenterText,
      heroClock,
      heroEllipsisVertical,
      heroPencilSquare,
    }),
  ],
})
export class ProjectCardComponent {
  @Input({ required: true })
  project!: Project;
}
