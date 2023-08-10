import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BackendService } from "src/app/backend.service";
import { Ticket } from "src/interfaces/ticket.interface";
import { Observable } from "rxjs";

import { tap, map } from "rxjs/operators";

@Component({
  selector: "app-list-ticket",
  templateUrl: "./list-ticket.component.html",
  styleUrls: ["./list-ticket.component.css"],
})
export class ListTicketComponent implements OnInit {
  public tickets$: Observable<Ticket[]>;
  @Output() public emitEventDetail = new EventEmitter();

  constructor(private readonly backendService: BackendService) {}

  ngOnInit(): void {
    this.tickets$ = this.backendService.tickets();
  }

  onFilterTicket(arg: number) {
    this.tickets$ = this.tickets$.pipe(
      map((tikets: Ticket[]) => {
        if (arg !== null)
          return tikets.filter((ticket: Ticket) => ticket.id !== arg);
        else return tikets;
      })
    );
  }

  onViewDetail(arg: string) {
    this.emitEventDetail.emit(arg);
  }
}
