import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseComponent } from './purchase/purchase.component';
import { BudgetComponent } from './budget/budget.component';
import { DayCalendarComponent } from './day-calendar/day-calendar.component';
import { PurchaseService } from './purchase.service';
import { ApiService } from './api.service';
import { SignUpComponent } from './auth/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    PurchaseComponent,
    BudgetComponent,
    DayCalendarComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    PurchaseService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
