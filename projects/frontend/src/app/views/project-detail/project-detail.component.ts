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
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { Project, Task } from '../../interfaces/domain';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
  viewProviders: [
    provideIcons({
      heroArrowLeft,
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
  ],
})
export class ProjectDetailComponent implements AfterViewInit {
  @ViewChild('taskModal') dialog!: ElementRef<HTMLDialogElement>;

  public _uuid!: string;

  formGroup: any;

  public project: Project = {
    uuid: '34ed8ba3-f7b4-4565-a5a9-b5605b0d8df4',
    title: 'E-Commerce Platform Development',
    description:
      'Development of a scalable e-commerce platform with advanced search and recommendation features.',
    createdAt: new Date('2023-03-10'),
    ownerEmail: 'project_owner1@example.com',
    chatUuid: 'chat1',
  };

  public tasks: Task[] = [
    {
      uuid: '1',
      title: 'UI Design Wireframes',
      description:
        'Create wireframes for the user interface design of the e-commerce platform.',
      createdAt: new Date('2023-03-12'),
      projectUuid: '1',
      actualMinutes: 220,
    },
    {
      uuid: '2',
      title: 'Database Schema Design',
      description:
        'Design the database schema for storing product, user, and order information.',
      createdAt: new Date('2023-03-15'),
      projectUuid: '1',
      plannedMinutes: 360,
      actualMinutes: 380,
    },
    {
      uuid: '3',
      title: 'Frontend Development: Homepage',
      description:
        'Develop the homepage of the e-commerce platform using HTML, CSS, and JavaScript.',
      createdAt: new Date('2023-03-20'),
      projectUuid: '1',
      actualMinutes: 680,
    },
    {
      uuid: '4',
      title: 'Backend Development: User Authentication',
      description:
        'Implement user authentication functionality on the backend using Node.js and Express.',
      createdAt: new Date('2023-03-25'),
      projectUuid: '1',
      plannedMinutes: 480,
      actualMinutes: 500,
    },
    {
      uuid: '5',
      title: 'Product Catalog Management System',
      description:
        'Develop the product catalog management system to add, edit, and delete products.',
      createdAt: new Date('2023-04-02'),
      projectUuid: '1',
      plannedMinutes: 600,
      actualMinutes: 620,
    },
    {
      uuid: '6',
      title: 'Search and Filter Functionality',
      description:
        'Implement search and filter functionality to allow users to find products easily.',
      createdAt: new Date('2023-04-10'),
      projectUuid: '1',
      plannedMinutes: 480,
    },
    {
      uuid: '7',
      title: 'Shopping Cart Feature',
      description:
        'Develop the shopping cart feature to allow users to add and manage items in their cart.',
      createdAt: new Date('2023-04-15'),
      projectUuid: '1',
    },
    {
      uuid: '8',
      title: 'Payment Gateway Integration',
      description:
        'Integrate payment gateway for secure and convenient online transactions.',
      createdAt: new Date('2023-04-20'),
      projectUuid: '1',
      plannedMinutes: 600,
    },
    {
      uuid: '9',
      title: 'User Testing and Feedback',
      description:
        'Conduct user testing sessions and gather feedback for further improvements.',
      createdAt: new Date('2023-04-25'),
      projectUuid: '1',
    },
    {
      uuid: '10',
      title: 'Final Deployment and Launch',
      description:
        'Deploy the e-commerce platform to production servers and launch it for public access.',
      createdAt: new Date('2023-04-30'),
      projectUuid: '1',
      plannedMinutes: 240,
    },
  ];

  selectedTask?: Task;

  @Input()
  set uuid(projectUuid: string) {
    console.log('setting uuid of project detail...');
    this._uuid = projectUuid;
  }

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.formGroup = this.formBuilder.group({
      uuid: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      plannedMinutes: ['', []],
      actualMinutes: ['', []],
      createdAt: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {}

  openDialog(task: Task): void {
    this.hideScrollbars();
    this.selectedTask = task;

    this.formGroup.patchValue({
      uuid: this.selectedTask.uuid,
      title: this.selectedTask.title,
      description: this.selectedTask.description,
      createdAt: this.datePipe.transform(this.selectedTask.createdAt),
      plannedMinutes: this.selectedTask.plannedMinutes,
      actualMinutes: this.selectedTask.actualMinutes,
    });

    this.dialog.nativeElement.showModal();

    const onClose = () => {
      this.dialog.nativeElement.removeEventListener('close', onClose);
      this.selectedTask = undefined;
      this.showScrollbars();
    };

    this.dialog.nativeElement.addEventListener('close', onClose);
  }

  hideScrollbars() {
    document.body.classList.add('dialog-open');
  }

  showScrollbars() {
    document.body.classList.remove('dialog-open');
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
