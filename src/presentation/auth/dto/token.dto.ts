import { UUID } from 'crypto';

export interface ITokenClaims {
    jti: UUID;
    sub: number;
    userId: UUID;
    userName: string;
    accountId: string;
    authorization: string[];
}
