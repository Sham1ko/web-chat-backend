import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Body,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ContactsType } from './contacts.type';
import { Request } from 'express';
import { JwtPayload } from '../auth/types';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('/:contactId')
  @UseGuards(AuthGuard('jwt'))
  async addContact(
    @Req() req: Request,
    @Param('contactId') contactId: string,
  ): Promise<any> {
    const userId = (req.user as JwtPayload).id;

    const contacts = await this.contactsService.getContactsByUserId(userId);

    const contactExists = contacts.some(
      (contact) => contact.contactId === contactId,
    );

    if (contactExists) {
      throw new NotFoundException('Contact already exists');
    } else if (userId === contactId) {
      throw new NotFoundException('Cannot add yourself as a contact');
    }

    return await this.contactsService.addContact(userId, contactId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getContactsByUserId(@Req() req: any): Promise<ContactsType[]> {
    const userId = (req.user as JwtPayload).id;
    return this.contactsService.getContactsByUserId(userId);
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
