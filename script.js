/*Animation of nav*/
const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu-list");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = ()=>{
  menu.classList.add("active");
  menuBtn.classList.add("hide");
  cancelBtn.classList.add("show");
  body.classList.add("disabledScroll");
}
cancelBtn.onclick = ()=>{
  menu.classList.remove("active");
  menuBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  body.classList.remove("disabledScroll");
}

window.onscroll = ()=>{
  this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}

/*Animation of button: Click me*/
const buttons = document.querySelectorAll("a");
         buttons.forEach((button) => {
           button.onclick = function(e){
             let x = e.clientX - e.target.offsetLeft;
             let y = e.clientY - e.target.offsetTop;
             let ripple = document.createElement("span");
             ripple.style.left = `${x}px`;
             ripple.style.top = `${y}px`;
             this.appendChild(ripple);
             setTimeout(function(){
               ripple.remove();
             }, 600); // 1second = 1000ms
           }
         });