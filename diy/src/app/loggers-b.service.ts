import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LoggersBService {

  private _url:string = 'http://localhost:4200'
  constructor(private http:HttpClient){ }

  BfetchUsers(callback) {
    // fetch data from backend /server side
    this.http
    .get(this._url+'/Busers')
    .subscribe(data=>{
      callback(data)
    },error=>{
      console.log('Unable to load data ',error)
    })
    //return users
 }
  BgetMaxId(callback){
    this.http
    .get(this._url+'/Buser/find/id/max')
    .subscribe(data=>{
      callback(data)
    },error=>{
      console.log('Unable to Process the request: '+error)
    })
   }

  BcreateUser(userObj:any,callback){
    this.http
    .post(this._url+'/Buser/add',userObj).subscribe(response=>{
      callback(null)
    },error=>{
      console.log('error: ' +error)
      callback(error)
    })
   }
   BbuildAndCreateUser(Buser:any,callback){
    this.BgetMaxId((data)=>{
      // build user object
      let BuserObj:any ={
        _id: parseInt(data.maxId) + 1,
        name: Buser.name,
        email: Buser.email,
        mobile:Buser.mobile,
        gender:Buser.gender,
        user_type:Buser.user_type,
        password:Buser.password
      }
      this.BcreateUser(BuserObj,(err)=>{
        console.log('error '+err)
        callback(err)
      })
    })
   }
  }
  

