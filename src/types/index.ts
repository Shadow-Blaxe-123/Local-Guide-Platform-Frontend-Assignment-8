export type UserRole = "TOURIST" | "GUIDE" | "ADMIN";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
