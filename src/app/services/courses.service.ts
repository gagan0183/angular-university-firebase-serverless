import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map, first} from "rxjs/operators";
import { Course } from '../model/course';
import {Observable} from 'rxjs';
import { convertSnaps } from './utility'; 
import { OrderByDirection } from 'firestore';
import { Lesson } from '../model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  loadAllCourses(): Observable<Course[]> {
    return this.db.collection('courses').snapshotChanges().pipe(map(snaps => convertSnaps<Course>(snaps)));
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.collection('courses', ref => ref.where('url', '==', courseUrl))
                    .snapshotChanges()
                    .pipe(map(snaps => {
                      const courses = convertSnaps<Course>(snaps);
                      console.log(courses);
                      return courses.length === 1 ? courses[0] : undefined;
                    }), first());
  }

  findLessons(courseId: string, sortOrder: OrderByDirection = 'asc', pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
    return this.db.collection(`courses/${courseId}/lessons`, ref => ref.orderBy('seqNo', sortOrder).limit(pageSize)
              .startAfter(pageSize * pageNumber)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps)));
  }
}