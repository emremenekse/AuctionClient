import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AuctionClient';

  /**
   *
   */
  constructor(private router: Router) {
    
  }
  goToProfile(): void {
      this.router.navigate(['/profile']);
    }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
