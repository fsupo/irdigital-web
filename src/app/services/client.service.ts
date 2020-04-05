import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Client } from '../models/client';
import { Metric } from '../models/metric';

@Injectable({
    providedIn: 'root'
})

export class ClientService {

    baseurl = 'https://ms-irdigital.azurewebsites.net/cliente';

    constructor(private http: HttpClient) { }

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // GET
    GetClients(): Observable<Client> {
        return this.http.get<Client>(this.baseurl + '/listclientes')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

    // POST
    createClient(Client): Observable<Client> {
        return this.http.post<Client>(this.baseurl + '/creacliente', JSON.stringify(Client), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

    // POST
    DeleteClient(id) {
        return this.http.delete<Client>(this.baseurl + '/eliminar/' + id, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

    // GET
    GetKpis(): Observable<Metric> {
        return this.http.get<Metric>(this.baseurl + '/kpideclientes')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

    // Error handling
    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}