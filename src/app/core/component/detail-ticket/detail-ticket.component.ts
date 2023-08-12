import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  of,
} from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { UserService } from "src/app/Services/user.service";
import { BackendService } from "src/app/backend.service";
import { Ticket } from "src/interfaces/ticket.interface";
import { User } from "src/interfaces/user.interface";

@Component({
  selector: "app-detail-ticket",
  templateUrl: "./detail-ticket.component.html",
  styleUrls: ["./detail-ticket.component.css"],
})
export class DetailTicketComponent implements OnInit, OnDestroy {
  public dataDetailTicket$: Observable<Ticket> = new Observable<Ticket>();
  public selectUserForAssign: number = null;
  public listUser$: Observable<User> = of();
  private _id: number = +this.route.snapshot.params["id"];
  public spinnerShow: boolean = false;
  public souscription: Subscription = new Subscription();

  constructor(
    private readonly backendService: BackendService,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.onInitDetail();
  }

  onInitDetail() {
    this.dataDetailTicket$ = combineLatest([
      this.route.data,
      this.userService.listUser,
    ]).pipe(
      map(([detailTicket, users]) => {
        return {
          ...detailTicket.detailTicket,
          assigneeName:
            detailTicket.detailTicket.assigneeId === null
              ? ""
              : users.find(
                  (assigned) =>
                    assigned.id === detailTicket.detailTicket.assigneeId
                )?.name,
        } as Ticket;
      })
    );
  }

  onSelectUserForAssign() {
    if (this.selectUserForAssign) {
      if (confirm("voulez-vous assigner ce ticket à cette personne?")) {
        this.souscription.add(
          this.backendService
            .assign(this._id, this.selectUserForAssign)
            .pipe(tap(() => this.onInitDetail()))
            .subscribe()
        );
      }
    }
  }

  onComplete() {
    this.spinnerShow = true;
    this.souscription.add(
      this.backendService
        .complete(this._id, true)
        .pipe(
          tap(() => this.onInitDetail()),
          tap(() => (this.spinnerShow = false))
        )
        .subscribe()
    );
  }

  onPrecede() {
    this.router.navigate(["/list-ticket"]);
  }

  ngOnDestroy(): void {
    this.souscription.unsubscribe();
  }
}
