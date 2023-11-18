import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType } from '@microsoft/signalr';
import { AuctionEntity } from 'src/app/Contracts/auction-entity';
import { AlertifyService, Position } from 'src/app/services/alertify/alertify.service';
import { AuctionService } from 'src/app/services/auctions/auction.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.scss']
})
export class AuctionDetailComponent implements OnInit{
  @ViewChild('auctionImage') auctionImage?: ElementRef<HTMLImageElement>;
   auctionName?: any;
    currentAuction?:any;
    currentEndTime?: any;
    safeImageUrl?: SafeUrl;
    currentDate?: Date;
    timeOver?: boolean;
    userInfo?: any;
     bids: number[] = [];
    constructor(private router: Router,private alertify: AlertifyService,private authService: AuthService,private sanitizer: DomSanitizer,private route: ActivatedRoute,private auctionService: AuctionService) {}

    ngOnInit() {
        this.auctionName = this.route.snapshot.paramMap.get('name');
        this.getAuctionsWithOrganizationName(this.auctionName);
        this.userInfo = this.authService.getUserData();
        this.auctionService.bids$.subscribe(bid => {
            this.bids.unshift(bid);
            this.currentDate = new Date();
            const currentEndTimeDate = new Date(this.currentEndTime);
            if(currentEndTimeDate < this.currentDate){
              this.timeOver = true;
            }
        });
    }
    goToProfile(): void {
      this.router.navigate(['/profile']);
    }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
    getAuctionsWithOrganizationName(selectedOrganizationName: string): void {
    
    this.auctionService.getAllAuctionsWithInclude(selectedOrganizationName).subscribe((data) => {
      this.currentAuction = data;
      let instantTime = new Date();
      
      console.log(instantTime);
      let auctionEndTime = new Date(this.currentAuction.endTime);
      console.log(auctionEndTime);
      if(auctionEndTime < instantTime){
        this.timeOver = true;
      }
      const unsafeImageUrl = 'data:image/jpeg;base64,' + this.currentAuction.photoBytes;
      this.safeImageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    })
  }

  createBid(userNameInput: HTMLInputElement, bidPriceInput: HTMLInputElement) {
    const userName = userNameInput.value;
    const bidPrice = parseFloat(bidPriceInput.value);

    this.auctionService.createBid(userName, bidPrice, this.currentAuction.auctionId)
      .subscribe({
        next: (result) => {
          console.log("Bid was successful:", result);
        },
        error: (error) => {
          let errorMessage = "An unexpected error occurred.";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          this.alertify.message(errorMessage);
        }
      });
}


  moneyTransfer(){
    const auction_entity: AuctionEntity = new AuctionEntity();
    auction_entity.auctionId = this.currentAuction.auctionId;
    this.auctionService.moneyTransfer(auction_entity).subscribe({
  next: (result) => {
  },
  error: (error) => {
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof HttpErrorResponse) {
      errorMessage = error.error.message || "Invalid username or password.";
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = error.message || String(error);
    }

    
  }
});
  }

}
interface Auction {
    auctionName: string;
}
