import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { ReservationComponent } from './reservation/reservation.component';
import { UserAuthComponent } from "./userauth/userauth.component";

const routes: Routes = [
    { path: "", redirectTo: "/menu", pathMatch: "full" },
    { path: "auth", component: UserAuthComponent },
    { path: "home", component: HomeComponent },
    { path: "aboutus", component: AboutComponent },
    { path: "menu", component: MenuComponent },
    { path: "contactus", component: ContactComponent },
    { path: "favorites", component: FavoritesComponent },
    { path: 'dishdetail/:id', component: DishdetailComponent },
    { path: "reservation", component: ReservationComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
