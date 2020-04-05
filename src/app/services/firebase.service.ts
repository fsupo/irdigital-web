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

    createClient(client: Client){
        return this.firestore.collection('clientes').add({
            edad: client.edad,
            nombre: client.nombre,
            apellido: client.apellido,
            nacimiento: client.nacimiento
        });
    }

    putClient(client: Client){
        delete client.id;
        this.firestore.doc('clientes/' + client.id).update(client);
    }

    deletePolicy(clientId: string){
        this.firestore.doc('clientes/' + clientId).delete();
    }
}