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
import { ProjectResponse, TaskResponse } from '../../services/api/models';
import { ProjectsService } from '../../services/api/projects.service';
import { Observable } from 'rxjs';
import { TasksService } from '../../services/api/tasks.service';

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
  ],
})
export class ProjectDetailComponent implements OnInit {
  public _uuid!: string;

  @ViewChild('taskFormDialog') taskFormDialog!: TaskFormDialogComponent;

  selectedTask?: TaskResponse;

  public project: ProjectResponse | null = null;

  public tasks$!: Observable<TaskResponse[]>;

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
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    const projectUuid = this.route.snapshot.paramMap.get('uuid');

    if (projectUuid !== null) {
      this.projectsService.get(projectUuid).subscribe((res) => {
        this.project = res;

        this.tasks$ = this.tasksService.getAll(this.project.uuid);
      });
    }
  }

  onSubmit(entity: TaskResponse) {
    console.log('Submitting task:', entity);

    // TODO: fix typing
    if (this.project === null) return;

    if (this.submitType === 'create') {
      this.tasksService
        .create(this.project.uuid, {
          title: entity.title,
          description: entity.description,
          planned_minutes: entity.planned_minutes,
        })
        .subscribe((res) => {
          if (this.project === null) return;

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
          if (this.project === null) return;

          // TODO: use response instead of making another request
          this.tasks$ = this.tasksService.getAll(this.project.uuid);
        });
    }
  }

  onEditClick(task: TaskResponse) {
    this.submitType = 'update';
    this.selectedTask = task;
    this.taskFormDialog.openDialog(task);
  }

  onCreateClick() {
    this.submitType = 'create';

    // TODO: use auth guards and other validations to ensure that the project is always set
    if (this.project === null) {
      return;
    }

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
