"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[391],{391:(U,b,i)=>{i.r(b),i.d(b,{ClientSignupFeatureModule:()=>J});var v=i(9808),C=i(5357),m=i(3075),l=i(9444),e=i(5e3),o=i(1271),s=i(2160),c=i(5436),f=i(3954),d=i(9224),g=i(7322),S=i(7531),x=i(7423),u=i(5245),Z=i(6856),M=i(4107),y=i(508),N=i(623);function I(n,p){if(1&n&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.hij(" ",t.signupFrm.controls.userNameSurname.errors.error_msg," ")}}function P(n,p){if(1&n&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.hij(" ",t.signupFrm.controls.userEmail.errors.error_msg," ")}}function k(n,p){if(1&n&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.hij(" ",t.signupFrm.controls.userPassword.errors.error_msg," ")}}function w(n,p){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," Date of Birth is required "),e.qZA())}function F(n,p){if(1&n&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.hij(" ",t.signupFrm.controls.userCellNumber.errors.error_msg," ")}}function L(n,p){if(1&n&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.hij(" ",t.signupFrm.controls.userGender.errors.error_msg," ")}}function D(n,p){if(1&n&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.hij(" ",t.signupFrm.controls.userLocation.errors.error_msg," ")}}const E=function(n){return{"background-image":n}},O=[{path:"",component:(()=>{class n{constructor(t,r,a,h,A){this.snack=t,this.frm=r,this.apollo=a,this.router=h,this.cookieService=A,this.img="https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",this.frmBuilder=r,this.hide=!0,this.latitude=0,this.longitude=0,this.vicinity=""}ngOnInit(){this.signupFrm=this.frm.group({userNameSurname:["",this.validateNameSurname],userEmail:["",this.validateEmail],userPassword:["",this.validatePassword],userDOB:["",m.kI.required],userCellNumber:["",this.validateCellNumber],userGender:["",this.validateGender],userLocation:["",this.validateLocation]})}signup(){for(const _ in this.signupFrm.controls)if(this.signupFrm.controls[_].invalid)return;const r=this.signupFrm.controls.userEmail.value;this.querySignup(this.signupFrm.controls.userNameSurname.value,r,this.signupFrm.controls.userPassword.value,this.signupFrm.controls.userDOB.value,this.signupFrm.controls.userCellNumber.value,this.signupFrm.controls.userGender.value,this.vicinity,this.longitude,this.latitude).subscribe({next:_=>{this.cookieService.set("id",_.data.signup.message),this.cookieService.set("email",r),this.router.navigate(["/configureprofile"])},error:()=>{this.snack.open("Signup failed, please try again.","X",{duration:2e3})}})}querySignup(t,r,a,h,A,T,_,G,$){const R=t.split(" ")[0],Y=t.split(" ")[1];return this.apollo.mutate({mutation:l.Ps`
            mutation{
              signup(userDto: {
                userName: "${R}",
                userSurname: "${Y}",
                location: "${_}",
                gender: "${T}",
                email: "${r}",
                cellNumber: "${A}",
                password: "${a}",
                dob: "${h}"
                longitude: ${G}
                latitude: ${$}
                stravaToken: "${"myToken"}"
              }){
                message
              }
            }
          `})}onAutocompleteSelected(t){this.vicinity=t.vicinity}onLocationSelected(t){null!=t&&(this.latitude=t.latitude,this.longitude=t.longitude)}validateNameSurname(t){return/(([A-Z]|[a-z]))+ ([A-Z]|([a-z]))+/.test(t.value)?null:{error_msg:"Name and surname is required"}}validateEmail(t){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t.value)?null:{error_msg:"Valid email is required"}}validatePassword(t){return/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Z a-z\d#$@!%&*?]{8,}$/.test(t.value)?null:{error_msg:"Min length 8, 1x Uppercase, 1x Lowercase, 1x Special Char"}}validateCellNumber(t){const a=t.value.replace(/ /g,"");return/^[0-9]{10,10}$/.test(a)?null:{error_msg:"Valid phone number is required"}}validateGender(t){return/[M]|[F]/.test(t.value)?null:{error_msg:"Valid choice required"}}validateLocation(t){return 0==t.value.length?{error_msg:"Location is required"}:null}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(o.ux),e.Y36(m.qu),e.Y36(l._M),e.Y36(C.F0),e.Y36(s.N))},n.\u0275cmp=e.Xpm({type:n,selectors:[["training-buddy-signup"]],decls:83,vars:17,consts:[["id","background",3,"ngStyle"],["cols","1","rowHeight","fit"],[3,"formGroup"],[1,"text-center"],["appearance","outline"],["formControlName","userNameSurname","id","userNameSurname","matInput","","type","text","placeholder","John Smith","name","userNameSurname"],[4,"ngIf"],["formControlName","userEmail","id","userEmail","matInput","","type","email","placeholder","user@domain.com","name","userEmail"],["formControlName","userPassword","id","userPassword","matInput","","name","userPassword",3,"type"],["type","button","mat-icon-button","","matSuffix","",3,"click"],[1,"fullhint"],["formControlName","userDOB","id","userDOB","matInput","",3,"matDatepicker"],["matSuffix","",3,"for"],["picker",""],["formControlName","userCellNumber","id","userCellNumber","matInput","","type","tel","placeholder","Phone Number","name","userCellNumber"],["formControlName","userGender","id","userGender","name","userGender"],["value","M"],["value","F"],["formControlName","userLocation","matInput","","matGoogleMapsAutocomplete","",3,"onAutocompleteSelected","onLocationSelected"],[1,"row","pBy"],[1,"b"],[1,"r"],[1,"y"],[1,"g"],[1,"submitButton","mt-3"],["id","signup","mat-raised-button","","color","primary",1,"text-center","ml-1",3,"click"],[1,"logIn"],["routerLink","/login",1,"logInLink"]],template:function(t,r){if(1&t&&(e.TgZ(0,"div",0),e._UZ(1,"training-buddy-unsigned-navbar"),e.TgZ(2,"mat-grid-list",1)(3,"mat-grid-tile")(4,"mat-card")(5,"mat-card-content")(6,"form",2)(7,"h1",3),e._uU(8,"Sign Up"),e.qZA(),e.TgZ(9,"mat-form-field",4)(10,"mat-label"),e._uU(11,"Name and Surname"),e.qZA(),e._UZ(12,"input",5),e.YNc(13,I,2,1,"mat-error",6),e.qZA(),e.TgZ(14,"mat-form-field",4)(15,"mat-label"),e._uU(16,"Email"),e.qZA(),e._UZ(17,"input",7),e.YNc(18,P,2,1,"mat-error",6),e.qZA(),e.TgZ(19,"mat-form-field",4)(20,"mat-label"),e._uU(21,"Password"),e.qZA(),e._UZ(22,"input",8),e.TgZ(23,"button",9),e.NdJ("click",function(){return r.hide=!r.hide}),e.TgZ(24,"mat-icon"),e._uU(25),e.qZA()(),e.YNc(26,k,2,1,"mat-error",6),e.TgZ(27,"mat-hint",10)(28,"div"),e._uU(29," Min length 8, 1x Uppercase, 1x Lowercase, 1x Special Char "),e.qZA()()(),e.TgZ(30,"mat-form-field",4)(31,"mat-label"),e._uU(32,"Date of Birth"),e.qZA(),e._UZ(33,"input",11)(34,"mat-datepicker-toggle",12)(35,"mat-datepicker",null,13),e.YNc(37,w,2,0,"mat-error",6),e.qZA(),e.TgZ(38,"mat-form-field",4)(39,"mat-label"),e._uU(40,"Phone Number"),e.qZA(),e._UZ(41,"input",14),e.YNc(42,F,2,1,"mat-error",6),e.qZA(),e.TgZ(43,"mat-form-field",4)(44,"mat-label"),e._uU(45,"Gender"),e.qZA(),e.TgZ(46,"mat-select",15)(47,"mat-option",16),e._uU(48,"Male"),e.qZA(),e.TgZ(49,"mat-option",17),e._uU(50,"Female"),e.qZA()(),e.YNc(51,L,2,1,"mat-error",6),e.qZA(),e.TgZ(52,"mat-form-field",4)(53,"mat-label"),e._uU(54,"Location"),e.qZA(),e.TgZ(55,"input",18),e.NdJ("onAutocompleteSelected",function(h){return r.onAutocompleteSelected(h)})("onLocationSelected",function(h){return r.onLocationSelected(h)}),e.qZA(),e.YNc(56,D,2,1,"mat-error",6),e.TgZ(57,"mat-hint",10)(58,"div")(59,"div",19)(60,"p"),e._uU(61,"powered by"),e.qZA(),e._uU(62,"\xa0"),e.TgZ(63,"p",20),e._uU(64,"G"),e.qZA(),e.TgZ(65,"p",21),e._uU(66,"o"),e.qZA(),e.TgZ(67,"p",22),e._uU(68,"o"),e.qZA(),e.TgZ(69,"p",20),e._uU(70,"g"),e.qZA(),e.TgZ(71,"p",23),e._uU(72,"l"),e.qZA(),e.TgZ(73,"p",21),e._uU(74,"e"),e.qZA()()()()(),e.TgZ(75,"div",24)(76,"button",25),e.NdJ("click",function(){return r.signup()}),e._uU(77,"Sign Up"),e.qZA(),e.TgZ(78,"div",26)(79,"p"),e._uU(80,"Have An Account?"),e.qZA(),e.TgZ(81,"p",27),e._uU(82,"Log In"),e.qZA()()()()()()()()()),2&t){const a=e.MAs(36);e.Q6J("ngStyle",e.VKq(15,E,"url("+r.img+")")),e.xp6(6),e.Q6J("formGroup",r.signupFrm),e.xp6(7),e.Q6J("ngIf",r.signupFrm.controls.userNameSurname.errors),e.xp6(5),e.Q6J("ngIf",r.signupFrm.controls.userEmail.errors),e.xp6(4),e.Q6J("type",r.hide?"password":"text"),e.xp6(1),e.uIk("aria-label","Hide password")("aria-pressed",r.hide),e.xp6(2),e.Oqu(r.hide?"visibility_off":"visibility"),e.xp6(1),e.Q6J("ngIf",r.signupFrm.controls.userPassword.errors),e.xp6(7),e.Q6J("matDatepicker",a),e.xp6(1),e.Q6J("for",a),e.xp6(3),e.Q6J("ngIf",r.signupFrm.controls.userDOB.errors),e.xp6(5),e.Q6J("ngIf",r.signupFrm.controls.userCellNumber.errors),e.xp6(9),e.Q6J("ngIf",r.signupFrm.controls.userGender.errors),e.xp6(5),e.Q6J("ngIf",r.signupFrm.controls.userLocation.errors)}},directives:[v.PC,c.B,f.Il,f.DX,d.a8,d.dn,m._Y,m.JL,m.sg,g.KE,g.hX,m.Fj,S.Nt,m.JJ,m.u,v.O5,g.TO,x.lW,g.R9,u.Hw,g.bx,Z.hl,Z.nW,Z.Mq,M.gD,y.ey,N.QT,C.rH],styles:["mat-grid-list[_ngcontent-%COMP%]{height:100vw;max-height:90vh;min-height:800px}@media (max-width: 300px){mat-grid-list[_ngcontent-%COMP%]{background-color:transparent}}@media (max-width: 1035px){mat-grid-list[_ngcontent-%COMP%]{height:100vh}}mat-card[_ngcontent-%COMP%]{width:90vw;max-width:400px}.text-center[_ngcontent-%COMP%]{text-align:center}.submitButton[_ngcontent-%COMP%]{text-align:center;width:100%}.forgotpassword[_ngcontent-%COMP%]{text-align:right;text-decoration:underline}mat-form-field[_ngcontent-%COMP%]{display:block}#signup[_ngcontent-%COMP%]{width:100%;background-color:#1b1a1b!important}.logIn[_ngcontent-%COMP%]{text-align:right;margin-top:1%;display:flex;flex-direction:row;justify-content:flex-end}.logInLink[_ngcontent-%COMP%]{text-decoration:underline;color:#4350af;margin-left:1%}.logInLink[_ngcontent-%COMP%]:hover{cursor:pointer}  .mat-form-field-wrapper{margin-bottom:-1.25em}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:flex-end}.b[_ngcontent-%COMP%]{color:#4285f4}.r[_ngcontent-%COMP%]{color:#ea4335}.y[_ngcontent-%COMP%]{color:#fbbc05}.g[_ngcontent-%COMP%]{color:#34a853}p[_ngcontent-%COMP%]{font-size:12px!important}.fullhint[_ngcontent-%COMP%]{width:100%!important}#background[_ngcontent-%COMP%]{height:100vh!important;background-size:cover;background-repeat:no-repeat}mat-error[_ngcontent-%COMP%]{text-align:right}mat-hint[_ngcontent-%COMP%]{text-align:right!important}"]}),n})()}];let q=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[C.Bz.forChild(O)],C.Bz]}),n})();var B=i(7918);let J=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[m.qu,l._M,s.N],imports:[[v.ez,q,B.W,N.Sr,m.UX,m.u5]]}),n})()},2160:(U,b,i)=>{i.d(b,{N:()=>m});var v=i(5e3),C=i(9808);let m=(()=>{class l{constructor(o,s){this.document=o,this.platformId=s,this.documentIsAccessible=(0,C.NF)(this.platformId)}static getCookieRegExp(o){const s=o.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi,"\\$1");return new RegExp("(?:^"+s+"|;\\s*"+s+")=(.*?)(?:;|$)","g")}static safeDecodeURIComponent(o){try{return decodeURIComponent(o)}catch(s){return o}}check(o){return!!this.documentIsAccessible&&(o=encodeURIComponent(o),l.getCookieRegExp(o).test(this.document.cookie))}get(o){if(this.documentIsAccessible&&this.check(o)){o=encodeURIComponent(o);const c=l.getCookieRegExp(o).exec(this.document.cookie);return c[1]?l.safeDecodeURIComponent(c[1]):""}return""}getAll(){if(!this.documentIsAccessible)return{};const o={},s=this.document;return s.cookie&&""!==s.cookie&&s.cookie.split(";").forEach(c=>{const[f,d]=c.split("=");o[l.safeDecodeURIComponent(f.replace(/^ /,""))]=l.safeDecodeURIComponent(d)}),o}set(o,s,c,f,d,g,S){if(!this.documentIsAccessible)return;if("number"==typeof c||c instanceof Date||f||d||g||S)return void this.set(o,s,{expires:c,path:f,domain:d,secure:g,sameSite:S||"Lax"});let x=encodeURIComponent(o)+"="+encodeURIComponent(s)+";";const u=c||{};u.expires&&(x+="number"==typeof u.expires?"expires="+new Date((new Date).getTime()+1e3*u.expires*60*60*24).toUTCString()+";":"expires="+u.expires.toUTCString()+";"),u.path&&(x+="path="+u.path+";"),u.domain&&(x+="domain="+u.domain+";"),!1===u.secure&&"None"===u.sameSite&&(u.secure=!0,console.warn(`[ngx-cookie-service] Cookie ${o} was forced with secure flag because sameSite=None.More details : https://github.com/stevermeister/ngx-cookie-service/issues/86#issuecomment-597720130`)),u.secure&&(x+="secure;"),u.sameSite||(u.sameSite="Lax"),x+="sameSite="+u.sameSite+";",this.document.cookie=x}delete(o,s,c,f,d="Lax"){if(!this.documentIsAccessible)return;const g=new Date("Thu, 01 Jan 1970 00:00:01 GMT");this.set(o,"",{expires:g,path:s,domain:c,secure:f,sameSite:d})}deleteAll(o,s,c,f="Lax"){if(!this.documentIsAccessible)return;const d=this.getAll();for(const g in d)d.hasOwnProperty(g)&&this.delete(g,o,s,c,f)}}return l.\u0275fac=function(o){return new(o||l)(v.LFG(C.K0),v.LFG(v.Lbi))},l.\u0275prov=v.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()}}]);