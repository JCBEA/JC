import { Component, OnInit } from '@angular/core';
import { Database,ref,set, onValue } from '@angular/fire/database';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(public database: Database, private route: Router) { }

  ngOnInit(): void {
  }
  
  login(value: any){

    const starCountRef = ref(this.database, 'admin/' + value.username);
   onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();  

    if (data.password == value.password){
    this.route.navigate(['/admin'])
    }else{
     alert('Wrong Username or Password');
    }
    }); 
    
   
  }

}
