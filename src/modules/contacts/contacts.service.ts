import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactModel } from './contacts.model';
import { InjectModel } from 'src/transformers/model.transformer';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserService } from '../user/user.service';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(ContactModel)
    private readonly contactModel: ReturnModelType<typeof ContactModel>,
    private readonly userService: UserService,
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
    return await createdContact.save();
  }

  async getContactsByUserId(userId: string): Promise<any> {
    const contacts = await this.contactModel.find({ userId }).lean();

    for (let i = 0; i < contacts.length; i++) {
      const contact: any = contacts[i];
      const contactId = contact.contactId;
      const user = await this.userService.findOne(
        { _id: contactId },
        '-createdAt',
      );
      contacts[i] = { ...contact, contact: user };
    }

    return contacts;
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
