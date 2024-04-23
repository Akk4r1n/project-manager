import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MessageResponse, UserResponse } from '../../services/api/models';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.css',
})
export class ChatBubbleComponent {
  @Input({ required: true })
  message!: MessageResponse;
}
