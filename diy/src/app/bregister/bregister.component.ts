import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoggersBService } from "../loggers-b.service";
import { ActivatedRoute,Router } from "@angular/router";


@Component({
  selector: 'app-bregister',
  templateUrl: './bregister.component.html',
  styleUrls: ['./bregister.component.css']
})
export class BRegisterComponent implements OnInit {
bid
private BuserForm:FormGroup
  private Buser:any
  private errorMessage:string
  
  private Busers:any[]

  constructor(private route:ActivatedRoute,private builder:FormBuilder,private service:LoggersBService,private router : Router) {
    this.buildForm()
  }
//userType:any
ngOnInit(){
  this.bid="DIY-"+Math.round(Math.random()*1000000)
  this.service.BfetchUsers((data)=>{
    this.Busers = data

  })
}

buildForm() {
  this.BuserForm = this.builder.group({
    name: ['',Validators.required],
    email: ['',[
      Validators.required,
      Validators.email
    ]
  ],
  mobile:['',Validators.required],
  gender:[''],
  password:['',Validators.required],
  usertype:[''],
  businessid: ['']

  })
}

save(){
  if(this.BuserForm.status !='INVALID'){
    this.Buser={
      name: this.BuserForm.controls['name'].value,
      email: this.BuserForm.controls['email'].value,
      mobile:this.BuserForm.controls['mobile'].value,
      gender:this.BuserForm.controls['gender'].value,
      usertype:this.BuserForm.controls['usertype'].value,
      businessid:this.BuserForm.controls['businessid'].value,
      password:this.BuserForm.controls['password'].value
      
    }
    // Add a new User 
    this.service.BbuildAndCreateUser({ 
      name:this.Buser.name,
      email:this.Buser.email,
      mobile:this.Buser.mobile,
      gender:this.Buser.gender,
      usertype:this.Buser.usertype,
      businessid:this.Buser.businessid,
      password:this.Buser.password
      
    },(err)=>{
      if(err! =null){
        console.log('Unable to Process request')
        // re load users
        this.service.BfetchUsers((users)=>{
          this.Busers = users
        })
      }else{
        // re load users
        this.service.BfetchUsers((users)=>{
          this.Busers = users
        })
      }
    })
  }else{
    this.errorMessage = 'Please verify your errors'
  }
  this.router.navigate(['/blogin'])
}
}