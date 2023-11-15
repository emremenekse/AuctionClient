import { Injectable } from '@angular/core';
import { HttpClientServiceService } from '../http-client-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserEntity } from 'src/app/Contracts/user-entity';
import { Observable, catchError, throwError } from 'rxjs';
import { OrganizationEntity } from 'src/app/Contracts/organization-entity';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpClientService: HttpClientServiceService) { }

  createOrganization(organization: OrganizationEntity): Observable<any> {
  return this.httpClientService.post({
    controller: "organization",
    action: "createorganization"
  }, organization).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An unexpected error occurred.';
  if (errorResponse.error) {
    errorMessage = errorResponse.error.error || errorResponse.message;
  }
  return throwError(() => new Error(errorMessage));
})
  );
}

getOrganization(): Observable<any> {
  return this.httpClientService.get({
    controller:"organization",
    action: "getorganizations"
  })
}


}

