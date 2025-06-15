let elOrderTable = document.querySelector(".order-table")
let modalWrapper = document.querySelector(".modal-wrapper")
let modalInner = document.querySelector(".modal-inner")
let elSearchInput = document.querySelector(".search-input")
let orders = JSON.parse(localStorage.getItem("orders"))

let elSiteList = document.querySelector(".site-list")

// Complated Part
function handleCheck(id){
    let findObj = orders.find(item => item.id == id)
    findObj.isComplated = !findObj.isComplated
    localStorage.setItem("orders", JSON.stringify(orders))
    renderProducts(orders, elOrderTable)
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