import { Component, OnInit } from "@angular/core";
import { UserService } from "./Services/user.service";
import { TicketService } from "./Services/ticket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public title: string = "Ticket";

  constructor(
    private userService: UserService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.ticketService.emitListTicket();
    this.userService.emitListUser();
  }
}
