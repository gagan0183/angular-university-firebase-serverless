import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';
import {map} from "rxjs/operators";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    course$: Observable<Course[]>;
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor(private coursesService: CoursesService) {
    }

    ngOnInit() {
      this.course$ = this.coursesService.loadAllCourses();
      this.beginnerCourses$ = this.course$.pipe(map(courses => {
        return courses.filter(course => course.categories.includes('BEGINNER'))
      }));

      this.advancedCourses$ = this.course$.pipe(map(courses => {
        return courses.filter(course => course.categories.includes('ADVANCED'))
      }));
    }
}
