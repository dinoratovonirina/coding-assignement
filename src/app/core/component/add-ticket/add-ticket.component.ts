import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, of } from "rxjs";
import { concatMap, map, switchMap, take, tap } from "rxjs/operators";
import { TicketService } from "src/app/Services/ticket.service";
import { BackendService } from "src/app/backend.service";
import { Ticket } from "src/interfaces/ticket.interface";

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

    of(this.description)
      .pipe(
        concatMap((description) =>
          this.ticketService.listTicket.pipe(
            map((tickets: Ticket[]) => {
              return [
                ...tickets,
                {
                  id: tickets.length,
                  completed: false,
                  assigneeId: null,
                  description: description,
                },
              ];
            })
          )
        ),
        take(1),
        tap(() =>
          this.backendService
            .newTicket({ description: this.description })
            .subscribe()
        )
      )
      .subscribe(
        (listeTicket) => {
          this.ticketService.setListTicket(listeTicket);
          this.onResetForm();
          this.spinnerShow = false;
        },
        (error) => alert(`Erreur lors de l'ajout : ${error}`)
      );
  }

  onResetForm() {
    this.description = "";
  }

  ngOnDestroy(): void {
    this.souscription.unsubscribe();
  }
}
