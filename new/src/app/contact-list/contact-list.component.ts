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
  @Input() data; //*

  formValue !: FormGroup
  userData !: any;
  UserModelObj : UserModel = new UserModel();


  constructor(private formbuild: FormBuilder,
    private api : ApiService) {  

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


  deleteUser(row : any){
    if(confirm("Do you want to remove?")){ this.api.deleteUser(row.id)
    .subscribe(res=>{
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


}
