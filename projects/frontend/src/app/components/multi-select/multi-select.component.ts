import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  output,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroChevronUp } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
  viewProviders: [
    provideIcons({
      heroChevronDown,
      heroChevronUp,
    }),
  ],
})
export class MultiSelectComponent implements OnInit {
  dropdownText = 'Choose team members';

  dropdownState: 'open' | 'close' = 'open';

  toggleDropdown() {
    if (this.dropdownState === 'open') this.dropdownState = 'close';
    else this.dropdownState = 'open';
  }

  getIcon() {
    if (this.dropdownState === 'open') return 'heroChevronUp';
    else return 'heroChevronDown';
  }

  @Input()
  selectedEntities: any[] = [];
  selectedEntitiesChange = output<any[]>();

  @Input({ required: true })
  label!: string;

  @Input({ required: true })
  entities!: any[];

  @Input({ required: true })
  textFormatter!: (selectedEntities: any[]) => string;

  @Input()
  isReadonly: (entity: any) => boolean = () => false;

  @ContentChild(TemplateRef) optionTemplate: TemplateRef<any> | null = null;

  @Input()
  readonlyEntities: any[] = [];

  ngOnInit(): void {
    this.dropdownText = this.textFormatter(this.entities);
  }

  onSelectChange(target: EventTarget | null, entity: any) {
    if (target === null) return;
    const isChecked = (<HTMLInputElement>target).checked;

    if (isChecked) {
      this.selectedEntities.push(entity);
    } else {
      const index = this.selectedEntities.indexOf(entity);
      this.selectedEntities.splice(index, 1);
    }

    this.selectedEntitiesChange.emit(this.selectedEntities);
  }
}
