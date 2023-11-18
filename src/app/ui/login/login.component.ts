import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/Contracts/user-entity';
import { AlertifyService, MessageType, Position } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true
  /**
   *
   */
  constructor(private authService: AuthService , private router: Router, private userService: UserService, private alertify: AlertifyService) {
    
  }
  
  login(username: HTMLInputElement, password: HTMLInputElement) {
  const user_entity: UserEntity = new UserEntity();
  user_entity.username = username.value;
  user_entity.password = password.value;
  user_entity.isNewUser = false;
  this.userService.create(user_entity).subscribe({
  next: (result) => {
    this.authService.storeUserData(result);
    this.router.navigate(['/dashboard']);
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
}
