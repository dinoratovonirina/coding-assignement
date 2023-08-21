import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ListTicketComponent } from "./list-ticket.component";
import { TicketService } from "src/app/Services/ticket.service";
import { BackendService } from "src/app/backend.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("ListTicketComponent", () => {
  let component: ListTicketComponent;
  let fixture: ComponentFixture<ListTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTicketComponent],
      imports: [RouterTestingModule],
      providers: [TicketService, BackendService],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it("should check two instance off app-add-ticket && app-filter-ticket", () => {
    let instanceAdd = fixture.debugElement.query(By.css("app-add-ticket"));
    let instanceFilter = fixture.debugElement.query(
      By.css("app-filter-ticket")
    );
    expect(instanceAdd).toBeTruthy();
    expect(instanceFilter).toBeTruthy();
  });

  xit("shoudl check @Output", () => {
    let checkOutput = fixture.debugElement.query(By.css("app-filter-ticket "));
    checkOutput.triggerEventHandler("textForFilter", 0);
    expect(component.onFilterTicket).toBe([
      {
        id: 0,
        completed: false,
        assigneeId: 111,
        description: "Install a monitor arm",
      },
    ]);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Init liste Ticket", () => {
    let emitTicket = spyOn(component, "emitFilterTicket");
    component.emitFilterTicket();
    expect(emitTicket).toHaveBeenCalled();
  });
});
