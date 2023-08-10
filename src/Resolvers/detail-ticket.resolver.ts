import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { BackendService } from "src/app/backend.service";
import { Ticket } from "src/interfaces/ticket.interface";

@Injectable({ providedIn: "root" })
export class DetailTicketResolver implements Resolve<Ticket> {
  constructor(private readonly backendService: BackendService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Ticket> {
    const id = +route.params["id"];
    return this.backendService.ticket(id);
  }
}
