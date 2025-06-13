let isUser = document.querySelector(".logined-user")
let findedUser = JSON.parse(localStorage.getItem("user"))
isUser.innerHTML = `${findedUser.firstName} ${findedUser.lastName}`

let elSiteList = document.querySelector(".site-list")

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