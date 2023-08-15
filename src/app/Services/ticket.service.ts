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

  indexTicketById(id: number): number {
    return this.getValueListTicket().findIndex(
      (ticket: Ticket) => ticket.id == id
    );
  }

  replaceTicketById(id, data: Ticket) {
    this.getValueListTicket()[+this.indexTicketById(id)] = data;
  }

  async emitListTicket() {
    await this.backendService
      .tickets()
      .pipe(tap((listTicket: Ticket[]) => this.setListTicket(listTicket)))
      .subscribe();
  }
}
