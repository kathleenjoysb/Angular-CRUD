import { NgModule } from '@angular/core'

import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FormsComponent } from './forms/forms.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
    { path: "home", component: ContactListComponent},
    { path: "user/:id", component: UserDetailsComponent}, //UserDetailsComponent
    { path: '', redirectTo:'contactlist', pathMatch:'full'},
    { path: "**", component: ErrorComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
