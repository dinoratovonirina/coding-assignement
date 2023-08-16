import { TestBed } from "@angular/core/testing";

import { TicketService } from "./ticket.service";
import { BackendService } from "../backend.service";

describe("TicketService", () => {
  let service: TicketService;
  let backservice: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService],
    });
    service = TestBed.inject(TicketService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("get listTicket() should array object", () => {
    expect(typeof service.listTicket).toEqual("object");
  });

  /* it("indexTicketById() get index for ticket", () => {
    let listTickets = service.getValueListTicket();
    console.log(listTickets);
  });*/
});
