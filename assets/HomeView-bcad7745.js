import{d as x,r as m,c as C,w as V,o as b,a as n,u as _,b as t,e as r,f as i,_ as f,g as w,h as B,F as v,i as F,j as a,k as N,l as U,m as $,t as o,n as q,p as L,U as P,q as A}from"./index-efcf3ace.js";const M={key:0,class:"container mb-8"},R={class:"flex space-x-4"},S={class:"container"},j={class:"space-y-4"},D={class:"flex flex-col space-y-4"},E={class:"font-semibold space-x-2"},T=x({__name:"HomeView",setup(H){const l=q(),k=L(),d=m(),y=C(()=>l.state.users.currentUser.role===P.admin),c=m(),u=p=>{l.dispatch("flights/getList",{pb:k,page:1,perPage:50,force:p}).then(s=>{d.value=Array.from(s.values())})},g=()=>{l.commit("modals/openModal","CreateFlightRecord")};return V(c,()=>{}),b(()=>{u(!1)}),(p,s)=>{const h=A("router-link");return a(),n(v,null,[_(y)?(a(),n("section",M,[t("div",R,[r(f,{onClick:g},{default:i(()=>[N("Create flight record")]),_:1}),r(f,{onClick:s[0]||(s[0]=e=>u(!0))},{default:i(()=>[r(_(U),{class:"h-6 w-6"})]),_:1})])])):w("",!0),t("section",S,[t("div",j,[r(B,{id:"query",type:"text",modelValue:c.value,"onUpdate:modelValue":s[1]||(s[1]=e=>c.value=e),onInput:s[2]||(s[2]=()=>{})},null,8,["modelValue"]),t("div",D,[(a(!0),n(v,null,F(d.value,e=>(a(),$(h,{to:`/flight/${e.id}`},{default:i(()=>[(a(),n("article",{class:"border rounded-md p-4 space-y-4 transition hover:bg-gray-100",key:e.id},[t("h3",E,[t("span",null,"№ "+o(e.flight_number),1),t("span",null,o(e.departure_point)+" -> "+o(e.arrival_point),1),t("span",null,o(e.departure_time)+" -> "+o(e.arrival_time),1)])]))]),_:2},1032,["to"]))),256))])])])],64)}}});export{T as default};
