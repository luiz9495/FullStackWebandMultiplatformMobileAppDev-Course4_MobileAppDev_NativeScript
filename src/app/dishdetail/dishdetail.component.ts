import { Component, OnInit, Inject, ChangeDetectorRef, ViewContainerRef  } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { switchMap } from 'rxjs/operators';
import { Toasty } from 'nativescript-toasty';
import { action } from "tns-core-modules/ui/dialogs";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-dishdetail',
    moduleId: module.id,
  templateUrl: './dishdetail.component.html',
//  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;
  heightListView: number;

  constructor(private dishservice: DishService,
            private favoriteservice: FavoriteService,
            private fonticon: TNSFontIconService,
            private route: ActivatedRoute,
            private routerExtensions: RouterExtensions,
            @Inject('BaseURL') private baseURL,
            private modalService: ModalDialogService,
            private vcRef: ViewContainerRef) { }

  ngOnInit() {

    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish;
        this.favorite = this.favoriteservice.isFavorite(this.dish.id);
          this.numcomments = this.dish.comments.length;

          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating);
          this.avgstars = (total/this.numcomments).toFixed(2);

          this.heightListView = 100 * this.dish.comments.length;
        },
          errmess => { this.dish = null; this.errMess = <any>errmess;
      });
  }

  addToFavorites() {
    if (!this.favorite) {
      console.log('Adding to Favorites', this.dish.id);

      this.favorite = this.favoriteservice.addFavorite(this.dish.id);
      const toast = new Toasty("Added Dish "+ this.dish.id, "short", "bottom");
      toast.show();
    }
  }

  goBack(): void {
    this.routerExtensions.back();
  }

  displayActionDialog() {
    let options = {
      title: "Actions",
      message: "choose action",
      cancelButtonText: "Cancel",
      actions: ["Add to Favorites", "Add Comment"]
    };

    action(options).then((result) => {
      console.log(result);

      if (result === "Add to Favorites") {
        // Add to Favorites
        this.addToFavorites();
      }
      else {
        // Add Comment
        this.showModal();
      }
    });
  }

  showModal() {
    let options: ModalDialogOptions = {
        viewContainerRef: this.vcRef,
//        context: args,
        fullscreen: false
    };
    this.modalService.showModal(CommentComponent, options)
      .then((result: any) => {
          this.dish.comments.push(result);
          this.heightListView += 100;

          console.log(this.dish.comments);
      });
  }

}
