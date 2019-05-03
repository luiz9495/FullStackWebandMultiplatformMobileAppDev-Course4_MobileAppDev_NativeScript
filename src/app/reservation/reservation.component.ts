import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Switch } from 'tns-core-modules/ui/switch';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ReservationModalComponent } from '../reservationmodal/reservationmodal.component';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Page } from "tns-core-modules/ui/page";
import { Animation, AnimationDefinition } from "tns-core-modules/ui/animation";
import { View } from "tns-core-modules/ui/core/view";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";
import * as enums from "tns-core-modules/ui/enums";
import { CouchbaseService } from '../services/couchbase.service';

@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html',
//    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservation: FormGroup;
  showFormConfirmed: boolean;
  formView: View;
  formResultView: View;
  reservations: Array<any>;
  docId: string = "reservations";

  constructor(private formBuilder: FormBuilder,
            private modalService: ModalDialogService,
            private vcRef: ViewContainerRef,
            private page: Page,
            private couchbaseService: CouchbaseService) {
    // Create Reservation Input Form
    this.reservation = this.formBuilder.group({
        guests: 3,
        smoking: false,
        dateTime: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.showFormConfirmed = false;
    this.reservations = [];
  }

  onDrawerButtonTap(): void {
      const sideDrawer = <RadSideDrawer>app.getRootView();
      sideDrawer.showDrawer();
  }

  createModalView(args) {
    let options: ModalDialogOptions = {
        viewContainerRef: this.vcRef,
        context: args,
        fullscreen: false
    };
    this.modalService.showModal(ReservationModalComponent, options)
      .then((result: any) => {
        if (args === "guest") {
            this.reservation.patchValue({guests: result});
        }
        else if (args === "date-time") {
            this.reservation.patchValue({ dateTime: result});
        }
      });
  }

  onSmokingChecked(args) {
    let smokingSwitch = <Switch>args.object;
    if (smokingSwitch.checked) {
        this.reservation.patchValue({ smoking: true });
    }
    else {
        this.reservation.patchValue({ smoking: false });
    }
  }

  onGuestChange(args) {
    let textField = <TextField>args.object;

    this.reservation.patchValue({ guests: textField.text});
  }

  onDateTimeChange(args) {
    let textField = <TextField>args.object;

    this.reservation.patchValue({ dateTime: textField.text});
  }

  // Animation Part
  onSubmit() {
    console.log(JSON.stringify(this.reservation.value));

    this.formView = <View>this.page.getViewById<View>("form");
    this.formResultView = <View>this.page.getViewById<View>("formResult");

    // Create Reservation Couchbase Lite DB
    let doc = this.couchbaseService.getDocument(this.docId);
    if( doc == null) {
      this.couchbaseService.createDocument({"reservations": []}, this.docId);
    }
    else {
      this.reservations = doc.reservations;
    }

    if (!this.showFormConfirmed) {
      this.formView.animate({
          scale: { x: 0, y: 0 },
          opacity: 0,
          duration: 500,
          curve: enums.AnimationCurve.easeInOut
      })
      .then( () => {
        this.showFormConfirmed = true;
        this.formResultView.animate({
          scale: { x: 1, y: 1 },
          opacity: 1,
          duration: 500,
          curve: enums.AnimationCurve.easeInOut
        });
        this.reservations.push(this.reservation.value);
        this.couchbaseService.updateDocument(this.docId, {"reservations": this.reservations});
        console.log(JSON.stringify(this.reservations));
//        console.log(this.couchbaseService.getDocument(this.docId));
      })
      .catch((e) => {
          console.log(e.message);
      });
    }
  }
}
