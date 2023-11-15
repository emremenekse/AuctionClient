import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from 'src/app/services/auctions/auction.service';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.scss']
})
export class AuctionDetailComponent implements OnInit{
   auctionName: any;
    currentAuction:any;
    constructor(private route: ActivatedRoute,private auctionService: AuctionService) {}

    ngOnInit() {
        this.auctionName = this.route.snapshot.paramMap.get('name');
        this.getAuctionsWithOrganizationName(this.auctionName);
    }

    getAuctionsWithOrganizationName(selectedOrganizationName: string): void {
    
    this.auctionService.getAllAuctionsWithInclude(selectedOrganizationName).subscribe((data) => {
      const matchedData = data.find((auction: Auction) => auction.auctionName === this.auctionName)
      this.currentAuction = matchedData;
    })
  }


}
interface Auction {
    auctionName: string;
    // Diğer gerekli özellikler...
}
