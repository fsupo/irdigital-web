import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
    selector: 'app-delete.dialog',
    templateUrl: '../../dialogs/delete/delete.dialog.html',
    styleUrls: ['../../dialogs/delete/delete.dialog.css']
})

export class DeleteDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public firebaseService: FirebaseService,
        public clientService: ClientService) { }

    submit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public confirmDelete(): void {
        var id = this.data.id;
        this.clientService.DeleteClient(id).subscribe((data: {}) => { })
    }
}
