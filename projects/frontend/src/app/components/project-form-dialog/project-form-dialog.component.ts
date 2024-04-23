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
import { Project } from '../../interfaces/domain';

@Component({
  selector: 'app-project-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './project-form-dialog.component.html',
  styleUrl: './project-form-dialog.component.css',
  providers: [DatePipe],
})
export class ProjectFormDialogComponent {
  formGroup: any;
  @ViewChild('projectModal') dialog!: ElementRef<HTMLDialogElement>;

  @Input()
  public entity?: Project = undefined;

  public onSubmit = output<Project>();

  openDialog(entity: Project): void {
    this.hideScrollbars();
    this.entity = entity;

    this.formGroup.patchValue({
      uuid: this.entity.uuid,
      title: this.entity.title,
      description: this.entity.description,
      ownerName: this.entity.ownerName,
      ownerEmail: this.entity.ownerEmail,
      createdAt: this.datePipe.transform(this.entity.createdAt),
    });

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
      uuid: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      ownerEmail: ['', [Validators.required]],
      createdAt: ['', [Validators.required]],
    });
  }
}
