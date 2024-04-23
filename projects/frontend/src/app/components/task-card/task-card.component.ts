import { CommonModule } from '@angular/common';
import { Component, Input, Output, output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBeaker,
  heroPresentationChartBar,
  heroChatBubbleBottomCenterText,
  heroClock,
  heroEllipsisVertical,
  heroPencilSquare,
} from '@ng-icons/heroicons/outline';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { EventEmitter } from 'stream';
import { TaskResponse } from '../../services/api/models';

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
      heroPencilSquare,
    }),
  ],
})
export class TaskCardComponent {
  @Input({ required: true })
  task!: TaskResponse;

  editClick = output<void>();

  onEditClick() {
    this.editClick.emit();
  }
}
