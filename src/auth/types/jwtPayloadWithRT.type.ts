import { JwtPayloadType } from '.';

export type JwtPayloadWithRT = JwtPayloadType & { refreshToken: string };
