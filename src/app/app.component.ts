import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { ClientService } from './services/client.service';
import { FirebaseService } from './services/firebase.service';
import { Client } from '././models/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'edad', 'nacimiento', 'fallecimiento', 'acciones'];
  ClientsList: any = [];
  metric: any = {};

  FirebaseList: any = [];

  constructor(
    public clientService: ClientService,
    public firebaseService: FirebaseService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadClients();
    this.loadMetrics();
  }

  loadClients() {
    return this.clientService.GetClients().subscribe((data: {}) => {
      this.ClientsList = data;
    })
  }

  loadMetrics() {
    return this.clientService.GetKpis().subscribe((data: {}) => {
      this.metric = data;
    })
  }

  addNew(client: Client): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {client: client}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadClients();
    });
  }

  deleteClient(id: number): void{
    const dialogDelete = this.dialog.open(DeleteDialogComponent, {
      data: {id: id}
    });

    dialogDelete.afterClosed().subscribe(result => {
      this.loadClients();
    });
  }
}
