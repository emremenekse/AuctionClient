import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/Contracts/user-entity';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';
import { AuctionService } from 'src/app/services/auctions/auction.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  auctions: any;
  userInfo: any;
  activeUserInfo: any;
  hide = true
  /**
   *
   */
  constructor(private userService: UserService,private alertify: AlertifyService,
    private router: Router,private authService: AuthService, private auctionService: AuctionService) {
    
  }
  
    ngOnInit(){ 
      this.userInfo = this.authService.getUserData();
      if (this.userInfo) {
      this.getAuctions();
      this.getAuctionsWithOrganizationName(this.userInfo.userId);
    }
    }
    goToProfile(): void {
      this.router.navigate(['/profile']);
    }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
    balanceAdd(balanceInput: HTMLInputElement, passwordInput: HTMLInputElement): void {
      const user_entity: UserEntity = new UserEntity();
      user_entity.username = this.userInfo.username;
      user_entity.balance = parseFloat(balanceInput.value);
      user_entity.password = passwordInput.value;
      this.userService.addBalance(user_entity).subscribe({
  next: (result) => {
    this.authService.storeUserData(result);
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
  
});

    }
    getAuctions(): void {
    this.auctionService.getAuctionsById(this.userInfo.userId).subscribe((data) => {
      this.auctions = data;
    })
  }
  getAuctionsWithOrganizationName(selectedId: number): void {
    if (!selectedId) {
      return;
    }
    this.userService.getUserById(selectedId).subscribe((data) => {
      this.activeUserInfo = data;
    })
  }
}
