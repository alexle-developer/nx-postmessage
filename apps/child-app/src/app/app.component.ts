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

  replyToParent(message: string): void {
    console.log('message sent:', message);
    //.postMessage(message);
  }
  // create a window listener to listen for messages from the parent-app
  @HostListener('window:message', ['$event'])
  onMessage = (event: MessageEvent) => {
    console.log('message received', event.data);
    this.isMessageFromParent = true;
    this.messageFromParent = event.data;
  };
}
