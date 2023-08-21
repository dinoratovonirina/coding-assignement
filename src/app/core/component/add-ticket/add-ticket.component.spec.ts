import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddTicketComponent } from "./add-ticket.component";
import { BackendService } from "src/app/backend.service";
import { FormsModule } from "@angular/forms";

describe("AddTicketComponent", () => {
  let component: AddTicketComponent;
  let fixture: ComponentFixture<AddTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTicketComponent],
      imports: [FormsModule],
      providers: [BackendService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Test if function onAddTicket() is called", () => {
    let addFcuntion = spyOn(component, "onAddTicket");
    component.onAddTicket();
    expect(addFcuntion).toHaveBeenCalled();
  });
});
