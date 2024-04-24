import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  output,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ProjectResponse, UserResponse } from '../../services/api/models';
import { MultiSelectComponent } from '../multi-select/multi-select.component';

@Component({
  selector: 'app-project-member-form-dialog',
  standalone: true,
  templateUrl: './project-member-form-dialog.component.html',
  styleUrl: './project-member-form-dialog.component.css',
  providers: [DatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelectComponent,
  ],
})
export class ProjectMemberFormDialogComponent {
  formGroup: any;
  @ViewChild('projectMemberModal') dialog!: ElementRef<HTMLDialogElement>;

  @Input()
  public entity?: ProjectResponse = undefined;

  @Input()
  public allUsers!: UserResponse[];

  public onSubmit = output<UserResponse[]>();

  selectedUsers: UserResponse[] = [];

  openDialog(entity: ProjectResponse): void {
    this.hideScrollbars();
    this.entity = entity;

    this.formGroup.patchValue({
      uuid: this.entity.uuid,
      title: this.entity.title,
      description: this.entity.description,
      ownerName: this.entity.owner_user.name,
      ownerEmail: this.entity.owner_user.email,
      createdAt: this.datePipe.transform(this.entity.created_at),
    });

    this.dialog.nativeElement.showModal();

    const onClose = () => {
      this.dialog.nativeElement.removeEventListener('close', onClose);
      this.entity = undefined;
      this.showScrollbars();
    };

    this.dialog.nativeElement.addEventListener('close', onClose);

    this.selectedUsers = this.allUsers.filter((user) =>
      this.entity?.member_users.map((x) => x.email).includes(user.email)
    );
  }

  hideScrollbars() {
    document.body.classList.add('dialog-open');
  }

  showScrollbars() {
    document.body.classList.remove('dialog-open');
  }

  _onSubmit() {
    this.onSubmit.emit(this.selectedUsers);
  }

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.formGroup = this.formBuilder.group({
      uuid: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      ownerEmail: ['', [Validators.required]],
      createdAt: ['', [Validators.required]],
    });
  }

  textFormatter = (users: UserResponse[]) => {
    if (users.length === 0) return 'Manage your project members';
    else return 'Some members...';
  };

  isReadonly = (entity: UserResponse): boolean => {
    return this.entity?.owner_user.email === entity.email;
  };
}
