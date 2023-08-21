import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ListTicketComponent } from "./list-ticket.component";
import { TicketService } from "src/app/Services/ticket.service";
import { BackendService } from "src/app/backend.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";

describe("ListTicketComponent", () => {
  let component: ListTicketComponent;
  let fixture: ComponentFixture<ListTicketComponent>;
  let ticketService: TicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTicketComponent],
      imports: [RouterTestingModule],
      providers: [TicketService, BackendService],
      schemas: [NO_ERRORS_SCHEMA],
    });

    ticketService = TestBed.inject(TicketService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should check two instance off app-add-ticket && app-filter-ticket", () => {
    let instanceAdd = fixture.debugElement.query(By.css("app-add-ticket"));
    let instanceFilter = fixture.debugElement.query(
      By.css("app-filter-ticket")
    );
    expect(instanceAdd).toBeTruthy();
    expect(instanceFilter).toBeTruthy();
  });

  /*it("should test @Output()", () => {
    let instanceFilter = fixture.debugElement.query(
      By.css("app-filter-ticket")
    );
    instanceFilter.triggerEventHandler("textForFilter", 0);
    let filter = component.onFilterTicket(0);
    let listAfterFitler = component.listFilterTicketObservable(
      ticketService.listTicket,
      of(0)
    );
    expect(filter).toBe(listAfterFitler);
  });*/

  it("Init liste Ticket", () => {
    let emitTicket = spyOn(component, "emitFilterTicket");
    component.emitFilterTicket();
    expect(emitTicket).toHaveBeenCalled();
  });
});
