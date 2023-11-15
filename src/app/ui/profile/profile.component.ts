import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { AuctionService } from 'src/app/services/auctions/auction.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  auctions: any;
  userInfo: any;
  /**
   *
   */
  constructor(private alertify: AlertifyService,private router: Router,private authService: AuthService, private auctionService: AuctionService) {
    
  }
    ngOnInit(){ 
      this.userInfo = this.authService.getUserData();
      if (this.userInfo) {
      // userInfo içinde isAdmin özelliğini kontrol et
      this.getAuctions();
    }
    }

    getAuctions(): void {
    this.auctionService.getAuctionsById(this.userInfo.userId).subscribe((data) => {
      this.auctions = data;
    })
  }
}
