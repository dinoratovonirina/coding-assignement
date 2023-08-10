import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, combineLatest, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { BackendService } from "src/app/backend.service";
import { Ticket } from "src/interfaces/ticket.interface";
import { User } from "src/interfaces/user.interface";

@Component({
  selector: "app-detail-ticket",
  templateUrl: "./detail-ticket.component.html",
  styleUrls: ["./detail-ticket.component.css"],
})
export class DetailTicketComponent implements OnInit {
  dataDetailTicket$: Observable<Ticket> = of();
  public readonly users$: Observable<User[]> = this.backendService.users();
  public selectUserForAssign: number = null;
  id: number = +this.route.snapshot.params["id"];

  constructor(
    private readonly backendService: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      combineLatest([of<Ticket>(data.detailTicket), this.users$])
        .pipe(
          map(([detailTicket, users]) => {
            return {
              ...detailTicket,
              assigneeName:
                detailTicket.assigneeId === null
                  ? ""
                  : users.find(
                      (assigned) => assigned.id === detailTicket.assigneeId
                    ).name,
            };
          })
        )
        .subscribe((data) => {
          this.dataDetailTicket$ = of<Ticket>(data);
        });
    });
  }

  onSelectUserForAssign() {
    if (this.selectUserForAssign) {
      if (confirm("voulez-vous assigner ce ticket à cette personne?")) {
        this.backendService
          .assign(this.id, this.selectUserForAssign)
          .subscribe();
      }
    }
  }

  onPrecede() {
    this.router.navigate(["/list-ticket"]);
  }
}
