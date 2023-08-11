import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { BehaviorSubject, Observable, combineLatest, of } from "rxjs";
import { TicketService } from "src/app/Services/ticket.service";
import { Ticket } from "src/interfaces/ticket.interface";

@Component({
  selector: "app-list-ticket",
  templateUrl: "./list-ticket.component.html",
  styleUrls: ["./list-ticket.component.css"],
})
export class ListTicketComponent implements OnInit {
  public listFilterTicket: BehaviorSubject<Ticket[]> = new BehaviorSubject<
    Ticket[]
  >([]);

  constructor(public ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.emitInitFilter();
  }

  emitInitFilter() {
    this.ticketService.listTicket.subscribe((listTicket: Ticket[]) =>
      this.setListFilterTicket(listTicket)
    );
  }

  setListFilterTicket(arg: Ticket[]) {
    this.listFilterTicket.next(arg);
  }

  onFilterTicket(arg: number) {
    if (arg === null) return this.emitInitFilter();
    else
      this.listFilterTicketObservable(
        this.ticketService.listTicket,
        of(arg)
      ).subscribe((listTicket: Ticket[]) =>
        this.setListFilterTicket(listTicket)
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
