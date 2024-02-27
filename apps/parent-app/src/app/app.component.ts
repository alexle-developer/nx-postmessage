import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, CommonModule],
  selector: 'nx-postmessage-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'parent-app';
  messageToChild = '';
  ngOnInit(): void {
    this.messageToChild = '';
  }

  // write a send message method that capture the value from the textarea and console log it
  sendMessage = (message: string) => {
    this.messageToChild = `${message}`;
    console.log('message sent:', message);
    this.postMessage(message);
  };

  // write a method to send a message to child app using window.postmessage
  postMessage = (message: string) => {
    const iframeElement = document.getElementById(
      'childAppIframe'
    ) as HTMLIFrameElement;

    console.log('iframeElement:', iframeElement);
    iframeElement?.contentWindow?.postMessage(message, 'http://localhost:5001');
  };

  // onMessage = (event: MessageEvent) => {
  //   console.log('message received', event.data);
  //   this.message = event.data;
  // };
}
