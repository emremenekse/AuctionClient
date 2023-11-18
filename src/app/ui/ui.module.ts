import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FirstComponent } from './first/first.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ProfileComponent } from './profile/profile.component';
import { AuctionComponent } from './auction/auction.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
const uiRoutes: Routes = [
  { path: 'first', component: FirstComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgetpass', component: ForgetPassComponent },
  { path: 'signup', component: SignUpComponent },
  {path:"dashboard", component: DashboardComponent},
  {path:"profile", component: ProfileComponent},
  {path:"auction", component: AuctionComponent},
  {path:"auctionDetail", component: AuctionDetailComponent},
];

@NgModule({
  declarations: [
    LoginComponent,
    ForgetPassComponent,
    SignUpComponent,
    FirstComponent,
    DashboardComponent,
    ProfileComponent,
    AuctionComponent,
    AuctionDetailComponent
  ],
  imports: [
    CommonModule,HttpClientModule ,MatToolbarModule,MatCardModule,MatGridListModule,MatButtonModule,MatInputModule,MatDividerModule,MatIconModule,RouterModule.forChild(uiRoutes)
  ],
  exports: [
    RouterModule  
  ]
  
})
export class UiModule { }
