import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Client } from '.././models/client';

@Injectable({
    providedIn: "root"
})
export class FirebaseService {

    constructor(private firestore: AngularFirestore) { }

    getClient() {
        return this.firestore.collection("clientes").snapshotChanges();
    }

    postClient(client: Client){
        return this.firestore.collection('clientes').add(client);
    }

    putClient(client: Client){
        delete client.id;
        this.firestore.doc('policies/' + client.id).update(client);
    }

    deletePolicy(clientId: string){
        this.firestore.doc('policies/' + clientId).delete();
    }
}