import { Injectable } from "@angular/core";
import { BackendService } from "../backend.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Ticket } from "src/interfaces/ticket.interface";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  private _listTicket$: BehaviorSubject<Ticket[]> = new BehaviorSubject<
    Ticket[]
  >([]);

  private _ticket$: BehaviorSubject<Ticket> = new BehaviorSubject<Ticket>(null);

  constructor(private readonly backendService: BackendService) {}

  get listTicket(): Observable<Ticket[]> {
    return this._listTicket$.asObservable();
  }

  get listTicketBehavior() {
    return this._listTicket$;
  }

  setListTicket(arg: Ticket[]) {
    this._listTicket$.next(arg);
  }

  getValueListTicket(): Ticket[] {
    return this._listTicket$.value;
  }

  get ticket() {
    return this._ticket$.asObservable();
  }

  setTicket(arg: Ticket | any) {
    this._ticket$.next(arg);
  }

  getValueTicket(): Ticket {
    return this._ticket$.value;
  }

  emitListTicket() {
    this.backendService
      .tickets()
      .pipe(tap((listTicket: Ticket[]) => this.setListTicket(listTicket)))
      .subscribe();
  }
}
