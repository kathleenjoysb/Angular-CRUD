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
    private route:ActivatedRoute) { } 


      ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.api.getData(this.id).subscribe({
          next: (data: any) => {
            this.row = data;
          }
        })
      }


    // getUserByID(id:number){
    // this.api.getUser().subscribe(res=>{
    //   this.userData = res;
    
    // })
    //   }

   }



