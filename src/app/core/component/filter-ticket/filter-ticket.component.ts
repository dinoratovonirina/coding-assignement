import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filter-ticket",
  templateUrl: "./filter-ticket.component.html",
  styleUrls: ["./filter-ticket.component.css"],
})
export class FilterTicketComponent implements OnInit {
  public critereForFindTicket: string = "";

  @Output() public textForFilter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onFilterListTicket() {
    this.textForFilter.emit(this.critereForFindTicket);
  }
}
