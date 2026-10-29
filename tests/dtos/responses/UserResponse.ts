import { Address } from "./Address";

export interface UserResponse {
  id: string;
  first_name: string;
  last_name: string;
  dob: string; // 'YYYY-MM-DD'
  phone: string;
  email: string;
  address: Address;
  provider: string;
  totp_enabled: boolean;
  enabled: boolean;
  failed_login_attempts: number;
  created_at: string; // ISO 8601
}
