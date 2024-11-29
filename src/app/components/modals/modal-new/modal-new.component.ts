import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../api/services/api.service';
import { ProductUpdateService } from '../../../api/services/product-update.service';
import { ProductData } from '../../../../models/product.model';
import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';  
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-modal-new',
  templateUrl: './modal-new.component.html',
  styleUrls: ['./modal-new.component.css'],
  standalone: true, 
  imports: [CommonModule, MatButtonModule, FormsModule],
})
export class ModalNewComponent {
  productData: ProductData = {
    id: 0, 
    nombre: '', 
    precio: 0, 
    cantidadEnStock: 0, 
    activo: true, 
    codigosBarra: [], 
  };

  constructor(
    public dialogRef: MatDialogRef<ModalNewComponent>,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private productUpdateService: ProductUpdateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  acceptAction(): void {
    if (!this.productData.nombre || this.productData.precio <= 0 || this.productData.cantidadEnStock < 0) {
      this.snackBar.open('Por favor, llena todos los campos correctamente.', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return;
    }

    this.apiService.createProduct(this.productData).subscribe({
      next: (response) => {
        this.snackBar.open('Producto creado exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.productUpdateService.notifyProductChange(); 
        this.dialogRef.close(response); 
      },
      error: (err) => {
        this.snackBar.open('Error al crear el producto. Intenta nuevamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
