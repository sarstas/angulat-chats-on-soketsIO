import {ComponentFixture, TestBed} from "@angular/core/testing";
import {SendFormComponent} from "./send-form.component";
import {SocketIOService, SocketIOServiceStub} from "../socketIO.service";
import {ReactiveFormsModule} from "@angular/forms";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {click} from "../../test";

describe('sendFormComponent', () => {

  let fixture: ComponentFixture<SendFormComponent>;
  let comp: SendFormComponent;
  let socketIOService: SocketIOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ SendFormComponent ],
      providers: [
        {
        provide: SocketIOService,
        useClass: SocketIOServiceStub
        }
      ],
    });

    fixture = TestBed.createComponent(SendFormComponent);
    comp    = fixture.componentInstance;

    socketIOService = TestBed.inject(SocketIOService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp).toBeDefined()
  });

  it('should send message', () => {
    const spy = spyOn(socketIOService, 'sendMessage').and.callThrough();
    changeInput('Quick Brown fox');
    click(getButtonEl());

    expect(spy).toHaveBeenCalledWith('Quick Brown fox')
  });


  function getInputEl():HTMLInputElement {
    return fixture.debugElement.query(By.css('[formControlName=message]')).nativeElement;
  }

  function getButtonEl():HTMLButtonElement {
    return fixture.debugElement.query(By.css('[type=submit]')).nativeElement;
  }

  function changeInput(value: string) {
    const input: HTMLInputElement = getInputEl();
    input.value = value;
    input.dispatchEvent(new Event('input'))

    fixture.detectChanges();
  }
});

