import { faker } from "@faker-js/faker";

export type Users = {
  name: string;
  email: string;
  imageUrl: string;
  phoneNumber: string;
  designation: string;
  address: string;
  createdAt: Date;
};

export const makeUsers = (): Users => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    imageUrl: faker.image.url(),
    phoneNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    designation: faker.person.jobDescriptor(),
    createdAt: faker.date.anytime(),
  };
};
