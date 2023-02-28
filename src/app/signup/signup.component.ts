import { Component, OnInit } from '@angular/core';
import { Database, set, ref, onValue } from '@angular/fire/database';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public database: Database) { }

  ngOnInit(): void {
  }
registerUser(value:any){
  if(value.username == null && value.password == null){
    alert('Empty Username or Password');
  }else {
set(ref(this.database, 'users/' + value.username), {
    username: value.username,
     password: value.password
   }); 
   alert('User created!');
  }
}
}
