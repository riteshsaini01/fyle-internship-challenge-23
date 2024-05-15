import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  topics: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get<any>(`https://api.github.com/users/${githubUsername}`);
  }

  getRepos(githubUsername: string, page: number, perPage: number): Observable<Repository[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('per_page', perPage)
      .set('sort', 'updated');

    return this.httpClient.get<Repository[]>(`https://api.github.com/users/${githubUsername}/repos`, { params });
  }
}
