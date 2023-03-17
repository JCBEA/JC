import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, ref, set, update, remove,query,orderByChild,equalTo, push} from '@angular/fire/database';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { getDatabase, onValue} from "firebase/database";
import { Observable } from 'rxjs';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  users!: Observable<any[]>;
  userPost: Observable<any[]>;
  constructor(public database: Database, private db: AngularFireDatabase, private firebase: AngularFireDatabase) {
    this.users = db.list('/users').valueChanges();
    this.userPost = this.db.list('/post', ref => ref.orderByChild('uid')).valueChanges();
   }
  ngOnInit(): void {
  }

  posts(payload:any) {
    
    const dbRef = this.firebase.list('/post')
    dbRef.push(payload).then(res =>{
  
      payload.id = res.key
      this.firebase.object('/post/'+`${payload.id}`).update(payload)
    })
  }

}
