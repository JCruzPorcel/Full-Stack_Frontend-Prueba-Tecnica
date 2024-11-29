import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modals/modal/modal.component';
import { ApiService } from '../../../api/services/api.service';
import { ProductData } from '../../../../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductUpdateService } from '../../../api/services/product-update.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'table-overview',
  templateUrl: 'table-overview.component.html',
  styleUrls: ['table-overview.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
  ],
})
export class TableOverview implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id', 'nombre', 'precio', 'cantidadEnStock', 'activo', 'fechaAlta', 'fechaModificacion', 'accion'
  ];  
  dataSource!: MatTableDataSource<ProductData>;
  private productUpdateSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private productUpdateService: ProductUpdateService
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.productUpdateSubscription = this.productUpdateService.productUpdated$.subscribe(() => {
      this.loadProducts();
    });
  }  

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (data: ProductData[]) => {  
        const products: ProductData[] = data.map((product) => ({
          id: product.id, 
          nombre: product.nombre,  
          precio: product.precio,  
          cantidadEnStock: product.cantidadEnStock,
          activo: product.activo,  
          codigosBarra: product.codigosBarra,
          fechaAlta: product.fechaAlta,  
          fechaModificacion: product.fechaModificacion, 
        }));
  
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error al conectar con la API:', error);
      },
      complete: () => {
        console.log('Datos cargados correctamente.');
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  

  openModal(product: ProductData): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: product
    });
  }

  // Eliminar un producto
  deleteProduct(productId: number): void {
    this.apiService.deleteProduct(productId).subscribe({
      next: () => {
        this.snackBar.open('Producto eliminado exitosamente', 'Cerrar', { duration: 2000 });
        this.productUpdateService.notifyProductChange();        
      },
      error: (error) => {
        this.snackBar.open('Error al eliminar el producto', 'Cerrar', { duration: 2000 });
        console.error('Error al eliminar el producto:', error);
      }
    });
  }
}
