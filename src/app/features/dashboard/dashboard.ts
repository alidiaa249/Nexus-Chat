import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule, AbstractControl } from '@angular/forms';
import { User } from '../../core/services/user';
import { SocketService } from '../../core/services/socket';
import { Auth } from './../../core/services/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatarUrl?: string;
  initials?: string;
  unreadCount?: number;
  active?: boolean;
}
export interface message {
  _id: string;
  roomId: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  isMobileNavOpen = signal(false);

  isDarkMode = signal(false);

  @HostBinding('class.dark-theme')
  get darkThemeHostClass(): boolean {
    return this.isDarkMode();
  }
  userserve = inject(User);
  socket = inject(SocketService);
  router = inject(Router);
  auth = inject(Auth);
  messageDraft = '';
  users: any[] = [];
  roomId: string = '';
  myuserid = JSON.parse(localStorage.getItem('user')!);
  private subs: Subscription[] = [];
  messages = signal<message[]>([]);
  isSomeoneTyping = signal(false);
  selectedReceiverId = '';
  private isTypingSent = false;
  username = signal('');

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event): void {
    this.roomId = '';
    console.log(this.roomId);
    this.username.set('');
  }



    ngOnInit(): void {
    this.getusers();
  }


  toggleMobileNav(): void {
    this.isMobileNavOpen.update((v) => !v);
  }

  toggleTheme(): void {
    this.isDarkMode.update((v) => !v);
  }

  onComposerInput(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > 120 ? 'auto' : 'hidden';

    if (!this.roomId) {
      return;
    }

    const hasText = this.messageDraft.trim().length > 0;

    if (hasText && !this.isTypingSent) {
      this.onTyping();
    } else if (!hasText && this.isTypingSent) {
      this.onStopTyping();
    }
  }

  selectChat(chat: string, reciverid: string , username: string): void {
    this.socket.leaveRoom(this.roomId); // for left the past room
    this.subs.forEach((s) => s.unsubscribe());
      this.socket.offReceiveMessage();
  this.socket.offIsTyping();
  this.socket.offIsNotTyping();
     this.subs = [];
// for left the past room


    this.username.set(username);
    this.roomId = chat;
    this.selectedReceiverId = reciverid;
    this.isTypingSent = false;
    this.getroommessage(this.roomId);
    this.socket.joinRoom(this.roomId);
  this.socket.onReceiveMessage((msg) => {
    console.log(msg);
    const formattedMsg: message = {
      _id:  crypto.randomUUID(), 
      roomId: msg.roomId,
      content: msg.message,             
      senderId: msg.senderId,
      receiverId: this.selectedReceiverId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };
    this.messages.update((current) => [...current, formattedMsg]);
  });

  console.log('4️⃣ onReceiveMessage listener registered');

    // typing indicators
  this.socket.onIsTyping(() => {
    this.isSomeoneTyping.set(true);
    console.log(this.isSomeoneTyping());
    
  });

  this.socket.onIsNotTyping(() => {
    this.isSomeoneTyping.set(false);
    console.log(this.isSomeoneTyping());
  });
  }


   refreshToken() {
    this.auth.refreshToken().subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.accessToken);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  logout() {
    this.auth.logout().subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['/auth']);
        localStorage.removeItem('token');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getusers() {
    this.userserve.getusers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res.users;
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.refreshToken();
          this.getusers();
        } else {
          console.error('Error fetching users:', err);
        }
      },
    });
  }



  
  getroommessage(selectedRoomId: string) {
    this.userserve.getmessages(selectedRoomId).subscribe({
      next: (value) => {
        console.log(value);
        this.messages.set(Array.isArray(value?.messages) ? value.messages : []);
      },error: (err) => {
        if (err.status === 401) {
          this.refreshToken()
          this.getroommessage(selectedRoomId);
      
  
  
         
      }}
    });
  }

  sendmessage() {
    this.userserve.sendmessage(this.messageDraft, this.selectedReceiverId, this.roomId).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        if (err.status === 401) {
          this.refreshToken();
          this.sendmessage();
        } else {
          console.error('Error sending message:', err);
        }
  
      },
    });
  }




  send(): void {
    if (!this.messageDraft.trim()) return;

    this.socket.sendMessage({
      roomId: this.roomId,
      message: this.messageDraft,
      senderId: this.myuserid,
    });
    console.log(this.roomId , this.messageDraft , this.myuserid);
    
    this.sendmessage();
    console.log(this.messages());
    this.messageDraft = '';
    this.onStopTyping();
  }

  onTyping(): void {
    if (!this.roomId || this.isTypingSent) {
      return;
    }

    this.socket.emitTyping(this.roomId);
    this.isTypingSent = true;
  }

  onStopTyping(): void {
    if (!this.roomId || !this.isTypingSent) {
      return;
    }

    this.socket.emitStopTyping(this.roomId);
    this.isTypingSent = false;
  }

  ngOnDestroy(): void {
    this.socket.leaveRoom(this.roomId);
    this.socket.disconnect();
    this.subs.forEach((s) => s.unsubscribe());
  }
}
