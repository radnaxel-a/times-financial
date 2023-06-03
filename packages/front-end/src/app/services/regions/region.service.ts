import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRegion } from './interfaces/IRegion';

@Injectable({
    providedIn: 'root',
})
export class RegionService {
    private url = `${environment.baseApiUrl}regions`;

    constructor(private http: HttpClient) {}

    public get(id?: string): Observable<IRegion[]> | Observable<IRegion> {
        if (id) {
            return this.http.get<IRegion>(`${this.url}/${id}`);
        }

        return this.http.get<IRegion[]>(this.url);
    }

    public post(body: Partial<IRegion>) {
        return this.http.post(this.url, body);
    }

    public put(id: string, body: Partial<IRegion>) {
        return this.http.put(`${this.url}/${id}`, body);
    }

    public delete(id: string) {
        return this.http.delete(`${this.url}/${id}`);
    }
}
