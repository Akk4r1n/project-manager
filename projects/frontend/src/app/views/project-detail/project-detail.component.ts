import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  ActivatedRoute,
} from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeft,
  heroChatBubbleBottomCenterText,
  heroPencilSquare,
} from '@ng-icons/heroicons/outline';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskFormDialogComponent } from '../../components/task-form-dialog/task-form-dialog.component';
import {
  ProjectResponse,
  TaskResponse,
  UserResponse,
} from '../../services/api/models';
import { ProjectsService } from '../../services/api/projects.service';
import { Observable, forkJoin } from 'rxjs';
import { TasksService } from '../../services/api/tasks.service';
import { ProjectMemberFormDialogComponent } from '../../components/project-member-form-dialog/project-member-form-dialog.component';
import { UsersService } from '../../services/api/users.service';
import { MembersService } from '../../services/api/members.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
  viewProviders: [
    provideIcons({
      heroArrowLeft,
      heroPencilSquare,
      heroChatBubbleBottomCenterText,
    }),
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    NgIconComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TaskCardComponent,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    TaskFormDialogComponent,
    ProjectMemberFormDialogComponent,
  ],
})
export class ProjectDetailComponent implements OnInit {
  public selectedCountries: any[] = [];

  public countries: any[] = [
    {
      name: 'Germany',
      code: 'GER',
    },
    {
      name: 'America',
      code: 'AME',
    },
  ];

  public date!: Date;

  public _uuid!: string;

  @ViewChild('taskFormDialog') taskFormDialog!: TaskFormDialogComponent;
  @ViewChild('projectMemberFormDialog')
  projectMemberFormDialog!: ProjectMemberFormDialogComponent;

  selectedTask?: TaskResponse;

  public project!: ProjectResponse;

  public tasks$!: Observable<TaskResponse[]>;

  public allUsers$!: Observable<UserResponse[]>;

  public taskControls = {
    uuid: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    projectUuid: ['', Validators.required],
    planned_minutes: ['', []],
    actual_minutes: ['', []],
    created_at: ['', [Validators.required]],
  };

  @Input()
  set uuid(project_uuid: string) {
    this._uuid = project_uuid;
  }

  submitType: 'create' | 'update' = 'create';

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private tasksService: TasksService,
    private usersService: UsersService,
    private membersService: MembersService
  ) {}

  ngOnInit(): void {
    const projectUuid = this.route.snapshot.paramMap.get('uuid');

    if (projectUuid !== null) {
      this.projectsService.get(projectUuid).subscribe((res) => {
        this.project = res;

        this.tasks$ = this.tasksService.getAll(this.project.uuid);
      });
    }

    this.allUsers$ = this.usersService.getAll();
  }

  onProjectMemberSubmit(members: UserResponse[]) {
    const membersToAdd = members
      .map((m) => m.email)
      .filter(
        (item) => !this.project?.member_users.map((p) => p.email).includes(item)
      );

    const membersToDelete = this.project?.member_users
      .map((p) => p.email)
      .filter((item) => !members.map((p) => p.email).includes(item));

    forkJoin([
      this.membersService.delete(this.project?.uuid, {
        user_emails: membersToDelete,
      }),
      this.membersService.create(this.project?.uuid, {
        user_emails: membersToAdd,
      }),
    ]).subscribe((res) => {
      // TODO: dont make a request to get the entire project again?
      this.projectsService.get(this._uuid).subscribe((res) => {
        this.project = res;

        this.tasks$ = this.tasksService.getAll(this.project.uuid);
      });
    });
  }

  onSubmit(entity: TaskResponse) {
    if (this.submitType === 'create') {
      this.tasksService
        .create(this.project.uuid, {
          title: entity.title,
          description: entity.description,
          planned_minutes: entity.planned_minutes,
        })
        .subscribe((res) => {
          // TODO: use response instead of making another request
          this.tasks$ = this.tasksService.getAll(this.project.uuid);
        });
    } else if (this.submitType === 'update') {
      this.tasksService
        .update(this.project.uuid, entity.uuid, {
          title: entity.title,
          description: entity.description,
          actual_minutes: entity.actual_minutes,
          planned_minutes: entity.planned_minutes,
        })
        .subscribe((res) => {
          // TODO: use response instead of making another request
          this.tasks$ = this.tasksService.getAll(this.project.uuid);
        });
    }
  }

  onEditMemberClick() {
    this.projectMemberFormDialog.openDialog(this.project);
  }

  onEditClick(task: TaskResponse) {
    this.submitType = 'update';
    this.selectedTask = task;
    this.taskFormDialog.openDialog(task);
  }

  onCreateClick() {
    this.submitType = 'create';

    this.selectedTask = {
      uuid: '<Will be set on the backend>',
      created_at: new Date(Date.now()),
      description: '',
      title: '',
      project_uuid: this.project?.uuid,
    };

    this.taskFormDialog.openDialog(this.selectedTask);
  }
}
