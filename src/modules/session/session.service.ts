import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'src/transformers/model.transformer';
import { SessionModel } from './session.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(SessionModel)
    private readonly sessionModel: ModelType<SessionModel>,
  ) {}

  async create(userId: string, refreshToken: string): Promise<SessionModel> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(refreshToken, salt);

    return this.sessionModel.create({ userId, hash });
  }

  async delete(userId: string): Promise<void> {
    await this.sessionModel.deleteOne({ userId });
  }

  async findSessionByUserId(userId: string): Promise<SessionModel> {
    return this.sessionModel.findOne({ userId });
  }

  async findSessionByRefreshToken(refreshToken: string): Promise<SessionModel> {
    const session = await this.sessionModel.findOne({ hash: refreshToken });

    if (!session) {
      return null;
    }

    return session;
  }
}
