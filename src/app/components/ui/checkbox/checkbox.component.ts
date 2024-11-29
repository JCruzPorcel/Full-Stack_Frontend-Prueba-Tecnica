import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.css'], 
  imports: [MatCheckboxModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input() label: string = 'Name';
  @Input() checked: boolean = false;  
}
