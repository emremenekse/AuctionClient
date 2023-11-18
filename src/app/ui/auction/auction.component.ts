import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionEntity } from 'src/app/Contracts/auction-entity';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';
import { AuctionService } from 'src/app/services/auctions/auction.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {
  organizationNameForRequest?: any;
  auctions: any;
  showButton: boolean = false;
  userInfo: any;
  photoBytes?: string;
  constructor(private alertify: AlertifyService,private authService: AuthService,private router: Router,
    private route: ActivatedRoute, private auctionService: AuctionService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      if (name) {
        this.organizationNameForRequest = name;
        this.getAuctionsWithOrganizationName(name);
      }
    });
    this.userInfo = this.authService.getUserData();
      if (this.userInfo) {
      this.showButton = this.userInfo.isSeller;
      }
  }
  goToProfile(): void {
      this.router.navigate(['/profile']);
    }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
  goToAuctionDetail(auctionName: string) {
    this.router.navigate(['/auctionDetail',{ name: auctionName }]);
  }
  createAuction(ProductName: HTMLInputElement , providerUserName: HTMLInputElement,AuctionName: HTMLInputElement
    ,StartPrice: HTMLInputElement, description: HTMLInputElement) {
      const auction_entity: AuctionEntity = new AuctionEntity();
      auction_entity.productName = ProductName.value;
      auction_entity.providerUserName = providerUserName.value;
      auction_entity.auctionName = AuctionName.value;
      auction_entity.lastPrice = Number(StartPrice.value);
      auction_entity.photoBytes = this.photoBytes;
      auction_entity.auctionDescription = description.value;
      this.auctionService.createAuction(auction_entity).subscribe({
  next: (result) => {
    this.getAuctionsWithOrganizationName("");
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

    this.alertify.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    });
  }
})
    }
  getAuctionsWithOrganizationName(selectedOrganizationName: string): void {
    if (!selectedOrganizationName) {
      return;
    }
    this.auctionService.getAuctionsByName(selectedOrganizationName).subscribe((data) => {
      this.auctions = data;
    })
  }
  handleFileInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length) {
    const file = inputElement.files.item(0);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = () => {
        this.photoBytes = reader.result as string; 
      };
      reader.onerror = (error) => {
        console.error('File reading error:', error);
      };
    }
  }
}





}
