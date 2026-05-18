export interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Sales";
}

export interface AuthResponse {
  user: User;
  token: string;
}