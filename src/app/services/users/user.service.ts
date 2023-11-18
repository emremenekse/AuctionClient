import { Injectable } from '@angular/core';
import { HttpClientServiceService } from '../http-client-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserEntity } from 'src/app/Contracts/user-entity';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientServiceService) { }
  

  addBalance(user: UserEntity): Observable<any> {
 return this.httpClientService.post({
    controller: "users",
    action: "addbalance"
  }, user).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An unexpected error occurred.';
  if (errorResponse.error) {
    errorMessage = errorResponse.error.error || errorResponse.message;
  }
  return throwError(() => new Error(errorMessage));
})
  );
}



  create(user: UserEntity): Observable<any> {
  return this.httpClientService.post({
    controller: "users",
    action: "createuser"
  }, user).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An unexpected error occurred.';
  if (errorResponse.error) {
    errorMessage = errorResponse.error.error || errorResponse.message;
  }
  return throwError(() => new Error(errorMessage));
})
  );
}

getUserById(userId: any): Observable<any> {
  return this.httpClientService.get({
    controller:"users",
    action: "GetIdUser"
  },userId)
}


}

