import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppComponent } from "./app.component";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';

import { baseURL } from './shared/baseurl';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        MenuComponent,
        ContactComponent,
        DishdetailComponent
    ],
    providers: [
      DishService,
      PromotionService,
      LeaderService,
      ProcessHTTPMsgService,
      {provide: 'BaseURL', useValue: baseURL}
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
