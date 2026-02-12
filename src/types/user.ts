export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  [key: string]: unknown; // allows extensible fields
}

