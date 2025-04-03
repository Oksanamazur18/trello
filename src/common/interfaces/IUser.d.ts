export interface IUser {
    id: ID;
    email: string | null;
    username?: string | null; // email.split("@")[0]
}