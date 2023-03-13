import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FormsComponent } from './forms/forms.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ErrorComponent } from './error/error.component';





@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    FormsComponent,
    UserDetailsComponent,
    ErrorComponent,


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
