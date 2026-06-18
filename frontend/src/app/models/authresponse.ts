import { Role } from "./shared/role.model";

export interface AuthResponse {
  token: string;
  role: Role;
}