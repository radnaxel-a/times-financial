import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICountry } from './ICountry';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    private url = `${environment.baseApiUrl}countries`;

    constructor(private http: HttpClient) {}

    public get(): Observable<ICountry[]> {
        return this.http.get<ICountry[]>(this.url);
    }
}
