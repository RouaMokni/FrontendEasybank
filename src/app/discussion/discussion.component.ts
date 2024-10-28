import { Component ,OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
 })

export class DiscussionComponent implements OnInit {
  messages: { text: string, sender: string }[] = [{ text: 'مرحبا بك ،كيف يمكنني مساعدتك', sender: 'bot' }];
  newMessage: string = '';
  showChat: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  toggleChat(): void {
    this.showChat = !this.showChat;
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.isAuthenticated) {
      const messageToSend = this.newMessage.trim();
      this.messages.push({ text: messageToSend, sender: 'user' });
      this.newMessage = '';

      this.chatService.sendMessage(messageToSend).subscribe({
        next: (response) => {
          console.log('Chatbot response:', response); // Log the response for debugging
          if (response.reply) {
            this.messages.push({ text: response.reply, sender: 'bot' });
          } else {
            this.messages.push({
              text: 'Sorry, there was an error processing your request.',
              sender: 'bot'
            });
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.messages.push({
            text: 'أحنا وسيط نتعاملو مع البنوك و مؤسسات التمويل، عنا منصة رقمية و نخدمو عن بعد نوجهو و ننصحو و نعاونو في القرض إذا فما إمكانية حسب المعطيات الي نسمعوها',
            sender: 'bot'
          });
        }
      });
    }
  }
}
