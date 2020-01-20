import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {CoursesService} from '../services/courses.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;

  displayedColumns = ['seqNo', 'description', 'duration'];

  lessons: Lesson[];


  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.lessons = this.coursesService.findLessons(this.course.id);
  }

  loadMore() {

  }
}
