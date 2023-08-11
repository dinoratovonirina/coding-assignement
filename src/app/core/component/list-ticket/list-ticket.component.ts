import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BackendService } from "src/app/backend.service";
import { Ticket } from "src/interfaces/ticket.interface";
import { Observable, combineLatest, of, BehaviorSubject } from "rxjs";

import { tap, map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-ticket",
  templateUrl: "./list-ticket.component.html",
  styleUrls: ["./list-ticket.component.css"],
})
export class ListTicketComponent implements OnInit {
  private _tickets$: Observable<Ticket[]> = of([]);
  private _ticketsFilter$: Observable<Ticket[]> = of([]);

  constructor(
    private readonly backendService: BackendService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListTicket();
    this.affectTiketFiltre();
  }

  private getListTicket() {
    this.tickets = this.backendService.tickets();
  }

  private affectTiketFiltre() {
    this.ticketFilter = this.tickets;
  }

  get tickets(): Observable<Ticket[]> {
    return this._tickets$;
  }

  set tickets(arg: Observable<Ticket[]>) {
    this._tickets$ = arg;
  }

  get ticketFilter(): Observable<Ticket[]> {
    return this._ticketsFilter$;
  }

  set ticketFilter(arg: Observable<Ticket[]>) {
    this._ticketsFilter$ = arg;
  }

  onFilterTicket(arg: number) {
    if (arg === null) return this.affectTiketFiltre();

    this.ticketFilter = this.tickets.pipe(
      map((tickets: Ticket[]) => {
        return tickets.filter((ticket: Ticket) => ticket.id === arg);
      })
    );
  }

  onViewDetail(arg: any) {
    this.router.navigate(arg);
  }
}
