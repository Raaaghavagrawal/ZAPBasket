export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // hashed in production
};

export const users: User[] = [];

export function addUser(user: User) {
  users.push(user);
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function validateUser(email: string, password: string): User | undefined {
  return users.find((u) => u.email === email && u.password === password);
} 