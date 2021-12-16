import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@wfh/api-interfaces';

@Component({
  selector: 'wfh-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
