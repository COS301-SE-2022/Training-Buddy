// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FIREBASE_OPTIONS } from '@angular/fire/compat';
// import { MatDialog } from '@angular/material/dialog';
// import { RouterTestingModule } from '@angular/router/testing';
// import { UiModule } from '@training-buddy/client/shared/components/navbar/ui';
// import { Apollo } from 'apollo-angular';
// import firebase = require('firebase/compat');
// import { CookieService } from 'ngx-cookie-service';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { WorkoutComponent } from './workout.component';

// describe('WorkoutComponent', () => {
//   let component: WorkoutComponent;
//   let fixture: ComponentFixture<WorkoutComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ WorkoutComponent ],
//       imports: [
//         UiModule,
//         RouterTestingModule,
//       ],
//       providers: [
//         Apollo,
//         MatDialog,
//         CookieService,
//         { provide: FIREBASE_OPTIONS, useValue:firebase },
//         {
//           provide: AngularFirestore,
//           useValue: {}
//         },
//         { 
//           provide: AngularFireStorage,
//           useValue: undefined
//         }
//       ],
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(WorkoutComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
