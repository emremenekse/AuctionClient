export class UserEntity {
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string; // Şifre asla istemci tarafına açık metin olarak gönderilmemeli
  phoneNumber?: string;
  username?: string;
  balance?: number; // TypeScript'te decimal yerine number kullanılır
  isSeller?: boolean;
  isNewUser?: boolean;
}