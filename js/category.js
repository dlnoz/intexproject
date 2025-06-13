let isUser = document.querySelector(".logined-user")
let findedUser = JSON.parse(localStorage.getItem("user"))
isUser.innerHTML = `${findedUser.firstName} ${findedUser.lastName}`


let modalWrapper = document.querySelector(".modal-wrapper")
let modalInner = document.querySelector(".modal-inner")

let elSiteList = document.querySelector(".site-list")

//Sign out start
isUser.parentElement.addEventListener("click", () => {
    modalWrapper.classList.remove("scale-0")
    modalInner.innerHTML = `
    <div class="w-[600px]">
    <h1 class="font-bold mb-[20px] text-[35px] text-center">Хотите выйти?</h1>
    <div class="flex items-center justify-center gap-[20px]">
    <button onclick="handleCancel()" class="hover:bg-transparent hover:text-green-700   border-[2px] border-green-700 duration-300 w-[48%] p-[8px] bg-green-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px] " >
    Остаться
    </button>
    <button onclick="handleSignOut()" class="hover:bg-transparent hover:text-red-700  border-[2px] border-red-700 duration-300 w-[48%] p-[8px] bg-red-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px] ">
    Выйти
    </button>
    </div>
    </div>
    `
})

function handleCancel(){
    modalWrapper.classList.add("scale-0")
}
function handleSignOut(){
    modalWrapper.classList.add("scale-0")
    setTimeout(() => {
        localStorage.clear()
        location.pathname = "/"
    },800)
}

modalWrapper.addEventListener("click", (e) => e.target.id == "wrapper" && modalWrapper.classList.add("scale-0"))

//Add category part start
function handleAddCategoryBtnClick(){
    modalWrapper.classList.remove("scale-0")
    modalInner.innerHTML = `
    <div class="w-[1000px] h-[423px] bg-white rounded-md ">
    <strong class="font-semibold  flex justify-center text-[50px] text-[rgba(0,147,152,1)] ">Добавить категории</strong>

  <div class="flex justify-around items-center mt-[70px]">
   <div>
    <span class="p-10 text-[23px] leading-[32px] text-[rgba(137,137,137,1)]"> Название</span>
    <div class="flex gap-[4px] items-center">
    <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 13.05V15.95C30.7607 15.95 30.5455 16.4575 30.5455 17.8553V24.3774C30.5455 28.0227 28.4218 28.9536 24.7273 29V26.1C26.7695 26.0536 27.6364 26.3233 27.6364 24.128V17.8974C27.5787 17.1191 27.7262 16.3393 28.064 15.6354C28.384 15.086 28.9029 14.6797 29.5142 14.5C28.9029 14.3203 28.384 13.914 28.064 13.3647C27.7262 12.6607 27.5787 11.8809 27.6364 11.1026V4.87055C27.6364 2.6767 26.7695 2.9464 24.7273 2.9V0C28.4218 0.0464 30.5455 0.9773 30.5455 4.6226V11.1447C30.5455 12.541 30.7607 13.05 32 13.05ZM0 13.05V15.95C1.23927 15.95 1.45455 16.4575 1.45455 17.8553V24.3774C1.45455 28.0227 3.57818 28.9536 7.27273 29V26.1C5.23055 26.0536 4.36364 26.3233 4.36364 24.128V17.8974C4.42126 17.1191 4.27385 16.3393 3.936 15.6354C3.61569 15.0857 3.09616 14.6793 2.48436 14.5C3.09616 14.3207 3.61569 13.9143 3.936 13.3647C4.27385 12.6607 4.42126 11.8809 4.36364 11.1026V4.87055C4.36364 2.6767 5.23055 2.9464 7.27273 2.9V0C3.57818 0.0464 1.45455 0.9773 1.45455 4.6226V11.1447C1.45455 12.541 1.23927 13.05 0 13.05ZM24.7273 10.15H7.27273V18.85H24.7273V10.15ZM10.1818 13.05H21.8182V15.95H10.1818V13.05Z" fill="#545454"/>
    </svg>
     <input  type="text" class="w-[378px] pl-5 outline-none shadow-slate-400 focus:shadow-[rgba(0,147,152,1)] text-[20px] py-3 bg-white shadow-md"  />
    </div>
   </div>

   <div>
    <span class="p-10 text-[23px] leading-[32px] text-[rgba(137,137,137,1)]"> На узбекском</span>
    <div class="flex gap-[4px] items-center">
    <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 13.05V15.95C30.7607 15.95 30.5455 16.4575 30.5455 17.8553V24.3774C30.5455 28.0227 28.4218 28.9536 24.7273 29V26.1C26.7695 26.0536 27.6364 26.3233 27.6364 24.128V17.8974C27.5787 17.1191 27.7262 16.3393 28.064 15.6354C28.384 15.086 28.9029 14.6797 29.5142 14.5C28.9029 14.3203 28.384 13.914 28.064 13.3647C27.7262 12.6607 27.5787 11.8809 27.6364 11.1026V4.87055C27.6364 2.6767 26.7695 2.9464 24.7273 2.9V0C28.4218 0.0464 30.5455 0.9773 30.5455 4.6226V11.1447C30.5455 12.541 30.7607 13.05 32 13.05ZM0 13.05V15.95C1.23927 15.95 1.45455 16.4575 1.45455 17.8553V24.3774C1.45455 28.0227 3.57818 28.9536 7.27273 29V26.1C5.23055 26.0536 4.36364 26.3233 4.36364 24.128V17.8974C4.42126 17.1191 4.27385 16.3393 3.936 15.6354C3.61569 15.0857 3.09616 14.6793 2.48436 14.5C3.09616 14.3207 3.61569 13.9143 3.936 13.3647C4.27385 12.6607 4.42126 11.8809 4.36364 11.1026V4.87055C4.36364 2.6767 5.23055 2.9464 7.27273 2.9V0C3.57818 0.0464 1.45455 0.9773 1.45455 4.6226V11.1447C1.45455 12.541 1.23927 13.05 0 13.05ZM24.7273 10.15H7.27273V18.85H24.7273V10.15ZM10.1818 13.05H21.8182V15.95H10.1818V13.05Z" fill="#545454"/>
    </svg>
     <input  type="text" class="w-[378px] pl-5 outline-none shadow-slate-400 focus:shadow-[rgba(0,147,152,1)] text-[20px] py-3 bg-white shadow-md"  />
    </div>
   </div>
  </div>  
  
  <div class="flex justify-center mt-[70px]">
    <button class="w-[237px] hover:text-[rgba(0,147,152,1)] hover:bg-transparent duration-300 border-[2px] border-[rgba(0,147,152,1)] bg-[rgba(0,147,152,1)] text-[rgba(255,255,255,1)] font-bold text-[25px] px-[15px] pt-[8px] pb-[4px] rounded-[25px]  ">Добавить</button>
  </div>

    </div>
    `
}

//Change site
elSiteList.addEventListener("click", function(e){
    if(e.target.textContent == "Продукты"){
       location.pathname = "/admin.html"
    }
    else if(e.target.textContent == "Заказы"){
       location.pathname = "/order.html"
    }
    else if(e.target.textContent == "Категории"){
       location.pathname = "/category.html"
    }
     else if(e.target.textContent == "Сайт"){
       location.pathname = "/site.html"
    }
})