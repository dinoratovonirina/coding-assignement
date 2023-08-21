import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { DetailTicketComponent } from "./detail-ticket.component";
import { BackendService } from "src/app/backend.service";

describe("DetailTicketComponent", () => {
  let component: DetailTicketComponent;
  let fixture: ComponentFixture<DetailTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailTicketComponent],
      imports: [RouterTestingModule],
      providers: [BackendService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return list users getAllUser()", () => {
    let listUser = spyOn(component, "getAllUser");
    component.getAllUser();
    expect(listUser).toHaveBeenCalled();
    expect(listUser).toHaveBeenCalledTimes(1);
  });

  it("should Init value detail Ticket", () => {
    let initValue = spyOn(component, "ngOnInit");
    component.ngOnInit();
    expect(initValue).toHaveBeenCalled();
  });
});
