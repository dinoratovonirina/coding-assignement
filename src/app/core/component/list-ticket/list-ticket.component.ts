import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { BehaviorSubject, Observable, combineLatest, of } from "rxjs";
import { map } from "rxjs/operators";
import { TicketService } from "src/app/Services/ticket.service";
import { Ticket } from "src/interfaces/ticket.interface";

@Component({
  selector: "app-list-ticket",
  templateUrl: "./list-ticket.component.html",
  styleUrls: ["./list-ticket.component.css"],
})
export class ListTicketComponent implements OnInit {
  public listFilterTicket: Observable<Ticket[]> = new Observable<Ticket[]>();

  constructor(public ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.getInitFilter();
  }

  getInitFilter() {
    this.listFilterTicket = this.ticketService.listTicket;
  }

  onFilterTicket(arg: number) {
    if (arg === null) return this.getInitFilter();
    else
      this.listFilterTicket = this.listFilterTicketObservable(
        this.ticketService.listTicket,
        of(arg)
      );
  }

  private listFilterTicketObservable(
    listTicket$: Observable<Ticket[]>,
    filterValue$: Observable<number>
  ) {
    return combineLatest(
      listTicket$,
      filterValue$,
      (tiketList: Ticket[], filterValue: number) => {
        return tiketList.filter((tiket: Ticket) => tiket.id === filterValue);
      }
    );
  }

  onViewDetail(arg: any) {
    this.router.navigate(arg);
  }
}
