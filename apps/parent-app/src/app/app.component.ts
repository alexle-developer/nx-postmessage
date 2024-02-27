import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'nx-postmessage-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'parent-app';
  message = '';
  ngOnInit(): void {
    this.message = '';
  }

  // write a send message method that capture the value from the textarea and console log it
  sendMessage = (message: string) => {
    console.log('message sent:', message);
  };

  onMessage = (event: MessageEvent) => {
    console.log('message received', event.data);
    this.message = event.data;
  };
}
