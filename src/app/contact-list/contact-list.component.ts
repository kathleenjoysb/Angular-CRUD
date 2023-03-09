import { Component, OnInit, OnChanges, InputDecorator, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UserModel } from './contact.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

  @Output() editData = new EventEmitter<any>();
  // @Input()

  formValue !: FormGroup
  userData !: any;
  UserModelObj : UserModel = new UserModel();

  // ngOnchanges(simpleChanges : SimpleChanges) {      //needs @Input to work!!
  //   if (this.userData !== undefined){
  //       this.getAllUser();
  //     }
  // }

  constructor(private formbuild: FormBuilder,
    private api : ApiService) {  //activated route helps us to grab that id that is being pass in

      this.getAllUser();
      this.api.Refreshrequired.subscribe(result=>{
        this.getAllUser();
      })
    }

  ngOnInit(): void{
    this.getAllUser();
  }


  getAllUser(){
    this.api.getUser()
    .subscribe(res=>{
      this.userData = res;
    
    })
  }



/////////// delete employee and edit 

  deleteUser(row : any){
    if(confirm("Do you want to remove?")){ this.api.deleteUser(row.id)
    .subscribe(res=>{
      // alert("User Deleted");
      this.getAllUser();
    })
  }
  }


  edit(row : any){
    this.editData.emit({
      id:row.id,
      fullName: row.fullName,
      email: row.email,
      mobile: row.mobile
    })
  }

  
  // Update(){
  //   // this.showAdd=false;
  //   // this.showUpdate=true;
    

  //   this.UserModelObj.fullName = this.formValue.value.fullName;
  //   this.UserModelObj.email = this.formValue.value.email;
  //   this.UserModelObj.mobile = this.formValue.value.mobile;
  
  //   this.api.updateUser(this.UserModelObj,this.UserModelObj.id).subscribe(res=>{
  //   this.formValue.reset();
  //     alert("User details updated!")
  //   },
  //     err=>{
  //       alert("Something went wrong")
  //     }
  //   )

  // }



}
