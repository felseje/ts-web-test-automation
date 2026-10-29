import type { UserData } from "@models/UserData";
import type { UserRequest } from "@dtos/requests/UserRequest";
import { toAddressRequest } from "./address-mapper";

export function toUserRequest(user: UserData): UserRequest {
  return {
    first_name: user.personal.firstName,
    last_name: user.personal.lastName,
    dob: user.personal.dateOfBirth,
    email: user.contact.email,
    phone: user.contact.phone,
    password: user.password,
    address: toAddressRequest(user.address)
  };
}
