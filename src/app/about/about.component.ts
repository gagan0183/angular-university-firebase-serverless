import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAL4dPIWv25vHyMt5hfYmwvAnQ4rPNQ1Kw',
  authDomain: 'angularuniversity-firebase-app.firebaseapp.com',
  databaseURL: 'https://angularuniversity-firebase-app.firebaseio.com',
  projectId: 'angularuniversity-firebase-app',
  storageBucket: 'angularuniversity-firebase-app.appspot.com',
  messagingSenderId: '524706270307',
  appId: '1:524706270307:web:b08e54bf6daf70a3adfc56'
};

firebase.initializeApp(config);
const db = firebase.firestore();

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // get a single document
    // db.doc('courses/aJLuW51cSZezBam6K0sc').get().then(snap => console.log(snap.data()));
    // get all document for a collection
    db.collection('courses').get().then(snaps => {
      const courses = snaps.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      console.log(courses);
    });
  }
}
