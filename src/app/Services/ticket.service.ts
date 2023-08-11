import { Injectable } from "@angular/core";
import { BackendService } from "../backend.service";
import { Observable } from "rxjs";
import { Ticket } from "src/interfaces/ticket.interface";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  private _listTicket$: Observable<Ticket[]> = new Observable<Ticket[]>();

  constructor(private readonly backendService: BackendService) {}

  get listTicket(): Observable<Ticket[]> {
    return this._listTicket$;
  }

  set listTicket(arg: Observable<Ticket[]>) {
    this._listTicket$ = arg;
  }

  emitListTicket() {
    this.listTicket = this.backendService.tickets();
  }
}
