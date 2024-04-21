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
import { Project, Task } from '../../interfaces/domain';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    TruncatePipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
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
export class TaskCardComponent {
  @Input({ required: true })
  task!: Task;
}
