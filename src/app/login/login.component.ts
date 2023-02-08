import { Component, OnInit } from '@angular/core';
import { Database,ref,set, onValue } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public database: Database, private route: Router) { }

  ngOnInit(): void {
  }
  login(value: any){

    const starCountRef = ref(this.database, 'users/' + value.username);
   onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();  

    if (data.password == value.password){
    this.route.navigate(['/Home'])
    }else{
     alert('Wrong Username or Password');
    }
    }); 
   
  }
}


