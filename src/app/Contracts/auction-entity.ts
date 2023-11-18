export class AuctionEntity {
  auctionId?: number;
  productId?: number;
  productName?: string;
  providerUserName?: string;
  auctionName?: string;
  lastPrice?: number; 
  startTime?: Date;
  endTime?: Date;
  isCompleted?: boolean;
  winnerUserId?: number;
  photoBytes?: string;
  auctionDescription?: string;
  startPrice?: number;
}