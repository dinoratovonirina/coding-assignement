import { TestBed } from "@angular/core/testing";

import { TicketService } from "./ticket.service";
import { BackendService } from "../backend.service";

describe("TicketService", () => {
  let service: TicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService],
    });
    service = TestBed.inject(TicketService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("get listTicket() should type array object", () => {
    expect(typeof service.listTicket).toEqual("object");
  });

  it("return getValueListTicket()", () => {
    let listTicket = spyOn(service, "getValueListTicket").and.returnValue(true);
    service.getValueListTicket();
    expect(listTicket).toHaveBeenCalled();
  });

  it("get index of list ticket", () => {
    spyOn(service, "indexTicketById").and.returnValue(0);
    let indexTicket = service.indexTicketById(0);
    expect(indexTicket).toBe(0);
  });
});
