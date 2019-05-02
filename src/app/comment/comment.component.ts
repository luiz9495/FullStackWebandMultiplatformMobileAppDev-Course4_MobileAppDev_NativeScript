import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page } from 'tns-core-modules/ui/page';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Slider } from "tns-core-modules/ui/slider";
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
//    selector: 'app-comment',
    moduleId: module.id,
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

    commentForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
              private params: ModalDialogParams,
              private page: Page) {

      this.commentForm = this.formBuilder.group({
          rating: 3,
          author: '',
          comment: ''
      });
    }

    ngOnInit() {
//      console.log(ratingPicker);
    }

    onAuthorPress(args) {
      let textField = <TextField>args.object;
      this.commentForm.patchValue({ author: textField.text});
    }

    onSliderValueChange(args) {
      let slider = <Slider>args.object;
      this.commentForm.patchValue({ rating: slider.value});
    }

    onCommentPress(args) {
      let textField = <TextField>args.object;
      this.commentForm.patchValue({ comment: textField.text});
    }

    onSubmit() {
      let comment: Comment = this.commentForm.value;
      comment['date'] = new Date().toISOString();
      this.params.closeCallback(comment);
    }
}
