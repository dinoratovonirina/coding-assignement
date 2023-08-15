import { Injectable } from "@angular/core";
import { BackendService } from "../backend.service";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "src/interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _listUser$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private readonly backendService: BackendService) {}

  get listUser(): Observable<User[]> {
    return this._listUser$.asObservable();
  }

  setListUser(arg: User[]) {
    this._listUser$.next(arg);
  }

  getValueListUser(): User[] {
    return this._listUser$.value;
  }

  async emitListUser() {
    await this.backendService
      .users()
      .subscribe((listUser) => this.setListUser(listUser));
  }
}
