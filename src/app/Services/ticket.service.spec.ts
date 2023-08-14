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
    backservice = TestBed.inject(BackendService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
