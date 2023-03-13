import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from './form.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {

  isUpdating = false;
  formValue !: FormGroup
  userData !:any;
  UserModelObj : UserModel = new UserModel();


  showAdd !: boolean;
  showUpdate !: boolean;


  // @Input() usersData : any;
  ngOnchanges(simpleChanges : SimpleChanges) {      //needs @Input to work!!
    if (this.userData !== undefined){  
        this.getAllUser();
      }
  }


  constructor(private formbuild: FormBuilder,
    private api : ApiService) { }


  ngOnInit(): void{
    this.showAdd=true;
    this.showUpdate=false;
    this.formValue = this.formbuild.group({
      fullName : ['', Validators.required], //Validators.required so that if one is empty it won't submit
      email : ['',Validators.compose([Validators.required, Validators.email])],
      mobile : ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])]
    })
    // this.getUsers();
  }

  postUserDetails(){

    this.UserModelObj.fullName = this.formValue.value.fullName;
    this.UserModelObj.email = this.formValue.value.email;
    this.UserModelObj.mobile = this.formValue.value.mobile;
  
    this.api.postUser(this.UserModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("User Added Successfully!")
      this.formValue.reset();
      this.getUsers(); //has problem with connecting form to the list/table
      //since when posting the user it don't connect to the table
      //so how????
   
    },
    err=>{
      alert("Something Went Wrong");
    })

  }

  getUsers(){
    this.api.getUser()
    .subscribe(res=>{
      this.userData = res;
    })
  }



  editItem(row : any){
    this.showAdd = false;
    this.showUpdate = true;

    this.isUpdating = true;

    console.log(row)
    this.UserModelObj.id = row.id; //newwwwww

    this.formValue.controls['fullName'].setValue(row.fullName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);

    this.api.updateUser(row, row.id);
    this.getAllUser();
    this.isUpdating = false;
  }


  editData(){
    this.UserModelObj.fullName = this.formValue.value.fullName;
    this.UserModelObj.email = this.formValue.value.email;
    this.UserModelObj.mobile = this.formValue.value.mobile;

    this.api.updateUser(this.UserModelObj,this.UserModelObj.id).subscribe(res=>{
        console.log(res);
          alert("User details updated!")
          this.formValue.reset();
          //newwww
        },
          err=>{
            alert("Something went wrong")
          }
        )
  }

  getAllUser(){
    this.api.getUser()
    .subscribe(res=>{
      this.userData = res;
    
    })
  }

}
