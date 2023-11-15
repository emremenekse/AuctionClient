export class AuctionEntity {
  auctionId?: number;
  productId?: number;
  productName?: string;
  providerUserName?: string;
  auctionName?: string;
  lastPrice?: number; // TypeScript'te `decimal` tipi yoktur, bu yüzden `number` kullanılır
  startTime?: Date;
  endTime?: Date;
  isCompleted?: boolean;
  winnerUserId?: number; // "?" ile bu alanın isteğe bağlı olduğunu belirtiriz, yani `null` veya `undefined` olabilir
}