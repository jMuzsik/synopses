import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BookComponent } from "./book/book.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full",
  },
  {
    path: "",
    component: DashboardComponent,
  },
  {
    path: "book/:title",
    component: BookComponent,
  },
  { path: "**", redirectTo: "/", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
