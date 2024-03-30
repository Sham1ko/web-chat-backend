import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('/:userId/:contactId')
  async addContact(
    @Param('userId') userId: string,
    @Param('contactId') contactId: string,
    @Body('nickname') nickname?: string,
  ): Promise<any> {
    return await this.contactsService.addContact(userId, contactId, nickname);
  }

  @Get('/:userId')
  async getContactsByUserId(@Param('userId') userId: string): Promise<any[]> {
    return await this.contactsService.getContactsByUserId(userId);
  }

  @Delete('/:userId/:contactId')
  async deleteContact(
    @Param('userId') userId: string,
    @Param('contactId') contactId: string,
  ): Promise<void> {
    const deletedContact = await this.contactsService.deleteContact(
      userId,
      contactId,
    );
    if (!deletedContact) {
      throw new NotFoundException('Contact not found');
    }
  }
}
