import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, combineLatest, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { TicketService } from "src/app/Services/ticket.service";
import { UserService } from "src/app/Services/user.service";
import { Ticket } from "src/interfaces/ticket.interface";
import { User } from "src/interfaces/user.interface";

@Injectable({ providedIn: "root" })
export class DetailTicketResolver implements Resolve<any> {
  constructor(
    private ticketService: TicketService,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id$ = of(+route.params["id"]);
    let dataTicket$: Observable<any> = new Observable<any>();

    combineLatest([
      this.ticketService.listTicket,
      this.userService.listUser,
      id$,
    ])
      .pipe(
        map(([tickets, users, id]) => {
          return tickets
            .filter((ticket: Ticket) => ticket.id == id)
            .map((ticket: Ticket) => {
              return {
                ...ticket,
                assigneeName: !!ticket.assigneeId
                  ? users
                      .filter((user: User) => user.id == ticket.assigneeId)
                      .shift().name
                  : "Non assigné",
              };
            });
        })
      )
      .subscribe((dataTicket: any) => {
        dataTicket$ = dataTicket.shift();
      });

    return dataTicket$;
  }
}
