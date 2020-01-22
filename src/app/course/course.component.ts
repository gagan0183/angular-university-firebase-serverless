import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {CoursesService} from '../services/courses.service';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;

  displayedColumns = ['seqNo', 'description', 'duration'];

  lessons;

  loadMorePage: number = 0;

  loading = false;


  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.loading = true;
    this.coursesService.findLessons(this.course.id)
    .pipe(finalize(() => this.loading = false)).subscribe(lessons => {
      this.lessons = lessons;
    });
  }

  loadMore() {
    this.loadMorePage++;
    this.loading 
    this.coursesService.findLessons(this.course.id, 'asc', this.loadMorePage)
    .pipe(finalize(() => this.loading = false))
    .subscribe(lessons => {
      this.lessons = this.lessons.concat(lessons);
    });
  }
}
