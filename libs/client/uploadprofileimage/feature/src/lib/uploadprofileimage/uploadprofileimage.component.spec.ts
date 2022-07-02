import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadprofileimageComponent } from './uploadprofileimage.component';

describe('UploadprofileimageComponent', () => {
  let component: UploadprofileimageComponent;
  let fixture: ComponentFixture<UploadprofileimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadprofileimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadprofileimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
