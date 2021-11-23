import {ComponentFixture, fakeAsync, flush, TestBed, tick} from "@angular/core/testing";
import {MessageListComponent} from "./message-list.component";
import {SocketIOService, SocketIOServiceStub} from "../socketIO.service";
import {ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";

describe("messageListComponent", () => {

  let fixture: ComponentFixture<MessageListComponent>;
  let comp: MessageListComponent;
  let socketIOService: SocketIOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ MessageListComponent ],
      providers: [
        {
          provide: SocketIOService,
          useClass: SocketIOServiceStub
        }
      ],
    });

    fixture = TestBed.createComponent(MessageListComponent);
    comp    = fixture.componentInstance;

    socketIOService = TestBed.inject(SocketIOService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp).toBeDefined()
  });

  it('should contain several messages inside', fakeAsync(() => {
      let messageList: string[] = [];

      socketIOService.acceptMessage().subscribe( data => {
        messageList.push(data);

      });
      tick(1000);
      tick(1000);
      tick(1000);
      expect(messageList.length).toBe(3);
  }));



})

