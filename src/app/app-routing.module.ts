import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailTicketComponent } from "./core/component/detail-ticket/detail-ticket.component";
import { ListTicketComponent } from "./core/component/list-ticket/list-ticket.component";

const routes: Routes = [
  {
    path: "**",
    redirectTo: "list-ticket",
    pathMatch: "full",
  },
  {
    path: "list-ticket",
    component: ListTicketComponent,
  },
  {
    path: "detail-ticket",
    component: DetailTicketComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
