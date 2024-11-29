import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductUpdateService {
  // Subjects para emitir notificaciones
  private productUpdated = new Subject<void>();
  private productsGenerated = new Subject<void>();

  // Observables para que otros componentes puedan suscribirse
  productUpdated$ = this.productUpdated.asObservable();
  productsGenerated$ = this.productsGenerated.asObservable();

  // Método para notificar actualización de producto
  notifyProductChange(): void {
    this.productUpdated.next();
  }

  // Método para notificar generación de productos
  notifyProductsGenerated(): void {
    this.productsGenerated.next();
  }
}
