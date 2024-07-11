import { UserBase } from "./IUserBase.model";
export interface User extends UserBase {
    id?: string;
    name: string;
    lastName: string;
    token?: string;
}