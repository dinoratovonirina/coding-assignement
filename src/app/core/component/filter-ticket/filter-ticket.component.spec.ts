import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterTicketComponent } from "./filter-ticket.component";
import { FormsModule } from "@angular/forms";

describe("FilterTicketComponent", () => {
  let component: FilterTicketComponent;
  let fixture: ComponentFixture<FilterTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterTicketComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
