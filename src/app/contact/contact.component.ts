import { Component } from '@angular/core';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import * as Email from 'nativescript-email';
import * as Phone from 'nativescript-phone';

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: './contact.component.html',
//  styleUrls: ['./home.component.css']
})
export class ContactComponent {

  constructor(private fonticon: TNSFontIconService) { }

  onDrawerButtonTap(): void {
      const sideDrawer = <RadSideDrawer>app.getRootView();
      sideDrawer.showDrawer();
  }

  sendEmail() {
   Email.available()
     .then((avail: boolean) => {
       if (avail) {
         Email.compose({
           to: ['confusion@food.net'],
           subject: '[ConFusion]: Query',
           body: 'Dear Sir/Madam:'
         });
       }
       else
         console.log('No Email Configured');
     })
 }

  callRestaurant() {
    Phone.requestCallPermission('App Needs This Permission To Make Phone Calls')
      .then(() => {
        console.log('Permission given to make Phone call');
        Phone.dial('+852 1234 5678', false);
      })
      .catch(() => console.log('No permission to make Phone call'));
  }
}
