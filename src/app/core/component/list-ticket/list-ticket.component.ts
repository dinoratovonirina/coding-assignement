import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { BehaviorSubject, Observable, combineLatest, of } from "rxjs";
import { tap } from "rxjs/operators";
import { TicketService } from "src/app/Services/ticket.service";
import { Ticket } from "src/interfaces/ticket.interface";

@Component({
  selector: "app-list-ticket",
  templateUrl: "./list-ticket.component.html",
  styleUrls: ["./list-ticket.component.css"],
})
export class ListTicketComponent implements OnInit {
  private _listFilterTicket$: BehaviorSubject<Ticket[]> = new BehaviorSubject<
    Ticket[]
  >([]);

  public nbreOfFilter: number = null;

  constructor(public ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.emitFilterTicket();
  }

  get listFilterTicket(): Observable<Ticket[]> {
    return this._listFilterTicket$.asObservable();
  }

  setListFilterTicket(arg: Ticket[]) {
    this._listFilterTicket$.next(arg);
  }

  emitFilterTicket() {
    this.ticketService.listTicket
      .pipe(tap((listTicket: Ticket[]) => this.setListFilterTicket(listTicket)))
      .subscribe();
  }

  onFilterTicket(arg: number) {
    this.nbreOfFilter = arg;
    if (this.nbreOfFilter === null) return this.emitFilterTicket();
    else
      this.listFilterTicketObservable(
        this.ticketService.listTicket,
        of(this.nbreOfFilter)
      ).subscribe();
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
    ).pipe(tap((listTicket) => this.setListFilterTicket(listTicket)));
  }

  onViewDetail(arg: any) {
    this.router.navigate(arg);
  }
}
