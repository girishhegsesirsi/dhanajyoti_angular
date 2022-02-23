import { Address } from './address.model';


export class Customer{
    cust_id ?: number
    fname: string;
    lname:string;
    dob : Date;
    address: Address;
    email :string;
    mobile : number;
    adhaar: number;
    pan:string;
    username: string;
    password:string;
    role:string;
    user_status?:string;
}