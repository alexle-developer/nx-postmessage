import { Component, HostListener, OnInit } from '@angular/core';
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
  messageFromChild = '';
  messageToChild = '';
  isMessageFromChild = false;

  ngOnInit(): void {
    this.messageToChild = '';
  }

  /**
   * Sends a message to the child component.
   *
   * @param message - The message to be sent.
   */
  sendMessage = (message: string) => {
    this.messageToChild = `${message}`;
    this.postMessage(message);
  };

  /**
   * Sends a message to the child app through postMessage.
   * @param message The message to be sent.
   */
  postMessage = (message: string) => {
    const iframeElement = document.getElementById(
      'childAppIframe'
    ) as HTMLIFrameElement;

    iframeElement?.contentWindow?.postMessage(message, 'http://localhost:5001');
  };

  /**
   * Handles the message event.
   * @param event The message event.
   */
  @HostListener('window:message', ['$event'])
  onMessage = (event: MessageEvent) => {
    // clear out the message to child app
    this.messageToChild = '';

    // set the message from the child app
    this.isMessageFromChild = true;
    this.messageFromChild = event.data;
  };
}
