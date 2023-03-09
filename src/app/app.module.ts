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
// import { ErrorModule } from './error/error.module';
import { RouterModule, Routes } from '@angular/router';


// const routes: Routes = [
//   // { path: '', redirectTo:'contactlist', pathMatch:'full'},
//   { path: "home", component: FormsComponent},
//   { path: "user/:id", component: UserDetailsComponent}, //UserDetailsComponent
 
//   { path: "**", component: ErrorComponent}, //404ERROR
// ];

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
    // ErrorModule,
    AppRoutingModule,
    // [RouterModule.forRoot(routes)],
  ],
  // exports: [RouterModule], //from app-routing module
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
