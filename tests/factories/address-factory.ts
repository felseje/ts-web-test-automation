import { faker } from "@faker-js/faker/locale/pt_BR";
import { AddressData as Address } from "../models/AddressData";

export function generateAddress(): Address {
  return {
    street: faker.location.street(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: "Brazil",
    postalCode: faker.location.zipCode(),
    houseNumber: faker.location.buildingNumber()
  };
}
