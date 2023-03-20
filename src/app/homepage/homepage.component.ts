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
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  users!: Observable<any[]>;
  userchat: Observable<any[]>;
  getSession!: null | string;
  selectedValue: any = this.getSession;
  constructor(public database: Database, private db: AngularFireDatabase, private firebase: AngularFireDatabase) {
    this.users = db.list('/users').valueChanges();
    this.userchat = this.db.list('/userchats', ref => ref.orderByChild('uid')).valueChanges();
    this.getSession = sessionStorage.getItem('id');
   }
  ngOnInit(): void {

  }
  
  del(value: any){
    remove(ref(this.database, 'users/' + value));
    alert('Deleted Successfully')
  }


  deleteChat(id: any) {
    remove(ref(this.database, 'userchats/' + id));
    Swal.fire({
      icon: 'error',
      title: 'Deleted',
    })
  }
  chats(payload:any) {
    
    const dbRef = this.firebase.list('/userchats')
    dbRef.push(payload).then(res =>{
     
      payload.id = res.key
      this.firebase.object('/userchats/'+`${payload.id}`).update(payload)
    })
  }





   update(value:any){
 
    update(ref(this.database, 'users/' + value.username), {
       password: value.password

       
     }); 
     Swal.fire({
      icon: 'success',
      title: 'Updated Successfuly',
    })
      
  }


  username = '';
  fillForm(username: any) {
    this.username = username;
  }



  password: any;
  itemId: any;


 




  }





