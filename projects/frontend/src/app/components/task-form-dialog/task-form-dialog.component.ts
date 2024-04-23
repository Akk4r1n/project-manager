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
import { TaskResponse } from '../../services/api/models';

@Component({
  selector: 'app-task-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './task-form-dialog.component.html',
  styleUrl: './task-form-dialog.component.css',
  providers: [DatePipe],
})
export class TaskFormDialogComponent {
  formGroup: any;
  @ViewChild('taskModal') dialog!: ElementRef<HTMLDialogElement>;

  @Input()
  public entity?: TaskResponse = undefined;

  public onSubmit = output<TaskResponse>();

  openDialog(entity: TaskResponse): void {
    this.hideScrollbars();
    this.entity = entity;

    this.formGroup.patchValue({
      uuid: this.entity.uuid,
      title: this.entity.title,
      description: this.entity.description,
      createdAt: this.datePipe.transform(this.entity.created_at),
      plannedMinutes: this.entity.planned_minutes,
      actualMinutes: this.entity.actual_minutes,
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
      plannedMinutes: ['', []],
      actualMinutes: ['', []],
      createdAt: ['', [Validators.required]],
    });
  }
}
