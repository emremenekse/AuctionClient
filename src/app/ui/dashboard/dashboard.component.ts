import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationEntity } from 'src/app/Contracts/organization-entity';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrganizationService } from 'src/app/services/organizations/organization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  organizations: any;
  userInfo: any;
  showButton: boolean = false;
  /**
   *
   */
  constructor(private alertify: AlertifyService,private router: Router,private authService: AuthService, private orgService: OrganizationService) {
    
  }
    ngOnInit(){ 
      this.userInfo = this.authService.getUserData();
      if (this.userInfo) {
      // userInfo içinde isAdmin özelliğini kontrol et
      this.showButton = this.userInfo.isAdmin;
      this.getOrganization();
    }
    }
    
    goToProfile(): void {
      this.router.navigate(['/profile']);
    }
    async goToDetails(organizationName: string): Promise<any> {
    await this.router.navigate(['/auction'], { queryParams: { name: organizationName } });
}


  getOrganization(): void {
    this.orgService.getOrganization().subscribe((data) => {
      this.organizations = data;
    })
  }

  createOrganization(organizationName: HTMLInputElement , adminUserName: HTMLInputElement) {
    const user_entity: OrganizationEntity = new OrganizationEntity();
    user_entity.name = organizationName.value;
    user_entity.adminUserName = adminUserName.value;  
    this.orgService.createOrganization(user_entity).subscribe({
  next: (result) => {
    // Başarılı giriş işlemi
    this.getOrganization();
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
});
  }

}
