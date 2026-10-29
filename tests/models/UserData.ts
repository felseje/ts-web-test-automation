import { AddressData as Address } from "@models/AddressData";
import { PersonalData as Personal } from "@models/PersonalData";
import { ContactData as Contact } from "@models/ContactData";

export interface UserData {
  personal: Personal;
  contact: Contact;
  address: Address;
  password: string;
}
