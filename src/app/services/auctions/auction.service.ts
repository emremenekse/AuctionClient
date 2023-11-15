import { Injectable } from '@angular/core';
import { HttpClientServiceService } from '../http-client-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserEntity } from 'src/app/Contracts/user-entity';
import { Observable, catchError, throwError } from 'rxjs';
import { OrganizationEntity } from 'src/app/Contracts/organization-entity';
import { AuctionEntity } from 'src/app/Contracts/auction-entity';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private httpClientService: HttpClientServiceService) { }

  createAuction(auction: AuctionEntity): Observable<any> {
  return this.httpClientService.post({
    controller: "auction",
    action: "createauction"
  }, auction).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An unexpected error occurred.';
  if (errorResponse.error) {
    errorMessage = errorResponse.error.error || errorResponse.message;
  }
  return throwError(() => new Error(errorMessage));
})
  );
}

getAuctions(): Observable<any> {
  return this.httpClientService.get({
    controller:"auction",
    action: "getallauctions"
  })
}
getAllAuctionsWithInclude(auctionName: any): Observable<any> {
  return this.httpClientService.get({
    controller:"auction",
    action: "getAllAuctionsWithInclude"
  },auctionName)
}
getAuctionsById(userId: any): Observable<any> {
  return this.httpClientService.get({
    controller:"auction",
    action: "GetAuctionsById"
  },userId)
}
getAuctionsByName(currentOrganizationName?: any): Observable<any> {
  return this.httpClientService.get({
    controller:"auction",
    action: "GetAuctionsByName"
  },currentOrganizationName)
}
}

