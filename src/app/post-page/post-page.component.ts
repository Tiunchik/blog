import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../shared/post.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Post} from '../admin/shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post: Post;

  constructor(private postService: PostService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => this.postService.getById(params.id)))
      .subscribe((post) => {
        this.post = post;
      });
  }


}
