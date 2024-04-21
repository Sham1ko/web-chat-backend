import { Inject, Provider } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { Connection } from 'mongoose';
import {
  DB_CONNECTION_TOKEN,
  DB_MODEL_TOKEN_SUFFIX,
} from 'src/constants/system.contants';

export interface TypegooseClass {
  new (...args: any[]): any;
}

export function getModelToken(modelName: string): string {
  return modelName + DB_MODEL_TOKEN_SUFFIX;
}

export function getProviderByTypegooseClass(
  typegooseClass: TypegooseClass,
): Provider {
  return {
    provide: getModelToken(typegooseClass.name),
    useFactory: (connection: Connection) =>
      getModelForClass(typegooseClass, { existingConnection: connection }),
    inject: [DB_CONNECTION_TOKEN],
  };
}

// Model injecter
export function InjectModel(model: TypegooseClass) {
  return Inject(getModelToken(model.name));
}
