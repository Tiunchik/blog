import { Component, OnInit } from '@angular/core';
import {PostService} from '../shared/post.service';
import {Observable} from 'rxjs';
import {Post} from '../admin/shared/interfaces';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  post$: Observable<Post[]>;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.post$ = this.postService.getAll();
  }

}
