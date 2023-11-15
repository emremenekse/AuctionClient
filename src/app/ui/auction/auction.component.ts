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
  constructor(private alertify: AlertifyService,private authService: AuthService,private router: Router,
    private route: ActivatedRoute, private auctionService: AuctionService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      if (name) {
        this.organizationNameForRequest = name;
        // Doğru zamanda istek atmak için burada çağır
        this.getAuctionsWithOrganizationName(name);
      }
    });
    this.userInfo = this.authService.getUserData();
      if (this.userInfo) {
      // userInfo içinde isAdmin özelliğini kontrol et
      this.showButton = this.userInfo.isSeller;
      }
  }
  goToAuctionDetail(auctionName: string) {
    this.router.navigate(['/auctionDetail',{ name: auctionName }]);
  }
  createAuction(ProductName: HTMLInputElement , providerUserName: HTMLInputElement,AuctionName: HTMLInputElement
    ,StartPrice: HTMLInputElement) {
      const auction_entity: AuctionEntity = new AuctionEntity();
      auction_entity.productName = ProductName.value;
      auction_entity.providerUserName = providerUserName.value;
      auction_entity.auctionName = AuctionName.value;
      auction_entity.lastPrice = Number(StartPrice.value);
      this.auctionService.createAuction(auction_entity).subscribe({
  next: (result) => {
    // Başarılı giriş işlemi
    this.getAuctionsWithOrganizationName("");
  },
  error: (error) => {
    // Hata mesajını güvenli bir şekilde yakalayıp gösterme
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof HttpErrorResponse) {
      // Backend hata döndürdü, hata mesajını kontrol et
      errorMessage = error.error.message || "Invalid username or password.";
    } else if (error.error instanceof ErrorEvent) {
      // Client-side veya network hatası oluştu
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Diğer türden bir hata oluştu
      errorMessage = error.message || String(error);
    }

    // Alertify ile hata mesajını göster
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
}
