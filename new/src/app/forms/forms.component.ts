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



  constructor(private formbuild: FormBuilder,
    private api : ApiService) { }


  ngOnInit(): void{
    this.showAdd=true;
    this.showUpdate=false;
    this.formValue = this.formbuild.group({
      fullName : ['', Validators.required], //Validators.required so that if one is empty it won't submit
      email : ['',Validators.compose([Validators.required, Validators.email])],
      mobile : ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("[0-9]{11}")])]
    })

  }

  ngOnchanges(simpleChanges : SimpleChanges) {      
    if (this.userData !== undefined){  
        this.getUsers();
      }
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
      this.getUsers(); 
   
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
    console.log(this.userData);
  }

  add(){
    this.showAdd=true;
    this.showUpdate=false;
  }

  editItem(row : any){
    this.showAdd = false;
    this.showUpdate = true;

    this.isUpdating = true;

    console.log(row)
    this.UserModelObj.id = row.id; 

    this.formValue.controls['fullName'].setValue(row.fullName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);

    this.api.updateUser(row, row.id);
    this.getUsers();
    this.isUpdating = false;
  }


  editData(){

  }

update(){
  this.UserModelObj.fullName = this.formValue.value.fullName;
  this.UserModelObj.email = this.formValue.value.email;
  this.UserModelObj.mobile = this.formValue.value.mobile;

  this.api.updateUser(this.UserModelObj,this.UserModelObj.id).subscribe(res=>{
      console.log(res);
        alert("User details updated!")
        this.getUsers();
        this.api.Refreshrequired.next(this.add());
        this.formValue.reset();
      },
        err=>{
          alert("Something went wrong")
        }
      )
}


}
