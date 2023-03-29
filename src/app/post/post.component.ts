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
  postID:string = '';
  users!: Observable<any[]>;
  userPost: Observable<any[]>;
  getSession!: null | string;
  selectedValue: any = this.getSession;
  userChat: any;
  showCommentSection = false;
  constructor(public database: Database, private db: AngularFireDatabase, private firebase: AngularFireDatabase) {
    this.users = db.list('/users').valueChanges();
    this.userPost = this.db.list('/post', ref => ref.orderByChild('uid')).valueChanges();
    this.getSession = sessionStorage.getItem('id'); 
   }
  ngOnInit(): void {
  }

  posts(payload:any) {
    
    const dbRef = this.firebase.list('/post')
    dbRef.push(payload).then(res =>{
      payload.id = res.key
      const currentDate = new Date().toString()
      const comment = {
        ...payload,
        date: currentDate,
        username: this.getSession
      }
      this.firebase.object('/post/'+`${payload.id}`).update(comment)
    })
  }
  registerUser(payload:any, newpost:any){
    const dbRef = this.firebase.list('/post/' + newpost + '/comment/')
    const currentDate = new Date().toString()
    const comment = {
      ...payload,
      date: currentDate,
      thepostid: newpost,
      username: this.getSession
    }
    dbRef.push(comment)
   
  }
getComment(postID:any){
  this.userChat = this.db.list('/post/'+ postID + '/comment/', ref => ref.orderByChild('uid')).valueChanges();
  this.showCommentSection = !this.showCommentSection;
}
  


}
