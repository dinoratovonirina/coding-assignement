import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  combineLatest,
  of,
} from "rxjs";
import { map, tap } from "rxjs/operators";
import { TicketService } from "src/app/Services/ticket.service";
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
  public dataDetailTicket$: Observable<any> = new Observable<any>();
  public selectUserForAssign: number = null;
  private _selectUserForAssign$: Subject<number> = new BehaviorSubject<number>(
    null
  );
  public listUser$: Observable<User[]> = of<User[]>([]);
  private _id$: Observable<number> = of(+this.route.snapshot.params["id"]);
  private id: number = +this.route.snapshot.params["id"];
  public spinnerShow: boolean = false;
  public souscription: Subscription = new Subscription();

  constructor(
    private readonly backendService: BackendService,
    public route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.onInitDetail();
    this.getAllUser();
  }

  getAllUser(): Observable<User[]> {
    this.listUser$ = this.userService.listUser;
    return this.listUser$;
  }

  get selectUserForAssignObs(): Observable<number> {
    return this._selectUserForAssign$.asObservable();
  }

  setSelectUserForAssign(arg: number) {
    this._selectUserForAssign$.next(arg);
  }

  onInitDetail() {
    this.route.data.subscribe(
      (detailOnTicket) => {
        this.dataDetailTicket$ = of(detailOnTicket.detailTicket);
      },
      (error) =>
        alert(`Erreur ${error} de recupération du ticket n°: ${this.id}`)
    );
  }

  onSelectUserForAssign() {
    if (this.selectUserForAssign) {
      this.setSelectUserForAssign(this.selectUserForAssign);
      if (confirm("Voulez-vous assigner ce ticket à cette personne?")) {
        this.spinnerShow = true;

        this.souscription.add(
          combineLatest([
            this.ticketService.listTicket,
            this.userService.listUser,
            of(this.selectUserForAssign),
            this._id$,
          ])
            .pipe(
              map(([tickets, users, selectUserForAssign, id]) => {
                return tickets
                  .filter((ticket: Ticket) => ticket.id == id)
                  .map((ticket: Ticket) => {
                    return {
                      ...ticket,
                      assigneeId: selectUserForAssign,
                      assigneeName: !isNaN(ticket.assigneeId)
                        ? users
                            .filter(
                              (user: User) => +user.id == +selectUserForAssign
                            )
                            .shift().name
                        : null,
                    };
                  });
              }),
              tap(([tickets]) => {
                this.souscription.add(
                  this.backendService
                    .assign(+tickets.id, this.selectUserForAssign)
                    .subscribe(
                      (data) => {
                        this.ticketService.replaceTicketById(data.id, data);
                        this.spinnerShow = false;
                      },
                      (error) => alert(`Erreur ${error}`)
                    )
                );
              })
            )
            .subscribe(
              (detailOnTicketAssign) => {
                this.dataDetailTicket$ = of(detailOnTicketAssign.shift());
              },
              (error) =>
                alert(
                  `Erreur ${error} de recupération du ticket n°: ${this.id}`
                )
            )
        );
      }
    }
  }

  onComplete() {
    if (confirm("Voulez-vous fermé (Complete) ce ticket?")) {
      this.spinnerShow = true;
      this.souscription.add(
        combineLatest([
          this.ticketService.listTicket,
          this.userService.listUser,
          this.selectUserForAssignObs,
          this._id$,
        ])
          .pipe(
            map(([tickets, users, selectUserAssign, id]) => {
              return tickets
                .filter((ticket: Ticket) => ticket.id == id)
                .map((ticket: Ticket) => {
                  let assigneeIdTicket =
                    selectUserAssign == null
                      ? ticket.assigneeId
                      : selectUserAssign;

                  return {
                    ...ticket,
                    assigneeId: +assigneeIdTicket,
                    assigneeName: !isNaN(ticket.assigneeId)
                      ? users
                          .filter((user: User) => +user.id == +assigneeIdTicket)
                          .shift().name
                      : null,
                    completed: true,
                  };
                });
            }),
            tap(([ticket]) => {
              this.souscription.add(
                this.backendService.complete(+ticket.id, true).subscribe(
                  (data) => {
                    this.ticketService.replaceTicketById(data.id, data);
                    this.spinnerShow = false;
                  },
                  (error) => alert(`Erreur ${error}`)
                )
              );
            })
          )
          .subscribe(
            (detailOnTicketComplet) => {
              this.dataDetailTicket$ = of(detailOnTicketComplet.shift());
            },
            (error) =>
              alert(`Erreur ${error} de recupération du ticket n°: ${this.id}`)
          )
      );
    }
  }

  onPrecede() {
    this.router.navigate(["/list-ticket"]);
  }

  ngOnDestroy(): void {
    //this.souscription.unsubscribe();
  }
}
