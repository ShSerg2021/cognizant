import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { User } from './user.service';
import { EventFeedService } from './event-feed.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private ws: any;

  constructor(private eventFeedService: EventFeedService) { }

  public connect(user: User, token: string) {
    const protocol = window.location.protocol;
    const host = window.location.hostname;
    this.disconnect();
    const socket = new SockJS(`${protocol}//${host}/notification-service/websocket/?access_token=${token}`);
    this.ws = Stomp.over(socket);
    this.ws.debug = null;
    this.ws.connect(
      {},
      (frame: any) => {
        console.log(frame);
        this.ws.subscribe(`/notification/${user?.email}`, (message: any) => {
          const body = JSON.parse(message.body);
          if (body && body.type === 'eventFeed') {
            this.eventFeedService.findAll();
          }
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public disconnect() {
    if (this.ws) {
      this.ws.disconnect();
    }
  }
}
