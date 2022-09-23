"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[544],{8544:(H,h,r)=>{r.r(h),r.d(h,{ClientDashboardFeatureModule:()=>E});var g=r(9808),v=r(7918),m=r(5357),p=r(9671),l=r(9444),b=r(8505),c=r(1777),e=r(5e3),_=r(1271),x=r(2160),C=r(6271),Z=r(4585),y=r(5436),T=r(3954),q=r(5245),f=r(7322),w=r(4107),O=r(508),B=r(7423),M=r(773),A=r(987);function I(n,d){1&n&&(e.TgZ(0,"h1",8),e._uU(1,"Incoming Requests"),e.qZA()),2&n&&e.Q6J("@fadeIn",void 0)}function R(n,d){if(1&n){const t=e.EpF();e.TgZ(0,"div",9)(1,"div",10)(2,"div",11),e._UZ(3,"img",12),e.qZA(),e.TgZ(4,"div",13)(5,"div",14)(6,"p",15),e._uU(7),e.qZA(),e.TgZ(8,"div",16)(9,"mat-icon",17),e.NdJ("click",function(){const s=e.CHM(t).$implicit;return e.oxw(2).accept(s.email)}),e._uU(10,"done"),e.qZA(),e.TgZ(11,"mat-icon",18),e.NdJ("click",function(){const s=e.CHM(t).$implicit;return e.oxw(2).reject(s.email)}),e._uU(12,"close"),e.qZA()()(),e.TgZ(13,"div",19),e._uU(14),e.qZA(),e.TgZ(15,"p",20),e._uU(16),e.qZA(),e.TgZ(17,"p",20),e._uU(18),e.qZA()()()()}if(2&n){const t=d.$implicit,i=e.oxw(2);e.Q6J("@fadeIn",void 0),e.xp6(3),e.s9C("src",t.image,e.LSH),e.xp6(4),e.AsE("",t.userName," ",t.userSurname,""),e.xp6(7),e.Oqu(t.location),e.xp6(2),e.Oqu(t.bio),e.xp6(2),e.Oqu(i.getSportString(t))}}function U(n,d){if(1&n&&(e.TgZ(0,"div",5),e.YNc(1,I,2,1,"h1",6),e.ynx(2),e.YNc(3,R,19,7,"div",7),e.BQk(),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.pendingrequests),e.xp6(2),e.Q6J("ngForOf",t.requests)("ngForTrackBy",t.trackById)}}function k(n,d){1&n&&(e.TgZ(0,"mat-hint",8),e._uU(1,"No Recommended Buddies"),e.qZA())}function P(n,d){1&n&&(e.ynx(0),e.TgZ(1,"mat-hint",8),e._uU(2,"Try another sport or increase your "),e.qZA(),e.TgZ(3,"a",34)(4,"u"),e._uU(5,"Buddy Distance"),e.qZA()(),e.BQk())}function D(n,d){if(1&n){const t=e.EpF();e.TgZ(0,"button",46),e.NdJ("click",function(){e.CHM(t);const o=e.oxw().$implicit;return e.oxw(2).sendRequest(o.email)}),e._uU(1,"Request"),e.qZA()}}function S(n,d){1&n&&(e.TgZ(0,"button",47),e._uU(1,"Pending"),e.qZA())}function N(n,d){if(1&n){const t=e.EpF();e.TgZ(0,"div",35)(1,"div",36)(2,"div",11),e._UZ(3,"img",37),e.qZA(),e.TgZ(4,"div",38)(5,"div",14)(6,"p",39),e._uU(7),e.qZA()(),e.TgZ(8,"div",19)(9,"p"),e._uU(10),e.qZA()(),e.TgZ(11,"p",20),e._uU(12),e.qZA(),e.TgZ(13,"div",40)(14,"div",41)(15,"button",42),e.NdJ("click",function(){const s=e.CHM(t).$implicit;return e.oxw(2).removeRec(s)}),e._uU(16,"Not Interested"),e.qZA()(),e.TgZ(17,"div",43),e.YNc(18,D,2,0,"button",44),e.YNc(19,S,2,0,"button",45),e.qZA()()()()()}if(2&n){const t=d.$implicit,i=e.oxw(2);e.Q6J("@fadeIn",void 0),e.xp6(3),e.MGl("routerLink","/profile/",t.id,""),e.s9C("src",t.image,e.LSH),e.xp6(3),e.MGl("routerLink","/profile/",t.id,""),e.xp6(1),e.AsE("",t.userName," ",t.userSurname,""),e.xp6(3),e.Oqu(t.location),e.xp6(2),e.Oqu(t.bio),e.xp6(6),e.Q6J("ngIf",!i.inOutgoing(t.email)),e.xp6(1),e.Q6J("ngIf",i.inOutgoing(t.email))}}function F(n,d){if(1&n){const t=e.EpF();e.TgZ(0,"div",21)(1,"h1",8),e._uU(2,"Recommended"),e.qZA(),e.TgZ(3,"div",22)(4,"mat-form-field",23)(5,"mat-label"),e._uU(6,"Filter Sport Type"),e.qZA(),e.TgZ(7,"mat-select",24,25),e.NdJ("selectionChange",function(){e.CHM(t);const o=e.MAs(8);return e.oxw().filter(o.value)}),e.TgZ(9,"mat-option",26),e._uU(10,"None"),e.qZA(),e.TgZ(11,"mat-option",27),e._uU(12,"Run"),e.qZA(),e.TgZ(13,"mat-option",28),e._uU(14,"Ride"),e.qZA(),e.TgZ(15,"mat-option",29),e._uU(16,"Swim"),e.qZA(),e.TgZ(17,"mat-option",30),e._uU(18,"Weights"),e.qZA()()()(),e.TgZ(19,"div",22)(20,"div",31),e.YNc(21,k,2,0,"mat-hint",6),e._UZ(22,"br"),e.YNc(23,P,6,0,"ng-container",32),e.qZA()(),e.YNc(24,N,20,10,"div",33),e.qZA()}if(2&n){const t=e.oxw();e.Q6J("@fadeIn",void 0),e.xp6(21),e.Q6J("ngIf",t.noBuddies),e.xp6(2),e.Q6J("ngIf",t.noBuddies),e.xp6(1),e.Q6J("ngForOf",t.buddies)("ngForTrackBy",t.trackById)}}function J(n,d){1&n&&(e.TgZ(0,"div",48),e._UZ(1,"mat-spinner"),e.qZA())}const j=[{path:"",component:(()=>{class n{constructor(t,i,o,s,a){this.snackBar=t,this.apollo=i,this.cookieService=o,this.firestore=s,this.afStorage=a,this.requests=[],this.oldBuddies=[],this.buddies=[],this.pendingrequests=!1,this.doneloading=!1,this.noBuddies=!0,this.email=this.cookieService.get("email")}sendRequest(t){this.apollo.mutate({mutation:l.Ps`mutation{
          sendRequest(
            Sender: "${this.email}",
            Receiver: "${t}"
          ),{
            message
          }
        }
        `}).subscribe({next:()=>{this.snackBar.open("Invitation successfully sent.","X",{duration:3e3})}})}ifPendingRequests(){return null==this.requests}ngOnInit(){var i,t=this;this.firestore.collection("Users",i=>i.where("email","==",this.email)).valueChanges().subscribe(i=>{null!=this.buddies&&i[0].buddies.forEach(s=>{this.buddies.forEach((a,u)=>{s==a.email&&this.buddies.splice(u,1)})})}),this.getBuddieRecommended().subscribe({next:(i=(0,p.Z)(function*(o){const s=t.removeOverlapConnections(o.data.findAll);yield t.fetchImages(s).then(a=>{t.buddies=a,t.oldBuddies=a,console.log("buddies",t.buddies),0==t.buddies.length&&(t.noBuddies=!1),t.doneloading=!0})}),function(s){return i.apply(this,arguments)})}),this.firestore.collection("BuddyRequests",i=>i.where("receiver","==",this.email)).valueChanges().subscribe(i=>{this.requests=[],this.pendingrequests=!1,0!=i.length&&(this.pendingrequests=!0,i.forEach(o=>{this.firestore.collection("Users",s=>s.where("email","==",o.sender)).valueChanges().subscribe(s=>{this.requests=[],s.forEach(a=>{this.fetchSingleImage(a).then(u=>{this.requests.push(u)})})})}))}),this.firestore.collection("BuddyRequests",i=>i.where("sender","==",this.email)).valueChanges().subscribe(i=>{this.outgoingRequests=i})}fetchSingleImage(t){return new Promise((i,o)=>{this.afStorage.ref(`UserProfileImage/${t.id}`).getDownloadURL().pipe((0,b.b)(s=>{const a={image:s};i(Object.assign(Object.assign({},t),a))})).subscribe()})}fetchImages(t){return new Promise((i,o)=>{const s=[];t.forEach(a=>{this.afStorage.ref(`UserProfileImage/${a.id}`).getDownloadURL().pipe((0,b.b)(u=>{const Y={image:u},L=Object.assign(Object.assign({},a),Y);s.push(L)})).subscribe()}),i(s)})}removeRec(t){this.buddies=this.buddies.filter(i=>t.email!=i.email),this.oldBuddies=this.oldBuddies.filter(i=>t.email!=i.email)}trackById(t,i){return t.id}removeOverlapConnections(t){if(null==t)return t;const i=[];return t.map(o=>{let s=!0;o.buddies.map(a=>{this.email==a&&(s=!1)}),s&&i.push(o)}),i}filterOutgoing(t){const i=[];return t.map(o=>{o.sender==this.email&&i.push(o)}),i}getUsersFromRequests(t){var i=this;return(0,p.Z)(function*(){const o=[];return i.firestore.collection("Users").valueChanges().subscribe(s=>{t.map(a=>{s.map(u=>{u.email!=a.sender||o.push(u)})})}),yield i.fetchImages(o)})()}filterIncoming(t){const i=[];return t.map(o=>{o.receiver==this.email&&i.push(o)}),i}getOutgoing(){return this.apollo.query({query:l.Ps`query{
          getOutgoing(
            email: "${this.email}",
        ){
          userName,
          userSurname,
          location,
          longitude,
          latitude,
          stravaToken,
          dob,
          gender,
          email,
          cellNumber,
          bio,
          metrics{lift , ride , run , swim},
          buddies
        }
        }
        `})}getBuddieRecommended(){return this.apollo.query({query:l.Ps`query{
          findAll(
            email: "${this.email}",
        ){
          userName,
          userSurname,
          location,
          longitude,
          latitude,
          stravaToken,
          dob,
          gender,
          email,
          cellNumber,
          bio,
          metrics{lift , run , swim , ride},
          buddies,
          id
        }
        }
        `})}inOutgoing(t){if(null==this.outgoingRequests)return!1;let i=!1;return this.outgoingRequests.map(o=>{o.receiver==t&&(i=!0)}),i}getSportString(t){if(null==t.metrics)return"";const i=[];t.metrics.run&&i.push("Run"),t.metrics.ride&&i.push("Ride"),t.metrics.swim&&i.push("Swim"),t.metrics.lift&&i.push("Weights");let o="";for(let s=0;s<i.length;s++)o+=i[s],s<i.length-1&&(o+=", ");return o}accept(t){this.requests.map((i,o)=>{i.email==t&&this.requests.splice(o,1)}),this.apollo.mutate({mutation:l.Ps`mutation{
        accept(
          Sender: "${t}",
          Receiver: "${this.email}"
      ){
       message
      }
      }
      `}).subscribe({next:()=>{this.snackBar.open("Request accepted.","X",{duration:2e3})},error:()=>{this.snackBar.open("Request rejected.","X",{duration:2e3})}})}reject(t){this.requests.forEach((i,o)=>{i.email==t&&(this.requests.splice(o,1),0==this.requests.length&&(this.pendingrequests=!1))}),this.apollo.mutate({mutation:l.Ps`mutation{
        reject(
          Sender: "${t}",
          Receiver: "${this.email}"
      ){
       message
      }
      }
      `}).subscribe()}getFriends(){return this.apollo.query({query:l.Ps`query{
        getConnections(
          email: "${this.email}",
        ){
          userName,
          userSurname,
          location,
          longitude,
          latitude,
          stravaToken,
          dob,
          gender,
          email,
          cellNumber,
          bio,
          metrics{lift , ride , run , swim},
          buddies
        }
      }
      `})}filter(t){if(this.noBuddies=!0,this.buddies=this.oldBuddies,"None"==t)return this.buddies=this.oldBuddies,void(0!=this.buddies.length&&(this.noBuddies=!1));"Run"==t&&this.filterMap("run"),"Ride"==t&&this.filterMap("ride"),"Swim"==t&&this.filterMap("swim"),"Lift"==t&&this.filterMap("lift"),0==this.buddies.length||(this.noBuddies=!1)}filterMap(t){this.buddies=this.buddies.filter(i=>1==i.metrics[t])}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(_.ux),e.Y36(l._M),e.Y36(x.N),e.Y36(C.ST),e.Y36(Z.Q1))},n.\u0275cmp=e.Xpm({type:n,selectors:[["training-buddy-dashboard"]],decls:7,vars:3,consts:[["id","background"],["cols","1","rows","1","rowHeight","2:1",1,"py-12"],["id","incomingRequests","class","m-8",4,"ngIf"],["id","recBuddies","class","m-8 mt-2",4,"ngIf"],["class","spinner","id","spinner",4,"ngIf"],["id","incomingRequests",1,"m-8"],["class","text-center",4,"ngIf"],["class","dynamic max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-3",4,"ngFor","ngForOf","ngForTrackBy"],[1,"text-center"],[1,"dynamic","max-w-md","mx-auto","bg-white","rounded-xl","shadow-md","overflow-hidden","md:max-w-2xl","mt-3"],[1,"md:flex"],[1,"md:shrink-0"],[1,"h-48","w-full","object-cover","md:h-full","md:w-48",3,"src"],[1,"mx-4","mb-3","mt-2"],[1,"acceptTitle"],[1,"block","mt-1","text-2xl","leading-tight","font-medium","text-black"],[1,"mr-4"],["id","accept",1,"mr-1",3,"click"],["id","reject",3,"click"],[1,"tracking-wide","text-xs","font-semibold"],[1,"mt-2","text-slate-500"],["id","recBuddies",1,"m-8","mt-2"],[1,"w-100","flex"],["id","filter","appearance","outline",1,"max-w-md","mx-auto","rounded-xl","overflow-hidden","md:max-w-2xl"],["id","filter","name","filter",3,"selectionChange"],["toggle",""],["value","None"],["value","Run"],["value","Ride"],["value","Swim"],["value","Lift"],["id","noresults",1,"max-w-md","mx-auto","overflow-hidden","md:max-w-2xl"],[4,"ngIf"],["class","dynamic mb-5 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl",4,"ngFor","ngForOf","ngForTrackBy"],["id","configurelink","routerLink","/configureprofile/update"],[1,"dynamic","mb-5","max-w-md","mx-auto","bg-white","rounded-xl","shadow-md","overflow-hidden","md:max-w-2xl"],[1,"md:flex","cursor"],[1,"h-48","w-full","object-cover","md:h-full","md:w-48",3,"routerLink","src"],[1,"mb-2","px-4","pb-4","pt-2","mt-2","card-c"],[1,"block","mt-1","text-2xl","leading-tight","font-medium","text-black",3,"routerLink"],[1,"grid","grid-cols-2","mt-2"],[1,"flex","request-buttons"],["mat-raised-button","",1,"pad-right","mr-1",3,"click"],[1,"flex","request-buttons","flex-end"],["class","pad-left action-color","mat-raised-button","",3,"click",4,"ngIf"],["class","pad-left","mat-raised-button","","disabled","",4,"ngIf"],["mat-raised-button","",1,"pad-left","action-color",3,"click"],["mat-raised-button","","disabled","",1,"pad-left"],["id","spinner",1,"spinner"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e._UZ(1,"training-buddy-unsigned-navbar"),e.TgZ(2,"mat-grid-list",1),e.YNc(3,U,4,3,"div",2),e.YNc(4,F,25,5,"div",3),e.qZA(),e.YNc(5,J,2,0,"div",4),e._UZ(6,"training-buddy-navbar"),e.qZA()),2&t&&(e.xp6(3),e.Q6J("ngIf",i.doneloading),e.xp6(1),e.Q6J("ngIf",i.doneloading),e.xp6(1),e.Q6J("ngIf",!i.doneloading))},directives:[y.B,T.Il,g.O5,g.sg,q.Hw,f.KE,f.hX,w.gD,O.ey,f.bx,m.yS,m.rH,B.lW,M.Ou,A.S],styles:[".request-card[_ngcontent-%COMP%]{max-width:400px;margin-bottom:8px}.configurelink[_ngcontent-%COMP%]{text-decoration:underline!important}mat-card[_ngcontent-%COMP%]{max-width:600px;width:90vw;margin:2em auto;padding:2em auto}#background[_ngcontent-%COMP%]{height:100vh;background-size:cover;background-repeat:no-repeat}#incomingRequests[_ngcontent-%COMP%]{background-color:#0000}.acceptTitle[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between}mat-icon[_ngcontent-%COMP%]:hover{cursor:pointer}.spinner[_ngcontent-%COMP%]     .mat-progress-spinner circle, .mat-spinner[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#000}.dynamic[_ngcontent-%COMP%]{will-change:opacity}#spinner[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}#accept[_ngcontent-%COMP%]{color:#2a7a2a;font-size:28px}#reject[_ngcontent-%COMP%]{color:#cf3f3f;font-size:28px}#filter[_ngcontent-%COMP%], #noresults[_ngcontent-%COMP%]{width:100%!important}p[_ngcontent-%COMP%]{word-break:break-all;white-space:normal;margin:0 0 1%!important}.cursor[_ngcontent-%COMP%]{cursor:pointer}.card-c[_ngcontent-%COMP%]{width:100%!important}.request-buttons[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{width:96%!important}.flex-end[_ngcontent-%COMP%]{justify-content:end!important}.action-color[_ngcontent-%COMP%]{color:#fff;background-color:#1b1a1b7c!important}"],data:{animation:[(0,c.X$)("fadeIn",[(0,c.eR)(":enter",[(0,c.jt)(200,(0,c.F4)([(0,c.oB)({opacity:"0"}),(0,c.oB)({opacity:"1"})]))]),(0,c.eR)(":leave",[(0,c.jt)(300,(0,c.F4)([(0,c.oB)({opacity:"1"}),(0,c.oB)({opacity:"0"})]))])])]}}),n})()}];let $=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[m.Bz.forChild(j)],m.Bz]}),n})();var Q=r(520);let E=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[x.N],imports:[[g.ez,$,v.W,Q.Ed]]}),n})()}}]);