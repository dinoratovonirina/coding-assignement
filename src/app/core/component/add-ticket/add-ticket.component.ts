import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { BackendService } from "src/app/backend.service";

@Component({
  selector: "app-add-ticket",
  templateUrl: "./add-ticket.component.html",
  styleUrls: ["./add-ticket.component.css"],
})
export class AddTicketComponent implements OnInit {
  public description: string = "";

  private souscription = new Subscription();

  constructor(private readonly backendService: BackendService) {}

  ngOnInit(): void {}

  onAddTicket() {
    this.souscription.add(
      this.backendService
        .newTicket({ description: this.description })
        .subscribe()
    );
  }
}
