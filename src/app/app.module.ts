import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule
    ,UiModule, BrowserAnimationsModule,MatToolbarModule,MatButtonModule,MatDividerModule,MatIconModule,AppRoutingModule
  ],
  providers: [{provide: "baseUrl", useValue: "https://localhost:7120/api", multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
