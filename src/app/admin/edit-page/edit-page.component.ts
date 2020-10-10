import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../shared/post.service';
import {Post} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;
  pEdit: Subscription;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private alert: AlertService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      /**
       * switchMap - по факту вызов subscribe перед subscribe!
       */
      switchMap((params) => this.postService.getById(params.id)
      ))
      .subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, [Validators.required]),
          text: new FormControl(post.text, [Validators.required])
        });
      });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.pEdit = this.postService.edit({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false;
      this.alert.success('Post has been edited');
    }, (err) => {
      this.submitted = false;
    });
  }

  ngOnDestroy(): void {
    if (this.pEdit) {
      this.pEdit.unsubscribe();
    }

  }


}
