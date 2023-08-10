import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { BackendService } from "src/app/backend.service";

@Component({
  selector: "app-add-ticket",
  templateUrl: "./add-ticket.component.html",
  styleUrls: ["./add-ticket.component.css"],
})
export class AddTicketComponent implements OnInit {
  private _description: string = "";
  public spinnerShow: boolean = false;
  private souscription = new Subscription();

  constructor(private readonly backendService: BackendService) {}

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
          tap(() => this.onResetForm()),
          tap(() => (this.spinnerShow = false))
        )
        .subscribe()
    );
  }

  onResetForm() {
    this.description = "";
  }
}
