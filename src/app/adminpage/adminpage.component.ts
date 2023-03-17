import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, ref, set, update, remove,query,orderByChild,equalTo, push} from '@angular/fire/database';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { getDatabase, onValue} from "firebase/database";
import { Observable } from 'rxjs';


import Swal from 'sweetalert2';

interface Item {
  password: string;
}

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

 
  users!: Observable<any[]>;
  userchat: Observable<any[]>;
  constructor(public database: Database, private db: AngularFireDatabase, private firebase: AngularFireDatabase) {
    this.users = db.list('/users').valueChanges();
    this.userchat = this.db.list('/userchats', ref => ref.orderByChild('uid')).valueChanges();
   }
   
  ngOnInit(): void {


  }

  
  del(value: any){
    remove(ref(this.database, 'users/' + value));
    alert('Deleted Successfully')
  }


  deleteChat(id: any) {
    remove(ref(this.database, 'userchats/' + id));
  }
  chats(payload:any) {
    
    const dbRef = this.firebase.list('/userchats')
    dbRef.push(payload).then(res =>{
     
      payload.id = res.key
      this.firebase.object('/userchats/'+`${payload.id}`).update(payload)
    })
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
