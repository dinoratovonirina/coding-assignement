import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ListTicketComponent } from "./list-ticket.component";
import { TicketService } from "src/app/Services/ticket.service";

describe("ListTicketComponent", () => {
  let component: ListTicketComponent;
  let fixture: ComponentFixture<ListTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTicketComponent],
      imports: [RouterTestingModule],
      providers: [TicketService],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
