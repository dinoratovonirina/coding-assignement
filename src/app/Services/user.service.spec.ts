import { TestBed } from "@angular/core/testing";

import { UserService } from "./user.service";
import { BackendService } from "../backend.service";

describe("UserService", () => {
  let service: UserService;
  let backendService: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService],
    });
    service = TestBed.inject(UserService);
    backendService = TestBed.inject(BackendService);
  });

  it("should be if emitListUser() is called", () => {
    let emitListUser = spyOn(service, "emitListUser");
    service.emitListUser();
    expect(emitListUser).toHaveBeenCalled();
  });

  it("should be called method GET List User", () => {
    let emitListUser = spyOnProperty(service, "listUser", "get");
    service.listUser;
    expect(emitListUser).toHaveBeenCalled();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
    expect(backendService).toBeTruthy();
  });
});
