!function(){"use strict";const e="Слишком короткое имя",t="Комментарий не должен быть пустым",n="Неправильная дата";let l=document.querySelector("#comment-form");function o(){l.name.value.length<3&&c(l.name,e)}function i(){l.text.value.length<1&&c(l.text,t)}function a(){let e=l.date.value.split(".");if(""==e)return;let t=new Date(e[2],Number(e[1])-1,e[0]);e[0]==t.getDate()&&e[1]==t.getMonth()+1&&e[2]==t.getFullYear()||c(l.date,n)}function c(e,t){if(e.nextElementSibling.classList.contains("comment-form__tooltip"))return;let n=document.createElement("div");n.classList.add("comment-form__tooltip"),n.innerHTML=t,e.after(n),e.addEventListener("input",r)}function r(e){e.target.nextElementSibling.remove(),e.target.removeEventListener("input",r)}function s(e){e.preventDefault(),o(),i(),a(),0==l.querySelectorAll(".comment-form__tooltip").length&&(function(e,t,n){let l=document.querySelector(".comments");l.insertAdjacentHTML("beforeend",'<div class="comment">\n        <div class="comment__info">\n            <div>\n                <div class="comment__name"></div>\n                <div class="comment__date"></div>\n            </div>\n            <span\n                class="comment__delete-icon material-symbols-outlined"\n            >\n                delete\n            </span>\n        </div>\n        <div class="comment__text"></div>\n        <div class="comment__like">\n            <span\n                class="comment__like-icon material-symbols-outlined"\n            >\n                favorite\n            </span>\n            <span>Нравится</span>\n        </div>\n    </div>');let o=l.lastElementChild,i=o.querySelector(".comment__name"),a=o.querySelector(".comment__text"),c=o.querySelector(".comment__date"),r=o.querySelector(".comment__delete-icon"),s=o.querySelector(".comment__like");i.innerHTML=e,a.innerHTML=t,c.innerHTML=n,r.addEventListener("click",u),s.addEventListener("click",d)}(l.name.value,l.text.value,function(e){let t=new Date,n=`${m(t.getHours().toString())}:${m(t.getMinutes().toString())}`,l=t;l.setDate(t.getDate()+1);let o=e.split(".");o=new Date(o[2],o[1]-1,o[0]);let i=o.getFullYear()==l.getFullYear()&&o.getMonth()==l.getMonth()&&o.getDate()==l.getDate(),a=o.getFullYear()==t.getFullYear()&&o.getMonth()==t.getMonth()&&o.getDate()==t.getDate();return""==e||a?`сегодня, ${n}`:i?`вчера, ${n}`:`${e}, ${n}`}(l.date.value)),l.reset())}function m(e){return e.length<2?"0"+e:e}function u(e){e.target.closest(".comment").remove()}function d(e){e.target.closest(".comment__like").classList.toggle("comment__like_pressed")}l.text.addEventListener("keydown",(function(e){"Enter"!=e.key||e.shiftKey||(e.preventDefault(),s(e))})),l.name.addEventListener("focusout",o),l.text.addEventListener("focusout",i),l.date.addEventListener("focusout",a),l.date.addEventListener("keydown",(function(e){if(["Enter","Backspace","Delete","Tab"].includes(e.key))return;"0123456789".includes(e.key)||e.preventDefault();let t=l.date.value.length;2!=t&&5!=t||(l.date.value+=".")})),l.addEventListener("submit",s)}();