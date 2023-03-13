import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  userData !: any;
  id:number;
  row: {id:number;fullName:string; email:string; mobile: string};
  
  constructor(private api : ApiService, 
    private route:ActivatedRoute) { } //activated route helps us to grab that id that is being pass in


      ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.api.getData(this.id).subscribe({
          next: (data: any) => {
            this.row = data;
          }
        })
      }

  //     row: row | undefined; 
      
  //     //when the components first load, there is no user,
  //    // undefined, then when the api gets it then it will show the user details

  // //view user:

    getUserByID(id:number){
    this.api.getUser().subscribe(res=>{
      this.userData = res;
    
    })
      }

   }



