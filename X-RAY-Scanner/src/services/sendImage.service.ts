import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AnalyzeService {
    private apiUrl = environment.apiURL;

    constructor(private http: HttpClient) {}

    analyze(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.apiUrl}/api/analyze`, formData);
    }
}