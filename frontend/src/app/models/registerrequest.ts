import { Role } from "./shared/role.model";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}