import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBeaker,
  heroPresentationChartBar,
  heroChatBubbleBottomCenterText,
  heroClock,
  heroEllipsisVertical,
} from '@ng-icons/heroicons/outline';
import { Project } from '../../interfaces/domain';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent, TruncatePipe],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
  viewProviders: [
    provideIcons({
      heroBeaker,
      heroPresentationChartBar,
      heroChatBubbleBottomCenterText,
      heroClock,
      heroEllipsisVertical,
    }),
  ],
})
export class ProjectCardComponent {
  @Input({ required: true })
  project!: Project;
}
