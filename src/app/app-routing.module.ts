import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailTicketComponent } from "./core/component/detail-ticket/detail-ticket.component";
import { ListTicketComponent } from "./core/component/list-ticket/list-ticket.component";
import { DetailTicketResolver } from "src/Resolvers/detail-ticket.resolver";

const routes: Routes = [
  {
    path: "",
    redirectTo: "list-ticket",
    pathMatch: "full",
  },
  {
    path: "list-ticket",
    component: ListTicketComponent,
  },
  {
    path: "detail-ticket/:id",
    component: DetailTicketComponent,
    resolve: { detailTicket: DetailTicketResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
