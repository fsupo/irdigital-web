import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    public firebaseService: FirebaseService,
    public clientService: ClientService) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' : '';
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ageCalculate() {
    var timeDiff = Math.abs(Date.now() - new Date(this.data.nacimiento).getTime());
    this.data.edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }

  public confirmAdd(): void {
    this.clientService.createClient(this.data).subscribe((data: {}) => { })
    this.firebaseService.createClient(this.data).then((data: {}) => { })
  }
}
