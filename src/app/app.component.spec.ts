import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
  });

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Ticket'`, () => {
    expect(app.title).toEqual("Ticket");
  });

  it("should render title in a h1 tag", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain("Ticket");
  });
});
