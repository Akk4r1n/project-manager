import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectResponse, UserResponse } from '../../services/api/models';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-project-member-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatSelectModule],
  templateUrl: './project-member-form-dialog.component.html',
  styleUrl: './project-member-form-dialog.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectMemberFormDialogComponent {
  formGroup: any;
  @ViewChild('projectModal') dialog!: ElementRef<HTMLDialogElement>;

  @Input()
  public entity?: ProjectResponse = undefined;

  public onSubmit = output<UserResponse[]>();

  openDialog(entity: ProjectResponse): void {
    this.hideScrollbars();
    this.entity = entity;

    console.log(this.entity);

    // this.formGroup.patchValue({
    //   uuid: this.entity.uuid,
    //   title: this.entity.title,
    //   description: this.entity.description,
    //   ownerName: this.entity.owner_user.name,
    //   ownerEmail: this.entity.owner_user.email,
    //   createdAt: this.datePipe.transform(this.entity.created_at),
    // });

    this.dialog.nativeElement.showModal();

    const onClose = () => {
      this.dialog.nativeElement.removeEventListener('close', onClose);
      this.entity = undefined;
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

  _onSubmit() {
    this.onSubmit.emit(this.formGroup.value);
  }

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.formGroup = this.formBuilder.group({
      // uuid: ['', [Validators.required]],
      // title: ['', [Validators.required]],
      // description: ['', [Validators.required]],
      // ownerName: ['', [Validators.required]],
      // ownerEmail: ['', [Validators.required]],
      // createdAt: ['', [Validators.required]],
      projectMembers: [[], [Validators.required]],
    });
  }
}
