export interface User {
    userid?: number;
    username: string;
    password: string;
    passwordhash?: string;
    role?: string;
    createdat?: Date;
}
