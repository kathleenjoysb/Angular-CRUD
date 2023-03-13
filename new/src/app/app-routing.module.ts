import { NgModule } from '@angular/core'

import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FormsComponent } from './forms/forms.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
    { path: "home", component: FormsComponent},
    { path: "user/:id", component: UserDetailsComponent},
    { path: '', redirectTo:'home', pathMatch:'full'},
    { path: "**", component: ErrorComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
