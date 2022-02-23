import { Address } from './address.model';
import { Customer } from './customer.model';


export class KYC{
    user: Customer;
    kyc_type:string;
    document_desc:string;
    document_file:string;
}  