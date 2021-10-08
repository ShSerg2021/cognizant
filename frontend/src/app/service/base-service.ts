import {HttpClient} from '@angular/common/http';
import {BaseEntity} from '../domain/base-entity';
import {Observable} from 'rxjs';

export abstract class BaseService<T extends BaseEntity> {

  protected constructor(protected url: string, protected http: HttpClient) {
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  findById(id: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.url, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${entity.id}`, entity);
  }

  delete(id: string): Observable<{}> {
    return this.http.delete<{}>(`${this.url}/${id}`);
  }
}
