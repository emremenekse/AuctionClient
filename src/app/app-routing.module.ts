import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { ForgetPassComponent } from './ui/forget-pass/forget-pass.component';
import { SignUpComponent } from './ui/sign-up/sign-up.component';
import { FirstComponent } from './ui/first/first.component';

const routes: Routes = [
  { path: '', redirectTo: '/first', pathMatch: 'full' }, // Ana sayfaya yönlendirme
  { path: 'first', component: FirstComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
