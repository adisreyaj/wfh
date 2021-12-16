import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LookingForPage } from './looking-for.component';

describe('LookingForComponent', () => {
  let component: LookingForPage;
  let fixture: ComponentFixture<LookingForPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LookingForPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookingForPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
