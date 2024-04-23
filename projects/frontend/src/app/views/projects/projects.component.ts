import { CommonModule } from '@angular/common';
import { Component, ViewChild, type OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectFormDialogComponent } from '../../components/project-form-dialog/project-form-dialog.component';
import { Observable } from 'rxjs';
import { ProjectsService } from '../../services/api/projects.service';
import { ProjectResponse } from '../../services/api/models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  imports: [
    CommonModule,
    ProjectCardComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ProjectFormDialogComponent,
  ],
})
export class ProjectsComponent implements OnInit {
  projects$!: Observable<ProjectResponse[]>;

  projects: ProjectResponse[] = [
    // {
    //   uuid: '1',
    //   title: 'E-Commerce Platform Development',
    //   description:
    //     'Development of a scalable e-commerce platform with advanced search and recommendation features.',
    //   created_at: new Date('2023-03-10'),
    //   owner_email: 'project_owner1@example.com',
    //   owner_name: 'Jeremy',
    //   chatUuid: 'chat1',
    // },
    // {
    //   uuid: '2',
    //   title: 'Mobile Banking App Enhancement',
    //   description:
    //     'Enhancement of existing mobile banking application with biometric authentication and budgeting tools.',
    //   created_at: new Date('2023-05-22'),
    //   owner_email: 'project_owner2@example.com',
    //   owner_name: 'John',
    //   chatUuid: 'chat2',
    // },
    // {
    //   uuid: '3',
    //   title: 'Data Analytics Dashboard Development',
    //   description:
    //     'Development of a data analytics dashboard for visualizing key performance indicators and trends.',
    //   created_at: new Date('2023-07-15'),
    //   owner_email: 'project_owner3@example.com',
    //   owner_name: 'Eva',
    //   chatUuid: 'chat3',
    // },
    // {
    //   uuid: '4',
    //   title: 'Cloud Migration Strategy Implementation',
    //   description:
    //     'Implementation of a cloud migration strategy for transitioning legacy systems to cloud infrastructure.',
    //   createdAt: new Date('2023-09-05'),
    //   owner_email: 'project_owner4@example.com',
    //   owner_name: 'Jeremy',
    //   chatUuid: 'chat4',
    // },
    // {
    //   uuid: '5',
    //   title: 'Customer Relationship Management System Integration',
    //   description:
    //     'Integration of a CRM system with existing business applications for improved customer management.',
    //   createdAt: new Date('2023-10-18'),
    //   owner_email: 'project_owner5@example.com',
    //   owner_name: 'Max',
    //   chatUuid: 'chat5',
    // },
    // {
    //   uuid: '6',
    //   title: 'AI-Powered Chatbot Development',
    //   description:
    //     'Development of an AI-powered chatbot for providing customer support and assistance.',
    //   createdAt: new Date('2023-11-30'),
    //   owner_email: 'project_owner6@example.com',
    //   owner_name: 'Max',
    //   chatUuid: 'chat6',
    // },
    // {
    //   uuid: '7',
    //   title: 'Cybersecurity Assessment and Remediation',
    //   description:
    //     'Conducting a comprehensive cybersecurity assessment and implementing necessary remediation measures.',
    //   createdAt: new Date('2024-01-12'),
    //   owner_email: 'project_owner7@example.com',
    //   owner_name: 'Tom',
    //   chatUuid: 'chat7',
    // },
    // {
    //   uuid: '8',
    //   title: 'Blockchain Integration for Supply Chain Management',
    //   description:
    //     'Integration of blockchain technology for enhancing transparency and traceability in supply chain management.',
    //   createdAt: new Date('2024-02-28'),
    //   owner_email: 'project_owner8@example.com',
    //   owner_name: 'Tom',
    //   chatUuid: 'chat8',
    // },
    // {
    //   uuid: '9',
    //   title: 'Healthcare Application Development',
    //   description:
    //     'Development of a healthcare application for managing patient records and appointments.',
    //   createdAt: new Date('2024-04-03'),
    //   owner_email: 'project_owner9@example.com',
    //   owner_name: 'Jeremy',
    //   chatUuid: 'chat9',
    // },
    // {
    //   uuid: '10',
    //   title: 'Automated Testing Framework Implementation',
    //   description:
    //     'Implementation of an automated testing framework to streamline software testing processes.',
    //   createdAt: new Date('2024-05-20'),
    //   owner_email: 'project_owner10@example.com',
    //   owner_name: 'Jeremy',
    //   chatUuid: 'chat10',
    // },
  ];

  @ViewChild('projectFormDialog')
  projectFormDialog!: ProjectFormDialogComponent;

  selectedProject?: ProjectResponse;

  submitType: 'create' | 'update' = 'create';

  constructor(
    private projectsService: ProjectsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.projects$ = this.projectsService.getAll();
  }

  onSubmit(entity: ProjectResponse) {
    console.log('Submitting project:', entity);

    if (this.submitType === 'create') {
      this.projectsService
        .create({
          title: entity.title,
          description: entity.description,
        })
        .subscribe((res) => {
          // TODO: use response instead of making another request
          this.projects$ = this.projectsService.getAll();
        });
    } else if (this.submitType === 'update') {
      this.projectsService
        .update(entity.uuid, {
          title: entity.title,
          description: entity.description,
        })
        .subscribe((res) => {
          // TODO: use response instead of making another request
          this.projects$ = this.projectsService.getAll();
        });
    }
  }

  onEditClick(project: ProjectResponse) {
    this.submitType = 'update';
    this.selectedProject = project;
    this.projectFormDialog.openDialog(project);
  }

  onCreateClick() {
    this.submitType = 'create';
    const currentUser = this.userService.getUserSession();

    this.selectedProject = {
      uuid: '<Will be set on the backend>',
      chat_uuid: '<Will be set on the backend>',
      created_at: new Date(Date.now()),
      description: '',
      title: '',
      owner_user: {
        email: currentUser?.userEmail + ' (You)',
        name: currentUser?.userName + ' (You)',
      },
    };
    this.projectFormDialog.openDialog(this.selectedProject);
  }
}
