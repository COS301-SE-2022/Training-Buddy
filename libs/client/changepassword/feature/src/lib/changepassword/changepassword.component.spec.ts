import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChangepasswordComponent } from './changepassword.component';

describe('ChangepasswordComponent', () => {
  let component: ChangepasswordComponent;
  let fixture: ComponentFixture<ChangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepasswordComponent ],
      imports:[
        ReactiveFormsModule,
        UiModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test ngOnInIt function
   */
  describe('ngOnInIt', () => {

    it('should call the ngOnInIt function', () => {

      jest.spyOn(component, 'ngOnInit');
      component.ngOnInit();

        component.passwordFrm = component.frmBuilder.group({
          old: [''],
          one: ['', component.validatePassword],
          two: ['']
        });


        component.passwordFrm.valueChanges.subscribe({
          next: (data : any) => {
              if (data.two.length != 0) {
                if (data.one == data.two) {
                  component.passwordFrm.controls['two'].setErrors(null);
                } else {
                  component.passwordFrm.controls['two'].setErrors({
                    'incorrect' : true
                  });
                }
              }
          }
        });


      expect(component.ngOnInit).toHaveBeenCalled();

    });

  });


});
