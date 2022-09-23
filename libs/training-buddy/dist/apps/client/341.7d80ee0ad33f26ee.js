"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[341],{4341:(b,M,n)=>{n.r(M),n.d(M,{ClientLoginFeatureModule:()=>A});var h=n(9808),x=n(5357),u=n(3075),l=n(9444),e=n(5e3),t=n(1271),i=n(2160),s=n(3954),d=n(9224),m=n(2786),g=n(7322),v=n(7531),p=n(7423),a=n(5245);function C(o,f){1&o&&(e.TgZ(0,"mat-error")(1,"p",5),e._uU(2,"Login failed. Incorrect credentials provided."),e.qZA()())}function k(o,f){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Email is required "),e.qZA())}function y(o,f){1&o&&(e.TgZ(0,"mat-error"),e._uU(1," Password is required "),e.qZA())}const P=function(o){return{"background-image":o}},I=[{path:"",component:(()=>{class o{constructor(c,r,L,Z,E){this.snack=c,this.frm=r,this.apollo=L,this.router=Z,this.cookieService=E,this.loginFailed=!1,this.img="https://images.unsplash.com/photo-1512941675424-1c17dabfdddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",this.frmBuilder=r,this.hide=!0,this.userEmail="",this.userPassword=""}ngOnInit(){this.loginFrm=this.frmBuilder.group({userEmail:["",u.kI.required],userPassword:["",u.kI.required]})}login(){for(const c in this.loginFrm.controls)if(this.loginFrm.controls[c].invalid)return;this.loginFailed=!1,this.userEmail=this.loginFrm.controls.userEmail.value,this.userPassword=this.loginFrm.controls.userPassword.value,this.queryLogin().subscribe(c=>{var r;console.log(c.data.login.user.email),null==(null===(r=c.data)||void 0===r?void 0:r.login.user.email)?(console.log("invalid credentials"),this.loginFailed=!0):(this.cookieService.set("email",c.data.login.user.email),this.cookieService.set("id",c.data.login.user.id),this.router.navigate(["/dashboard"]))})}queryLogin(){return this.apollo.mutate({mutation:l.Ps`
      mutation{
        login(loginInput:{
          username: "${this.userEmail}",
          password: "${this.userPassword}"
        }){
          user{
            userName,
            userSurname,
            email,
            id
          }
        }
      }
    `})}}return o.\u0275fac=function(c){return new(c||o)(e.Y36(t.ux),e.Y36(u.qu),e.Y36(l._M),e.Y36(x.F0),e.Y36(i.N))},o.\u0275cmp=e.Xpm({type:o,selectors:[["training-buddy-loginpage"]],decls:34,vars:11,consts:[["id","background",3,"ngStyle"],["cols","1","rowHeight","fit"],[3,"formGroup"],[1,"center","w-100"],["dark","true","height","80"],[1,"text-center"],[4,"ngIf"],["appearance","outline"],["formControlName","userEmail","id","userEmail","matInput","","type","email","placeholder","user@domain.com","name","userEmail"],["formControlName","userPassword","id","userPassword","matInput","","name","userPassword",3,"type"],["type","button","mat-icon-button","","matSuffix","",3,"click"],[1,"submitButton","mt-3"],["id","login","mat-raised-button","","color","primary",1,"text-center","ml-1",3,"click"],[1,"signUp"],["routerLink","/signup",1,"signUpLink"]],template:function(c,r){1&c&&(e.TgZ(0,"div",0)(1,"mat-grid-list",1)(2,"mat-grid-tile")(3,"mat-card")(4,"mat-card-content")(5,"form",2)(6,"div",3),e._UZ(7,"training-buddy-logo",4),e.qZA(),e._UZ(8,"br")(9,"br"),e.TgZ(10,"h1",5),e._uU(11,"Log In"),e.qZA(),e.YNc(12,C,3,0,"mat-error",6),e.TgZ(13,"mat-form-field",7)(14,"mat-label"),e._uU(15,"Email"),e.qZA(),e._UZ(16,"input",8),e.YNc(17,k,2,0,"mat-error",6),e.qZA(),e.TgZ(18,"mat-form-field",7)(19,"mat-label"),e._uU(20,"Password"),e.qZA(),e._UZ(21,"input",9),e.TgZ(22,"button",10),e.NdJ("click",function(){return r.hide=!r.hide}),e.TgZ(23,"mat-icon"),e._uU(24),e.qZA()(),e.YNc(25,y,2,0,"mat-error",6),e.qZA(),e.TgZ(26,"div",11)(27,"button",12),e.NdJ("click",function(){return r.login()}),e._uU(28,"Login"),e.qZA(),e.TgZ(29,"div",13)(30,"p"),e._uU(31,"No Account?"),e.qZA(),e.TgZ(32,"p",14),e._uU(33,"Sign Up"),e.qZA()()()()()()()()()),2&c&&(e.Q6J("ngStyle",e.VKq(9,P,"url("+r.img+")")),e.xp6(5),e.Q6J("formGroup",r.loginFrm),e.xp6(7),e.Q6J("ngIf",r.loginFailed),e.xp6(5),e.Q6J("ngIf",r.loginFrm.controls.userEmail.errors),e.xp6(4),e.Q6J("type",r.hide?"password":"text"),e.xp6(1),e.uIk("aria-label","Hide password")("aria-pressed",r.hide),e.xp6(2),e.Oqu(r.hide?"visibility_off":"visibility"),e.xp6(1),e.Q6J("ngIf",r.loginFrm.controls.userPassword.errors))},directives:[h.PC,s.Il,s.DX,d.a8,d.dn,u._Y,u.JL,u.sg,m.R,h.O5,g.TO,g.KE,g.hX,u.Fj,v.Nt,u.JJ,u.u,p.lW,g.R9,a.Hw,x.rH],styles:["mat-grid-list[_ngcontent-%COMP%]{height:100vw;max-height:80vh;min-height:400px}@media (max-width: 300px){mat-grid-list[_ngcontent-%COMP%]{background-color:transparent}}@media (max-width: 1035px){mat-grid-list[_ngcontent-%COMP%]{height:100vh}}mat-card[_ngcontent-%COMP%]{width:90vw;max-width:400px}.text-center[_ngcontent-%COMP%]{text-align:center}.submitButton[_ngcontent-%COMP%]{text-align:center;width:100%}.forgotpassword[_ngcontent-%COMP%]{text-align:right;text-decoration:underline}mat-form-field[_ngcontent-%COMP%]{display:block}#login[_ngcontent-%COMP%]{width:100%;background-color:#1b1a1b!important}.signUp[_ngcontent-%COMP%]{text-align:right;margin-top:1%;display:flex;flex-direction:row;justify-content:flex-end}.signUpLink[_ngcontent-%COMP%]{text-decoration:underline;color:#4350af;margin-left:1%}.signUpLink[_ngcontent-%COMP%]:hover{cursor:pointer}#background[_ngcontent-%COMP%]{height:100vh;background-size:cover;background-repeat:no-repeat}.lightgrey[_ngcontent-%COMP%]{color:#a4a4a4}mat-error[_ngcontent-%COMP%]{text-align:right}.w-100[_ngcontent-%COMP%]{width:100%!important}.center[_ngcontent-%COMP%]{display:flex;justify-content:center}"]}),o})()}];let U=(()=>{class o{}return o.\u0275fac=function(c){return new(c||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[x.Bz.forChild(I)],x.Bz]}),o})();var w=n(7918);let A=(()=>{class o{}return o.\u0275fac=function(c){return new(c||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({providers:[u.qu,l._M,i.N],imports:[[h.ez,U,w.W,u.UX,u.u5]]}),o})()},2160:(b,M,n)=>{n.d(M,{N:()=>u});var h=n(5e3),x=n(9808);let u=(()=>{class l{constructor(t,i){this.document=t,this.platformId=i,this.documentIsAccessible=(0,x.NF)(this.platformId)}static getCookieRegExp(t){const i=t.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi,"\\$1");return new RegExp("(?:^"+i+"|;\\s*"+i+")=(.*?)(?:;|$)","g")}static safeDecodeURIComponent(t){try{return decodeURIComponent(t)}catch(i){return t}}check(t){return!!this.documentIsAccessible&&(t=encodeURIComponent(t),l.getCookieRegExp(t).test(this.document.cookie))}get(t){if(this.documentIsAccessible&&this.check(t)){t=encodeURIComponent(t);const s=l.getCookieRegExp(t).exec(this.document.cookie);return s[1]?l.safeDecodeURIComponent(s[1]):""}return""}getAll(){if(!this.documentIsAccessible)return{};const t={},i=this.document;return i.cookie&&""!==i.cookie&&i.cookie.split(";").forEach(s=>{const[d,m]=s.split("=");t[l.safeDecodeURIComponent(d.replace(/^ /,""))]=l.safeDecodeURIComponent(m)}),t}set(t,i,s,d,m,g,v){if(!this.documentIsAccessible)return;if("number"==typeof s||s instanceof Date||d||m||g||v)return void this.set(t,i,{expires:s,path:d,domain:m,secure:g,sameSite:v||"Lax"});let p=encodeURIComponent(t)+"="+encodeURIComponent(i)+";";const a=s||{};a.expires&&(p+="number"==typeof a.expires?"expires="+new Date((new Date).getTime()+1e3*a.expires*60*60*24).toUTCString()+";":"expires="+a.expires.toUTCString()+";"),a.path&&(p+="path="+a.path+";"),a.domain&&(p+="domain="+a.domain+";"),!1===a.secure&&"None"===a.sameSite&&(a.secure=!0,console.warn(`[ngx-cookie-service] Cookie ${t} was forced with secure flag because sameSite=None.More details : https://github.com/stevermeister/ngx-cookie-service/issues/86#issuecomment-597720130`)),a.secure&&(p+="secure;"),a.sameSite||(a.sameSite="Lax"),p+="sameSite="+a.sameSite+";",this.document.cookie=p}delete(t,i,s,d,m="Lax"){if(!this.documentIsAccessible)return;const g=new Date("Thu, 01 Jan 1970 00:00:01 GMT");this.set(t,"",{expires:g,path:i,domain:s,secure:d,sameSite:m})}deleteAll(t,i,s,d="Lax"){if(!this.documentIsAccessible)return;const m=this.getAll();for(const g in m)m.hasOwnProperty(g)&&this.delete(g,t,i,s,d)}}return l.\u0275fac=function(t){return new(t||l)(h.LFG(x.K0),h.LFG(h.Lbi))},l.\u0275prov=h.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()}}]);