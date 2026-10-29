import type { AddressData } from "@models/AddressData";
import type { AddressRequest } from "@dtos/requests/AddressRequest";

export function toAddressRequest(address: AddressData): AddressRequest {
  return {
    street: address.street,
    city: address.city,
    state: address.state,
    country: address.country,
    postal_code: address.postalCode,
    house_number: address.houseNumber
  };
}
