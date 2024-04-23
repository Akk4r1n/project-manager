import { CommonModule } from '@angular/common';
import { Component, ViewChild, type OnInit } from '@angular/core';
import { Project } from '../../interfaces/domain';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectFormDialogComponent } from '../../components/project-form-dialog/project-form-dialog.component';

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
export class ProjectsComponent {
  projects: Project[] = [
    {
      uuid: '1',
      title: 'E-Commerce Platform Development',
      description:
        'Development of a scalable e-commerce platform with advanced search and recommendation features.',
      createdAt: new Date('2023-03-10'),
      ownerEmail: 'project_owner1@example.com',
      ownerName: 'Jeremy',
      chatUuid: 'chat1',
    },
    {
      uuid: '2',
      title: 'Mobile Banking App Enhancement',
      description:
        'Enhancement of existing mobile banking application with biometric authentication and budgeting tools.',
      createdAt: new Date('2023-05-22'),
      ownerEmail: 'project_owner2@example.com',
      ownerName: 'John',
      chatUuid: 'chat2',
    },
    {
      uuid: '3',
      title: 'Data Analytics Dashboard Development',
      description:
        'Development of a data analytics dashboard for visualizing key performance indicators and trends.',
      createdAt: new Date('2023-07-15'),
      ownerEmail: 'project_owner3@example.com',
      ownerName: 'Eva',
      chatUuid: 'chat3',
    },
    {
      uuid: '4',
      title: 'Cloud Migration Strategy Implementation',
      description:
        'Implementation of a cloud migration strategy for transitioning legacy systems to cloud infrastructure.',
      createdAt: new Date('2023-09-05'),
      ownerEmail: 'project_owner4@example.com',
      ownerName: 'Jeremy',
      chatUuid: 'chat4',
    },
    {
      uuid: '5',
      title: 'Customer Relationship Management System Integration',
      description:
        'Integration of a CRM system with existing business applications for improved customer management.',
      createdAt: new Date('2023-10-18'),
      ownerEmail: 'project_owner5@example.com',
      ownerName: 'Max',
      chatUuid: 'chat5',
    },
    {
      uuid: '6',
      title: 'AI-Powered Chatbot Development',
      description:
        'Development of an AI-powered chatbot for providing customer support and assistance.',
      createdAt: new Date('2023-11-30'),
      ownerEmail: 'project_owner6@example.com',
      ownerName: 'Max',
      chatUuid: 'chat6',
    },
    {
      uuid: '7',
      title: 'Cybersecurity Assessment and Remediation',
      description:
        'Conducting a comprehensive cybersecurity assessment and implementing necessary remediation measures.',
      createdAt: new Date('2024-01-12'),
      ownerEmail: 'project_owner7@example.com',
      ownerName: 'Tom',
      chatUuid: 'chat7',
    },
    {
      uuid: '8',
      title: 'Blockchain Integration for Supply Chain Management',
      description:
        'Integration of blockchain technology for enhancing transparency and traceability in supply chain management.',
      createdAt: new Date('2024-02-28'),
      ownerEmail: 'project_owner8@example.com',
      ownerName: 'Tom',
      chatUuid: 'chat8',
    },
    {
      uuid: '9',
      title: 'Healthcare Application Development',
      description:
        'Development of a healthcare application for managing patient records and appointments.',
      createdAt: new Date('2024-04-03'),
      ownerEmail: 'project_owner9@example.com',
      ownerName: 'Jeremy',
      chatUuid: 'chat9',
    },
    {
      uuid: '10',
      title: 'Automated Testing Framework Implementation',
      description:
        'Implementation of an automated testing framework to streamline software testing processes.',
      createdAt: new Date('2024-05-20'),
      ownerEmail: 'project_owner10@example.com',
      ownerName: 'Jeremy',
      chatUuid: 'chat10',
    },
  ];

  @ViewChild('projectFormDialog')
  projectFormDialog!: ProjectFormDialogComponent;

  selectedProject?: Project;

  onSubmit(entity: Project) {
    console.log('Submitting project:', entity);
  }

  onEditClick(project: Project) {
    this.selectedProject = project;
    this.projectFormDialog.openDialog(project);
  }
}
