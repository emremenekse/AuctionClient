import { Injectable } from '@angular/core';
import { HttpClientServiceService } from '../http-client-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserEntity } from 'src/app/Contracts/user-entity';
import { Observable, Subject, catchError, from, throwError } from 'rxjs';
import { OrganizationEntity } from 'src/app/Contracts/organization-entity';
import { AuctionEntity } from 'src/app/Contracts/auction-entity';
import * as signalR from "@microsoft/signalr";
import { AlertifyService, MessageType, Position } from '../alertify/alertify.service';
@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private hubConnection?: signalR.HubConnection;
  private bids = new Subject<number>();
    bids$ = this.bids.asObservable();

    
  constructor(private alertify: AlertifyService, private httpClientService: HttpClientServiceService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7120/bidHub")
            .build();

        this.hubConnection.start()
        .catch(err => console.error('Error while establishing connection: ', err));



        this.hubConnection.on("ReceiveBid", (bid: number) => {
            this.bids.next(bid);
        });

        this.hubConnection.on('ReceiveError', (errorMessage: string) => {
    
    console.error('Error from server:', errorMessage);
    
    this.alertify.message(errorMessage);
    this.alertify.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    });
});
   }


  createBid(userName: string, bid: number, auctionId: number): Observable<any> {
    if (!this.hubConnection) {
        return throwError(() => new Error("Hub connection is not established."));
    }

    const promise = this.hubConnection.invoke("SendMessageAsync", userName, bid, auctionId);
    return from(promise).pipe(
        catchError(error => {
            
            return throwError(error);
        })
    );
}

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

moneyTransfer(auction: AuctionEntity): Observable<any> {
  return this.httpClientService.post({
    controller: "auction",
    action: "moneyTransfer"
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

