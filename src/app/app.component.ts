import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { User } from "../interfaces/user.interface";
import { BackendService } from "./backend.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public readonly users$: Observable<User[]> = this.backendService.users();

  constructor(private readonly backendService: BackendService) {}

  ngOnInit(): void {}

  emitEventDetail(arg: string) {}
}
