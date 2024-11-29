import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { ModalNewComponent } from './components/modals/modal-new/modal-new.component';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TableOverview } from './components/ui/table-overview/table-overview.component';
import { ProductUpdateService } from './api/services/product-update.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    TableOverview,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestor de Productos';
  sidebarOpen = false;

  constructor(
    private dialog: MatDialog,
    private productUpdateService: ProductUpdateService,
  ) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openModalNew(): void {
    const dialogRef = this.dialog.open(ModalNewComponent, {});
    dialogRef.afterClosed().subscribe(() => {
      this.productUpdateService.notifyProductChange();
    });
  }
}
