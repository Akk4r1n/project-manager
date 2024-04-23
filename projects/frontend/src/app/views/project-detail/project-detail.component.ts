import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroPencilSquare } from '@ng-icons/heroicons/outline';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskFormDialogComponent } from '../../components/task-form-dialog/task-form-dialog.component';
import { ProjectResponse, TaskResponse } from '../../services/api/models';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
  viewProviders: [
    provideIcons({
      heroArrowLeft,
      heroPencilSquare,
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
export class ProjectDetailComponent {
  public _uuid!: string;

  @ViewChild('taskFormDialog') taskFormDialog!: TaskFormDialogComponent;

  selectedTask?: TaskResponse;

  public project: ProjectResponse = {
    uuid: '34ed8ba3-f7b4-4565-a5a9-b5605b0d8df4',
    title: 'E-Commerce Platform Development',
    description:
      'Development of a scalable e-commerce platform with advanced search and recommendation features.',
    created_at: new Date('2023-03-10'),
    owner_user: {
      email: 'jeremy@gmail.com',
      name: 'Jeremy',
    },
    chat_uuid: 'chat1',
  };

  public tasks: TaskResponse[] = [
    {
      uuid: '1',
      title: 'UI Design Wireframes',
      description:
        'Create wireframes for the user interface design of the e-commerce platform.',
      created_at: new Date('2023-03-12'),
      project_uuid: '1',
      actual_minutes: 220,
    },
    {
      uuid: '2',
      title: 'Database Schema Design',
      description:
        'Design the database schema for storing product, user, and order information.',
      created_at: new Date('2023-03-15'),
      project_uuid: '1',
      planned_minutes: 360,
      actual_minutes: 380,
    },
    {
      uuid: '3',
      title: 'Frontend Development: Homepage',
      description:
        'Develop the homepage of the e-commerce platform using HTML, CSS, and JavaScript.',
      created_at: new Date('2023-03-20'),
      project_uuid: '1',
      actual_minutes: 680,
    },
    {
      uuid: '4',
      title: 'Backend Development: User Authentication',
      description:
        'Implement user authentication functionality on the backend using Node.js and Express.',
      created_at: new Date('2023-03-25'),
      project_uuid: '1',
      planned_minutes: 480,
      actual_minutes: 500,
    },
    {
      uuid: '5',
      title: 'Product Catalog Management System',
      description:
        'Develop the product catalog management system to add, edit, and delete products.',
      created_at: new Date('2023-04-02'),
      project_uuid: '1',
      planned_minutes: 600,
      actual_minutes: 620,
    },
    {
      uuid: '6',
      title: 'Search and Filter Functionality',
      description:
        'Implement search and filter functionality to allow users to find products easily.',
      created_at: new Date('2023-04-10'),
      project_uuid: '1',
      planned_minutes: 480,
    },
    {
      uuid: '7',
      title: 'Shopping Cart Feature',
      description:
        'Develop the shopping cart feature to allow users to add and manage items in their cart.',
      created_at: new Date('2023-04-15'),
      project_uuid: '1',
    },
    {
      uuid: '8',
      title: 'Payment Gateway Integration',
      description:
        'Integrate payment gateway for secure and convenient online transactions.',
      created_at: new Date('2023-04-20'),
      project_uuid: '1',
      planned_minutes: 600,
    },
    {
      uuid: '9',
      title: 'User Testing and Feedback',
      description:
        'Conduct user testing sessions and gather feedback for further improvements.',
      created_at: new Date('2023-04-25'),
      project_uuid: '1',
    },
    {
      uuid: '10',
      title: 'Final Deployment and Launch',
      description:
        'Deploy the e-commerce platform to production servers and launch it for public access.',
      created_at: new Date('2023-04-30'),
      project_uuid: '1',
      planned_minutes: 240,
    },
  ];

  public taskControls = {
    uuid: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    planned_minutes: ['', []],
    actual_minutes: ['', []],
    created_at: ['', [Validators.required]],
  };

  @Input()
  set uuid(project_uuid: string) {
    this._uuid = project_uuid;
  }

  onSubmit(entity: TaskResponse) {
    console.log('Submitting task:', entity);
  }

  onEditClick(task: TaskResponse) {
    this.selectedTask = task;
    this.taskFormDialog.openDialog(task);
  }
}
