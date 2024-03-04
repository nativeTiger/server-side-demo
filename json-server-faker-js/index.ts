import { writeFileSync } from "fs";
import { Users, makeUsers } from "./models/users";

const range = (length: number) => {
  const array: number[] = [];
  for (let i = 0; i < length; i++) {
    array.push(i);
  }
  return array;
};

function makeData<T>(createObjects: () => T, length: number): T[] {
  const makeDataLevel = (): T[] => {
    return range(length).map((item): T => {
      return createObjects();
    });
  };
  return makeDataLevel();
}

const mockData = JSON.stringify({
  users: makeData<Users>(makeUsers, 100),
});

writeFileSync("mockData.json", mockData, "utf-8");
