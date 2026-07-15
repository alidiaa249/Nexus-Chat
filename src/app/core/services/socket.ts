import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

interface MessagePayload {
  roomId: string;
  message: string;
  senderId: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private readonly SERVER_URL = environment.baseurl; // غيّرها بـ url السيرفر بتاعك

  constructor() {
    this.connect();
  }

  // فتح الاتصال
  private connect(): void {
    this.socket = io(this.SERVER_URL, {
      transports: ['websocket', 'polling', 'flashsocket', 'webtransport'], // لو محتاج تستخدم transport معين
      // لو محتاج تبعت token للـ auth
      // auth: { token: 'your_token' }
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server:', this.socket.id);
    });

    this.socket.on('disconnect', (reason: string) => {
      console.log('❌ Disconnected:', reason);
    });

    this.socket.on('connect_error', (err) => {
      console.error('🔴 Connection error:', err.message);
    });

    this.socket.onAny((eventName, ...args) => {
      console.log('📩 Event received:', eventName, args);
    });
  }

  // ================= Room Management =================
  joinRoom(roomId: string): void {
    if (this.socket.connected) {
      this.socket.emit('joinRoom', roomId);
      console.log('Joined room:', roomId);
    } else {
      this.socket.once('connect', () => {
        this.socket.emit('joinRoom', roomId);
      });
    }
  }

  leaveRoom(roomId: string): void {
    this.socket.emit('leaveRoom', roomId);
    console.log('Left room:', roomId);
  }

  // ================= Messaging =================
  sendMessage(payload: MessagePayload): void {
    this.socket.emit('sendMessage', payload);
    console.log('Message sent:', payload);
  }

  onReceiveMessage(callback: (data: MessagePayload) => void): void {
    this.socket.on('receiveMessage', callback);
    console.log('work', callback);
  }

  offReceiveMessage(): void {
    this.socket.off('receiveMessage');
  }
  // ================= Typing Indicators =================
  sendTypingIndicator(roomId: string): void {
    this.socket.emit('typingIndicator', { roomId });
    console.log('Typing indicator sent for room:', roomId);
  }

  // ================= Typing Indicators =================
  emitTyping(roomId: string): void {
    this.socket.emit('typingIndicator', { roomId });
    console.log('Typing indicator emitted for room:', roomId);
  }

  emitStopTyping(roomId: string): void {
    this.socket.emit('notTyping', { roomId });
    console.log('Stop typing indicator emitted for room:', roomId);
  }

  onIsTyping(callback: (data: any) => void): void {
    this.socket.on('isTyping', (data) => {
      console.log(data);
      callback(data);
    });
  }
  offIsTyping(): void {
    this.socket.off('isTyping');
  }

  onIsNotTyping(callback: (data: any) => void): void {
    this.socket.on('isNotTyping', (data) => {
      callback(data);
    });
  }

  offIsNotTyping(): void {
    this.socket.off('isNotTyping');
  }

  // قفل الاتصال يدوي لو محتاج
  disconnect(): void {
    this.socket.disconnect();
  }
}
