import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactSchemaClass, ContactSchemaDocument } from './contacts.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(ContactSchemaClass.name)
    private readonly contactModel: Model<ContactSchemaDocument>,
  ) {}

  async addContact(
    userId: string,
    contactId: string,
    nickname?: string,
  ): Promise<any> {
    const createdContact = new this.contactModel({
      userId,
      contactId,
      nickname,
    });
    console.log(createdContact);
    return await createdContact.save();
  }

  async getContactsByUserId(userId: string): Promise<any> {
    return await this.contactModel.find({ userId }).exec();
  }

  async deleteContact(userId: string, contactId: string): Promise<any> {
    const contact = await this.contactModel
      .findOneAndDelete({ userId, contactId })
      .exec();
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }
}
