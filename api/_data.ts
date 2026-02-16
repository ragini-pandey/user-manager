export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export const users: User[] = [
  { id: 1, firstName: 'Alice', lastName: 'Johnson', phone: '+1-555-0101', email: 'alice.johnson@example.com' },
  { id: 2, firstName: 'Bob', lastName: 'Smith', phone: '+1-555-0102', email: 'bob.smith@example.com' },
  { id: 3, firstName: 'Charlie', lastName: 'Brown', phone: '+1-555-0103', email: 'charlie.brown@example.com' },
];

export let nextId = 4;

export function getNextId() {
  return nextId++;
}
