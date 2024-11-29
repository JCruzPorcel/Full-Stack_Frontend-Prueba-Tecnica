import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ProductData } from '../../../models/product.model'; // Asegúrate de importar el modelo adecuado

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  // Método GET para obtener todos los productos
  getProducts(): Observable<any> {
    const url = `${this.apiUrl}/products`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(url, { headers });
  }

  // Método GET para obtener un producto por ID
  getProductById(productId: number): Observable<any> {
    const url = `${this.apiUrl}/products/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(url, { headers });
  }

  // Método PUT para actualizar un producto
  updateProduct(product: ProductData): Observable<any> {
    const url = `${this.apiUrl}/products/${product.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put<any>(url, product, { headers });
  }

  // Método POST para crear un nuevo producto
  createProduct(product: ProductData): Observable<any> {
    const url = `${this.apiUrl}/products`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(url, product, { headers });
  }

  // Método DELETE para eliminar un producto
  deleteProduct(productId: number): Observable<any> {
    const url = `${this.apiUrl}/products/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete<any>(url, { headers });
  }
}
