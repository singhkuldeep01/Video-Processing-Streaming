export interface SignupRequestType {
    username: string;
    email: string;
    password: string;
}

export interface SigninRequestType {
    email: string;
    password: string;
    deviceInfo?: string;
    ipAddress?: string;
}

export interface CreateRefreshTokenPayloadType {
    id: string;
    userId: string;
    deviceInfo?: string;
    ipAddress?: string;
    expiresAt: Date;
}


