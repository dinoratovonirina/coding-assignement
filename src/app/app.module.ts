import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { FormsModule } from "@angular/forms";
import { AddTicketComponent } from "./core/component/add-ticket/add-ticket.component";
import { FilterTicketComponent } from "./core/component/filter-ticket/filter-ticket.component";
import { DetailTicketComponent } from "./core/component/detail-ticket/detail-ticket.component";
import { ListTicketComponent } from "./core/component/list-ticket/list-ticket.component";
import { AppRoutingModule } from "./app-routing.module";
import { DetailTicketResolver } from "src/Resolvers/detail-ticket.resolver";

@NgModule({
  declarations: [
    AppComponent,
    AddTicketComponent,
    FilterTicketComponent,
    DetailTicketComponent,
    ListTicketComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [BackendService, DetailTicketResolver],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
