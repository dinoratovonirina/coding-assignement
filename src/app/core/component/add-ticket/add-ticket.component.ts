import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { TicketService } from "src/app/Services/ticket.service";
import { BackendService } from "src/app/backend.service";

@Component({
  selector: "app-add-ticket",
  templateUrl: "./add-ticket.component.html",
  styleUrls: ["./add-ticket.component.css"],
})
export class AddTicketComponent implements OnInit, OnDestroy {
  private _description: string = "";
  public spinnerShow: boolean = false;
  private souscription = new Subscription();

  constructor(
    private readonly backendService: BackendService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {}

  get description(): string {
    return this._description;
  }

  set description(arg: string) {
    this._description = arg;
  }

  onAddTicket() {
    this.spinnerShow = true;
    this.souscription.add(
      this.backendService
        .newTicket({ description: this.description })
        .pipe(
          switchMap(() => this.ticketService.listTicket),
          tap(() => this.onResetForm()),
          tap(() => (this.spinnerShow = false))
        )
        .subscribe()
    );
  }

  onResetForm() {
    this.description = "";
  }

  ngOnDestroy(): void {
    this.souscription.unsubscribe();
  }
}
