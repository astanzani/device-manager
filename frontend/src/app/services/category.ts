import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../types';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private url = '/categories';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  public addCategory(category: Omit<Category, 'id'>) {
    return this.http.post<Category>(this.url, category, {
      headers: this.headers,
    });
  }

  public deleteCategory(id: Category['id']) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
