import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/Contracts/user-entity';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  hide = true
  /**
   *
   */
  constructor(private authService: AuthService ,private router: Router, private userService: UserService, private alertify: AlertifyService) {
    
  }
  
  createuserfirst(firstname: HTMLInputElement,lastname: HTMLInputElement,username: HTMLInputElement, 
    email: HTMLInputElement,
    phoneNumber: HTMLInputElement ,newPassword: HTMLInputElement) {
  const user_entity: UserEntity = new UserEntity();
  user_entity.username = username.value;
  user_entity.email = email.value;
  user_entity.phoneNumber = phoneNumber.value;
  user_entity.password = newPassword.value;
  user_entity.firstName = firstname.value;
  user_entity.lastName = lastname.value;
  user_entity.isNewUser = true;
  this.userService.create(user_entity).subscribe({
  next: (result) => {
    this.authService.storeUserData(result);
    // Başarılı giriş işlemi
    this.router.navigate(['/dashboard']);
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
