import { TestBed } from '@angular/core/testing';
import { SocketService } from './socket';

describe('SocketService', () => {
  let service: SocketService;

  class MockSocketService {
    joinRoom(roomId: string): void {}
    leaveRoom(roomId: string): void {}
    sendMessage(payload: any): void {}
    onReceiveMessage(callback: any): void {}
    offReceiveMessage(): void {}
    sendTypingIndicator(roomId: string): void {}
    emitTyping(roomId: string): void {}
    emitStopTyping(roomId: string): void {}
    onIsTyping(callback: any): void {}
    offIsTyping(): void {}
    onIsNotTyping(callback: any): void {}
    offIsNotTyping(): void {}
    disconnect(): void {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SocketService, useClass: MockSocketService }],
    });
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Verify public API matches implementation
  it('should have room methods', () => {
    expect(typeof service.joinRoom).toBe('function');
    expect(typeof service.leaveRoom).toBe('function');
  });

  it('should have messaging methods', () => {
    expect(typeof service.sendMessage).toBe('function');
    expect(typeof service.onReceiveMessage).toBe('function');
    expect(typeof service.offReceiveMessage).toBe('function');
  });

  it('should have typing indicator methods', () => {
    expect(typeof service.sendTypingIndicator).toBe('function');
    expect(typeof service.emitTyping).toBe('function');
    expect(typeof service.emitStopTyping).toBe('function');
    expect(typeof service.onIsTyping).toBe('function');
    expect(typeof service.offIsTyping).toBe('function');
    expect(typeof service.onIsNotTyping).toBe('function');
    expect(typeof service.offIsNotTyping).toBe('function');
  });

  it('should expose disconnect', () => {
    expect(typeof service.disconnect).toBe('function');
  });
});
