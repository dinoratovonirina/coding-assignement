import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { Ticket } from "src/interfaces/ticket.interface";

@Component({
  selector: "app-detail-ticket",
  templateUrl: "./detail-ticket.component.html",
  styleUrls: ["./detail-ticket.component.css"],
})
export class DetailTicketComponent implements OnInit {
  dataDetailTicket$: Observable<Ticket> = of();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.dataDetailTicket$ = of<Ticket>(data.detailTicket);
    });
  }
}
