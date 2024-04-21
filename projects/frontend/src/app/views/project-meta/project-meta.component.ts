import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Project } from '../../interfaces/domain';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-project-meta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    NgIconComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './project-meta.component.html',
  styleUrl: './project-meta.component.css',
  providers: [DatePipe],
  viewProviders: [
    provideIcons({
      heroArrowLeft,
    }),
  ],
})
export class ProjectMetaComponent {
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

  @Input()
  set uuid(projectUuid: string) {
    console.log('setting uuid of project meta...');
    this._uuid = projectUuid;

    this.formGroup.patchValue({
      uuid: this.project.uuid,
      title: this.project.title,
      description: this.project.description,
      createdAt: this.datePipe.transform(this.project.createdAt),
      ownerName: 'Jeremy',
      ownerEmail: 'jeremy@gmail.com',
    });
  }

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.formGroup = this.formBuilder.group({
      uuid: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdAt: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      ownerEmail: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
