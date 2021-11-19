import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventFeed } from '../domain/event-feed';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventFeedService {
  private readonly url = '/notification-service/event-feed'

  private events$ = new Subject<EventFeed[]>();

  constructor(private httpClient: HttpClient) { }

  public eventsHandler = this.events$.asObservable();

  public findAll(): void {
    this.httpClient.get<EventFeed[]>(this.url).subscribe(e => this.events$.next(e));
  }

  public delete(id: string): Observable<{}> {
    return this.httpClient.delete<{}>(`${this.url}/${id}`)
  }
}
