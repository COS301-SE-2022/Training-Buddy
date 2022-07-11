import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'training-buddy-change-password',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
  animations: [

    trigger(
      'fadeIn', [
        transition(':enter', [
          animate(120, keyframes([
            style({
              opacity: '0'
            }),
            style({
              opacity: '1'
            })
          ]))
        ])
      ]
    )

  ]
})
export class ChangepasswordComponent implements OnInit {

  hideOld = true;
  hideOne = true;
  hideTwo = true;
  passwordFrm! : FormGroup;
  frmBuilder : FormBuilder;
  validOld = false;
  passmatch = false;

  constructor(private frm : FormBuilder) {
    this.frmBuilder = frm;
  }

  ngOnInit(): void {
    this.passwordFrm = this.frmBuilder.group({
      old: [''],
      one: ['', this.validatePassword],
      two: ['']
    });

    this.passwordFrm.valueChanges.subscribe({
      next: (data : any) => {
          if (data.two.length != 0) {
            if (data.one == data.two) {
              this.passwordFrm.controls['two'].setErrors(null);
            } else {
              this.passwordFrm.controls['two'].setErrors({
                'incorrect' : true
              });
            }
          }
      }
    })

  }

  oldComplete() {
    //query api to validate old password
    //set validOld = true
  }

  changePasswords() {

    if (this.passwordFrm.invalid) {
      return;
    }

    //check old password for validity:
    //check if validOld == true;
    //update password to the new one

  }

  //userPassword
  validatePassword(input : FormControl) : {[valtype : string] : string} | null {
    const userPassword = input.value;
    //regex for password (length >= 8, 1xCAP, 1xLOW, 1xCHAR, allows spaces)
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Z a-z\d#$@!%&*?]{8,}$/;
    if (!re.test(userPassword)) {
      //return error
      return {'error_msg' : 'Min length 8, 1x Uppercase, 1x Lowercase, 1x Special Char'}
    }
    //no error
    return null;
  }

}
