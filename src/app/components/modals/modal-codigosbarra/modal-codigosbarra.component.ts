import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormFieldComponent } from "../../ui/form-field/form-field.component";
import { CheckboxComponent } from '../../ui/checkbox/checkbox.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';  // Asegúrate de que ReactiveFormsModule esté aquí
import { CommonModule } from '@angular/common'; // Necesario para *ngFor

@Component({
  selector: 'app-modal-codigosbarra',
  templateUrl: './modal-codigosbarra.component.html',
  styleUrls: ['./modal-codigosbarra.component.css'],
  imports: [FormFieldComponent, CheckboxComponent, MatButtonModule, ReactiveFormsModule, CommonModule],
})
export class ModalCodigosbarraComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCodigosbarraComponent>
  ) {
    this.form = this.fb.group({
      codigosDeBarra: this.fb.array([]),
    });
    this.addCodigo();
  }

  get codigosDeBarra(): FormArray {
    return this.form.get('codigosDeBarra') as FormArray;
  }

  addCodigo(): void {
    const codigoGroup = this.fb.group({
      codigo: [''],
      activo: [false],
    });
    this.codigosDeBarra.push(codigoGroup);
  }

  removeCodigo(index: number): void {
    this.codigosDeBarra.removeAt(index);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  acceptAction(): void {
    console.log("Acción aceptada", this.form.value);
    this.dialogRef.close('accepted');
  }
}
