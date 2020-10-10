import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../shared/interfaces';
import {PostService} from '../../shared/post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription;
  searchStr = '';

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe(response => {
      this.posts = response;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }


  remove(id: string) {

  }
}
