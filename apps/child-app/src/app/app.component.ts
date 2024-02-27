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
  title = 'child-app';
  messageFromParent = '';
  messageToParent = '';
  isMessageFromParent = false;

  ngOnInit(): void {
    this.messageFromParent = 'No greeting message from the parent-app today';
  }

  /**
   * Sends a reply message to the parent app.
   * @param message The message to send.
   */
  replyToParent(message: string): void {
    // clear the message from the parent app
    this.messageFromParent = '';

    // set the reply message to the parent app
    this.messageToParent = message;
    window.parent.postMessage(message, 'http://localhost:5000');
  }

  @HostListener('window:message', ['$event'])
  /**
   * Handles the message event from the parent-app.
   * Sets the message from the parent-app and updates the flag indicating that the message is from the parent.
   * @param event The message event object.
   */
  onMessage = (event: MessageEvent) => {
    // set the message from the parent-app
    this.isMessageFromParent = true;
    this.messageFromParent = `${event.data}`;
  };
}
