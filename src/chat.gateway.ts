import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private messageHistory: any[] = [];

  afterInit(server: Server) {
    console.log('Socket.io server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.sendHistoryToClient(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string) {
    console.log(`Received message from client ${client.id}: ${message}`);

    const newMessage = {
      sender: client.id,
      content: message,
    };

    this.messageHistory.push(newMessage);
    this.server.emit('message', newMessage);
  }

  private sendHistoryToClient(client: Socket) {
    client.emit('messageHistory', this.messageHistory);
  }
}
