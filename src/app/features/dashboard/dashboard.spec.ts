import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from '../../core/services/user';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

import { Dashboard } from './dashboard';
import { SocketService } from '../../core/services/socket';

// Mock services
class UserServiceStub {
  getusers() {
    return of([]);
  }

  getmessages() {
    return of({
      messages: [
        {
          _id: 'msg-1',
          roomId: 'room-1',
          content: 'hello',
          senderId: 'me',
          receiverId: 'you',
          createdAt: 'now',
          updatedAt: 'now',
          __v: 0,
        },
      ],
    });
  }
}

class AuthServiceStub {
  refreshToken() {
    return of({ accessToken: 'test' });
  }
  logout() {
    return of({});
  }
}

class SocketServiceStub {
  emitTyping(_roomId: string) {}
  emitStopTyping(_roomId: string) {}
  sendMessage(_payload: unknown) {}
  joinRoom(_roomId: string) {}
  leaveRoom(_roomId: string) {}
  onReceiveMessage() {
    return of();
  }
  onIsTyping() {
    return of();
  }
  onIsNotTyping() {
    return of();
  }
}

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        { provide: User, useClass: UserServiceStub },
        { provide: Auth, useClass: AuthServiceStub },
        { provide: SocketService, useClass: SocketServiceStub },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mobile nav', () => {
    expect(component.isMobileNavOpen()).toBeFalse();
    component.toggleMobileNav();
    expect(component.isMobileNavOpen()).toBeTrue();
    component.toggleMobileNav();
    expect(component.isMobileNavOpen()).toBeFalse();
  });

  it('should toggle theme', () => {
    expect(component.isDarkMode()).toBeFalse();
    component.toggleTheme();
    expect(component.isDarkMode()).toBeTrue();
    component.toggleTheme();
    expect(component.isDarkMode()).toBeFalse();
  });

  it('should load room messages into the signal state', () => {
    component.getroommessage('room-1');

    expect(component.messages()).toEqual([
      jasmine.objectContaining({ _id: 'msg-1', content: 'hello' }),
    ]);
  });

  it('should emit typing and stop typing based on composer input', () => {
    const socket = TestBed.inject(SocketService);
    const emitTypingSpy = spyOn(socket, 'emitTyping');
    const emitStopTypingSpy = spyOn(socket, 'emitStopTyping');

    component.roomId = 'room-1';
    component.messageDraft = 'hello';
    component.onTyping();
    expect(emitTypingSpy).toHaveBeenCalledWith('room-1');

    component.messageDraft = '';
    component.onStopTyping();
    expect(emitStopTypingSpy).toHaveBeenCalledWith('room-1');
  });
});
