import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ProductData } from '../../../../models/product.model';
import { CodigoBarra } from '../../../../models/codigo-barra.model';
import { ModalCodigosbarraComponent } from '../modal-codigosbarra/modal-codigosbarra.component';
import { ApiService } from '../../../api/services/api.service';
import { ProductUpdateService } from '../../../api/services/product-update.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [MatButtonModule, CommonModule, FormsModule],
})
export class ModalComponent {
  productData: ProductData;  
  originalProductData: ProductData;  
  codigosBarra: CodigoBarra[] = [];
  private productUpdateSubscription!: Subscription;
  isEditing: boolean = false; 

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>, 
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public product: ProductData,
    private apiService: ApiService,    
    private productUpdateService: ProductUpdateService,
    private snackBar: MatSnackBar
  ) {
    // Asignar los valores originales del producto a productData
    this.productData = { ...product };  
    this.originalProductData = product;  
    this.codigosBarra = product.codigosBarra!;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  startEditing(): void {
    this.isEditing = true; 
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.productData = { ...this.originalProductData };
  }

  acceptAction(): void {
    console.log('Product data to be sent:', this.productData);

    const updatedProduct: ProductData = {
      id: this.productData.id,
      nombre: this.productData.nombre,  // Nuevo nombre
      precio: this.productData.precio,  // Nuevo precio
      cantidadEnStock: this.productData.cantidadEnStock,  // Nueva cantidad en stock
      activo: this.productData.activo,  // Estado del producto (activo o no)
      fechaAlta: this.productData.fechaAlta,  // Mantener la fecha original
      fechaModificacion: this.productData.fechaModificacion,  // Se aActualiza la fecha de modificación en el backend
      codigosBarra: this.productData.codigosBarra,  // Los códigos de barras no cambian por ahora
    };

    // Enviar la solicitud de actualización al backend
    this.apiService.updateProduct(updatedProduct).subscribe(response => {
      this.snackBar.open('Producto actualizado con éxito!', 'Cerrar', {
        duration: 3000,  
        panelClass: ['snack-bar-success']
      });

      this.productUpdateService.notifyProductChange();
      this.isEditing = false;
      this.dialogRef.close(updatedProduct);
    }, error => {
      this.snackBar.open('Error al actualizar el producto', 'Cerrar', {
        duration: 3000,
        panelClass: ['snack-bar-error']
      });
    });
  }

  openModalCodigosBarra(): void {
    const dialogRef = this.dialog.open(ModalCodigosbarraComponent, {
      width: '400px',
      data: {
        codigosBarra: this.codigosBarra
      }
    });

    dialogRef.afterClosed().subscribe((result: CodigoBarra[]) => {
      if (result) {
        this.codigosBarra = result; 
      }
    });
  }
}
