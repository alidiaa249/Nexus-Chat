# 💬 Nexus Chat App

A real-time chat application built with **Angular** and **Socket.IO**, supporting instant messaging, room management, and live typing indicators.

---

## ✨ Features

- 🔌 Real-time WebSocket connection via Socket.IO
- 💬 Instant message sending and receiving
- 🚪 Room management — join and leave chat rooms
- ⌨️ Typing indicators with immediate local feedback
- 📡 Connection state management (connect / disconnect)
- 🧩 Built with RxJS Observables for easy event subscription from any component

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Angular](https://angular.io/) | Frontend Framework |
| [Socket.IO](https://socket.io/) | Real-time Communication |
| [RxJS](https://rxjs.dev/) | Event & stream management |
| TypeScript | Core programming language |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── services/
│   │   └── socket.service.ts    # Handles Socket.IO connection and real-time events
│   ├── models/
│   │   └── payloads.ts          # Interfaces (TypingIndicatorPayload, ReceiveMessagePayload...)
│   └── components/
│       └── chat/                # Chat UI components
├── environments/
│   └── environment.ts           # Server base URL configuration
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [Angular CLI](https://angular.io/cli)
- A running Socket.IO backend server

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd <project-folder>

# 2. Install dependencies
npm install

# 3. Configure the server URL
# Open src/environments/environment.ts and set your backend baseurl
```

```typescript
export const environment = {
  production: false,
  baseurl: 'http://localhost:3000'
};
```

```bash
# 4. Run the app locally
ng serve
```

The app will run at: `http://localhost:4200`

---

## 🔌 SocketService — Overview

The `SocketService` handles all real-time communication with the server and exposes the following methods:

### Connection
```typescript
socketService.connect();
socketService.disconnect();
socketService.isConnected(); // boolean
```

### Rooms
```typescript
socketService.joinRoom({ roomId, userId });
socketService.leaveRoom({ roomId, userId });
```

### Messaging
```typescript
socketService.sendMessage(payload);
socketService.getReceiveMessage().subscribe(msg => {
  console.log('New message:', msg);
});
```

### Typing Indicators
```typescript
socketService.sendTypingIndicator(payload);
socketService.getIsTyping().subscribe(data => { /* show typing indicator */ });
socketService.getIsNotTyping().subscribe(data => { /* hide typing indicator */ });
```

---

## 📡 Socket Events

| Event | Direction | Description |
|---|---|---|
| `joinRoom` | Client → Server | Join a chat room |
| `leaveRoom` | Client → Server | Leave a chat room |
| `sendMessage` | Client → Server | Send a message |
| `receiveMessage` | Server → Client | Receive a new message |
| `typingIndicator` | Client → Server | Notify server of typing state |
| `isTyping` | Server → Client | Notify that a user is typing |
| `isNotTyping` | Server → Client | Notify that a user stopped typing |

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

