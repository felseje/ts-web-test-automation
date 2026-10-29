import { faker } from "@faker-js/faker/locale/pt_BR";
import { generateAddress } from "../factories/address-factory";
import { PersonalData } from "../models/PersonalData";
import { ContactData } from "../models/ContactData";
import { UserData } from "../models/UserData";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SPECIAL = "@#$!%&*";

export function generateUser(): UserData {
  return {
    personal: generatePersonalData(),
    contact: generateContactData(),
    address: generateAddress(),
    password: generatePassword(16)
  };
}

function generatePersonalData(): PersonalData {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date
      .birthdate({ min: 18, max: 65, mode: "age" })
      .toISOString()
      .split("T")[0] // YYYY-MM-DD
  };
}

function generateContactData(): ContactData {
  return {
    phone: faker.phone.number({ style: "human" }).replaceAll(/\D/g, ""),
    email: faker.internet.email()
  };
}

export function generatePassword(length = 12) {
  const required = [UPPER, LOWER, DIGITS, SPECIAL].map((set) =>
    faker.string.fromCharacters(set, 1)
  );
  const rest = faker.string.fromCharacters(
    UPPER + LOWER + DIGITS + SPECIAL,
    Math.max(length - 4, 0)
  );

  return faker.helpers.shuffle([...required, ...rest]).join("");
}
