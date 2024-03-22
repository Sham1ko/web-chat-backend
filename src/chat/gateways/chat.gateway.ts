import { Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../services/message/message.service';

@Injectable()
@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageService: MessageService) {}
  @WebSocketServer()
  server: Server;
  private messageHistory: any[] = [];

  async beforeInit(client: Socket) {
    console.log('Initializing socket.io server');
    this.messageHistory = await this.messageService.getMessages();
  }

  afterInit(server: Server) {
    console.log('Socket.io server initialized');
  }

  handleConnection(client: Socket) {
    Logger.log(`Client connected: ${client.id}`, 'ChatGateway');
    this.sendHistoryToClient(client);
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected: ${client.id}`, 'ChatGateway');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: any) {
    console.log(`Received message from client ${client.id}: ${message}`);

    const newMessage = {
      user: message.user,
      text: message.messageInput,
      createdAt: new Date(),
    };

    this.messageHistory.push(newMessage);
    this.messageService.create(newMessage);
    this.server.emit('message', newMessage);
  }

  private async sendHistoryToClient(client: Socket) {
    this.messageHistory = await this.messageService.getMessages();
    client.emit('messageHistory', this.messageHistory);
  }
}
