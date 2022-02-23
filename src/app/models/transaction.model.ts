import { Address } from './address.model';
import { Customer } from './customer.model';


export class Transaction{
    user: Customer;
    trn_type:string;
    trn_desc:string;
    trn_dt_time:string;
    trn_amt:number;
}