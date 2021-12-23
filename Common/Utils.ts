import { v4 as uuid } from "uuid";

export function getUserId(): string {
  return 'dummy-userid';
}

export function getGuid() {
  return uuid()
}