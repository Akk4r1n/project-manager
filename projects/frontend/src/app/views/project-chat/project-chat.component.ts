import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  ActivatedRoute,
} from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroPaperAirplane } from '@ng-icons/heroicons/outline';
import { Observable, tap } from 'rxjs';
import { MessageResponse } from '../../services/api/models';
import { MessagesService } from '../../services/api/messages.service';
import { ChatBubbleComponent } from '../../components/chat-bubble/chat-bubble.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

@Component({
  selector: 'app-project-chat',
  standalone: true,
  templateUrl: './project-chat.component.html',
  styleUrl: './project-chat.component.css',
  viewProviders: [
    provideIcons({
      heroArrowLeft,
      heroPaperAirplane,
    }),
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgIconComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ChatBubbleComponent,
    ToolbarComponent,
  ],
})
export class ProjectChatComponent implements OnInit {
  textContent!: string;
  buttonDisabled: boolean = false;

  messages$!: Observable<MessageResponse[]>;

  projectUuid!: string;

  @ViewChild('chat') chat!: ElementRef<HTMLDivElement>;
  @ViewChild('messageTextArea')
  messageTextArea!: ElementRef<HTMLTextAreaElement>;

  constructor(
    private messagesService: MessagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const projectUuid = this.route.snapshot.paramMap.get('uuid');

    if (projectUuid !== null) {
      this.projectUuid = projectUuid;
      this.messages$ = this.messagesService.getAll(this.projectUuid).pipe(
        tap((_) => {
          setTimeout(() => {
            this.chat.nativeElement.scrollTop =
              this.chat.nativeElement.scrollHeight;
          }, 100);
        })
      );
    }
  }

  onSendClicked() {
    this.messagesService
      .create(this.projectUuid, {
        content: this.textContent,
      })
      .subscribe((res) => {
        // TODO: dont fetch messages every time
        this.messages$ = this.messagesService.getAll(this.projectUuid).pipe(
          tap((_) => {
            setTimeout(() => {
              this.chat.nativeElement.scrollTop =
                this.chat.nativeElement.scrollHeight;
            }, 100);
          })
        );
      });
    this.textContent = '';
    this.messageTextArea.nativeElement.style.height = '3.5rem';
  }

  getButtonDisabled(): boolean {
    if (this.buttonDisabled) return true;

    return this.textContent === '' || this.textContent === undefined;
  }

  onInput() {
    const textarea = document.getElementById('messageTextArea');

    if (textarea === null) return;
    textarea.scrollTop = textarea.scrollHeight;
  }
}
