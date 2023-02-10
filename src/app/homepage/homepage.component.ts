import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, ref, set, update, remove,query,orderByChild,equalTo} from '@angular/fire/database';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { getDatabase, onValue} from "firebase/database";
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

interface Item {
  password: string;
}


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  users!: Observable<any[]>;
  constructor(public database: Database, private db: AngularFireDatabase) {
    this.users = db.list('/users').valueChanges();
   }
   
  ngOnInit(): void {


  }


  del(value: any){
    remove(ref(this.database, 'users/' + value));
    alert('Deleted Successfully')
  }

   update(value:any){
 
    update(ref(this.database, 'users/' + value.username), {
       password: value.password
     }); 
    alert('User updated!');
      
  }


  username = '';
  fillForm(username: any) {
    this.username = username;
  }



  password: any;
  itemId: any;

  // Trigger the SweetAlert2 modal on button click
  change(value:any) {
    Swal.fire({
      title: 'Update Password',
      html: `<form #RegisterForm="ngForm" (ngSubmit)="registerUser(RegisterForm.value)">
      <input type="password" ngModel id="password" name="password">
      <input class="btn-new" type="submit" id="saveData" name="Submit" value="Update Password"/>
  </form>`,
      showCancelButton: true,
      confirmButtonText: 'Update'
    }).then((result) => {
      update(ref(this.database, 'users/' + value), {
        password: value.password
      }); 
    });
  }

 




  }





