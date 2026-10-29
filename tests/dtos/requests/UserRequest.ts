import { AddressRequest } from "../../dtos/requests/AddressRequest";

export interface UserRequest {
  first_name: string;
  last_name: string;
  dob: string; // 'YYYY-MM-DD'
  phone: string;
  email: string;
  password: string;
  address: AddressRequest;
}
