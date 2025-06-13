let isUser = document.querySelector(".logined-user")
let findedUser = JSON.parse(localStorage.getItem("user"))
isUser.innerHTML = `${findedUser.firstName} ${findedUser.lastName}`


let modalWrapper = document.querySelector(".modal-wrapper")
let modalInner = document.querySelector(".modal-inner")

let elCategoryList = document.querySelector(".category-list")
let elText = document.querySelector(".content-text")

let elSiteList = document.querySelector(".site-list")

let products = JSON.parse(localStorage.getItem("products")) || [] 
let elProductsTable = document.querySelector(".products-table")

let elSearchInput = document.querySelector(".search-input")

let activeList = "border-b-[3px] cursor-pointer border-[#009398] text-[#009398] font-bold text-[30px]"
let notActiveList = "text-[#A6A6A6] border-b-[3px] border-transparent cursor-pointer font-bold text-[30px]"


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

//change category 
elCategoryList.addEventListener("click", function(e){
    if(e.target.textContent == "Каркасные"){
        e.target.className = activeList
       
        e.target.nextElementSibling.className = notActiveList
        renderProducts(products, elProductsTable, "0")
    }

    else if(e.target.textContent == "Надувные"){
        e.target.className = activeList

        e.target.previousElementSibling.className = notActiveList
        renderProducts(products, elProductsTable, "1")
        
    }

})

//Render products start
function renderProducts(arr, list, categoryId){
    list.innerHTML = null
    if(categoryId){
          arr.filter(value => value.categoryId == categoryId).forEach((item) => {
        let elTr = document.createElement("tr")
        elTr.className = "bg-white  rounded-[35px]"
        elTr.innerHTML = `
        <td class="text-center py-[17px] bg-white">
            <img class="mx-auto" src="${item.imgURL}" alt="Pool img" width="110" height="41">
        </td>
        <td class="bg-white py-[17px] text-[20px]">
            <div class="flex flex-col">
                <span class="text-[12px] w-[76px] text-[#A6A6A6] relative before:w-[100%] before:h-[1px] before:bg-red-500 before:absolute before:rotate-[6deg] before:top-[7px]"> ${item.oldPrice}сум</span>
                <strong class="text-[18px]">${item.newPrice}сум</strong>
            </div>
        </td>
            <td class="bg-white py-[17px] text-[20px]">
            ${item.categoryId == "0" ? "Каркасные" : "Надувные"}
        </td>
        <td class="bg-white py-[17px] text-[20px]">
            ${item.quantity}
        </td>
            <td class="bg-white py-[17px] text-[20px]">
            ${item.frameId == "0" ? "Металлический" : (item.frameId == "1" ? "Прямоугольная" : "Рамка призмы")}
        </td>
        <td class="py-[17px] text-center bg-white ">
            <button onclick="handleUpdateProduct(${item.id})" class="cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.750122 13.8125V17.2499H4.18752L14.3255 7.11191L10.8881 3.67234L0.750122 13.8125ZM16.9847 4.45268C17.0697 4.36793 17.1372 4.26722 17.1832 4.15635C17.2292 4.04547 17.2529 3.9266 17.2529 3.80655C17.2529 3.6865 17.2292 3.56763 17.1832 3.45675C17.1372 3.34588 17.0697 3.24517 16.9847 3.16041L14.8396 1.01529C14.7548 0.930268 14.6541 0.862814 14.5432 0.816788C14.4323 0.770762 14.3135 0.74707 14.1934 0.74707C14.0734 0.74707 13.9545 0.770762 13.8436 0.816788C13.7328 0.862814 13.632 0.930268 13.5473 1.01529L11.8697 2.69827L15.3071 6.13026L16.9847 4.45268Z" fill="#3F8C8E"/>
                </svg>
            </button>
            <button onclick="handleDeleteProduct(${item.id},${item.categoryId})" class="cursor-pointer ml-[18px]">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00003 0.571289C8.80636 0.571288 9.58185 0.881202 10.1661 1.43693C10.7503 1.99266 11.0986 2.75168 11.139 3.557L11.1429 3.71415H15.0715C15.2717 3.71437 15.4643 3.79105 15.61 3.92853C15.7556 4.066 15.8432 4.25389 15.8549 4.45381C15.8667 4.65373 15.8016 4.85059 15.6731 5.00416C15.5446 5.15773 15.3622 5.25642 15.1634 5.28007L15.0715 5.28557H14.4044L13.4772 16.7201C13.4174 17.4579 13.0821 18.1462 12.5379 18.648C11.9937 19.1499 11.2805 19.4285 10.5402 19.4284H5.45981C4.71955 19.4285 4.00639 19.1499 3.46219 18.648C2.91799 18.1462 2.58263 17.4579 2.52281 16.7201L1.59488 5.28557H0.928598C0.73615 5.28555 0.550404 5.21489 0.406591 5.08701C0.262778 4.95913 0.1709 4.78291 0.148383 4.59179L0.142883 4.49986C0.142909 4.30741 0.213563 4.12167 0.341445 3.97785C0.469327 3.83404 0.645543 3.74216 0.836669 3.71965L0.928598 3.71415H4.85717C4.85717 2.88061 5.18829 2.08121 5.77769 1.49181C6.36709 0.902411 7.16649 0.571289 8.00003 0.571289ZM6.23217 7.83915C6.08977 7.83915 5.95219 7.89072 5.84487 7.98432C5.73755 8.07792 5.66775 8.20721 5.64838 8.34829L5.64288 8.42843V14.7141L5.64838 14.7943C5.66779 14.9353 5.7376 15.0646 5.84492 15.1581C5.95224 15.2517 6.0898 15.3032 6.23217 15.3032C6.37454 15.3032 6.5121 15.2517 6.61942 15.1581C6.72673 15.0646 6.79655 14.9353 6.81595 14.7943L6.82145 14.7141V8.42843L6.81595 8.34829C6.79659 8.20721 6.72679 8.07792 6.61947 7.98432C6.51215 7.89072 6.37457 7.83915 6.23217 7.83915ZM9.76788 7.83915C9.62548 7.83915 9.4879 7.89072 9.38058 7.98432C9.27326 8.07792 9.20346 8.20721 9.1841 8.34829L9.1786 8.42843V14.7141L9.1841 14.7943C9.2035 14.9353 9.27332 15.0646 9.38063 15.1581C9.48795 15.2517 9.62551 15.3032 9.76788 15.3032C9.91026 15.3032 10.0478 15.2517 10.1551 15.1581C10.2624 15.0646 10.3323 14.9353 10.3517 14.7943L10.3572 14.7141V8.42843L10.3517 8.34829C10.3323 8.20721 10.2625 8.07792 10.1552 7.98432C10.0479 7.89072 9.91028 7.83915 9.76788 7.83915ZM8.00003 2.14272C7.60357 2.14259 7.22172 2.29232 6.93102 2.56189C6.64032 2.83146 6.46226 3.20095 6.43253 3.59629L6.4286 3.71415H9.57146L9.56753 3.59629C9.53779 3.20095 9.35973 2.83146 9.06903 2.56189C8.77833 2.29232 8.39648 2.14259 8.00003 2.14272Z" fill="#FF0202"/>
                </svg>
            </button>
        </td>
        `
        list.append(elTr)

    } )
    }
    else{
        arr.forEach((item) => {
        let elTr = document.createElement("tr")
        elTr.className = "bg-white  rounded-[35px]"
        elTr.innerHTML = `
        <td class="text-center py-[17px] bg-white">
            <img class="mx-auto" src="${item.imgURL}" alt="Pool img" width="110" height="41">
        </td>
        <td class="bg-white py-[17px] text-[20px]">
            <div class="flex flex-col">
                <span class="text-[12px] w-[76px] text-[#A6A6A6] relative before:w-[100%] before:h-[1px] before:bg-red-500 before:absolute before:rotate-[6deg] before:top-[7px]"> ${item.oldPrice}сум</span>
                <strong class="text-[18px]">${item.newPrice}сум</strong>
            </div>
        </td>
            <td class="bg-white py-[17px] text-[20px]">
            ${item.categoryId == "0" ? "Каркасные" : "Надувные"}
        </td>
        <td class="bg-white py-[17px] text-[20px]">
            ${item.quantity}
        </td>
            <td class="bg-white py-[17px] text-[20px]">
            ${item.frameId == "0" ? "Металлический" : (item.frameId == "1" ? "Прямоугольная" : "Рамка призмы")}
        </td>
        <td class="py-[17px] text-center bg-white ">
            <button onclick="handleUpdateProduct(${item.id})" class="cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.750122 13.8125V17.2499H4.18752L14.3255 7.11191L10.8881 3.67234L0.750122 13.8125ZM16.9847 4.45268C17.0697 4.36793 17.1372 4.26722 17.1832 4.15635C17.2292 4.04547 17.2529 3.9266 17.2529 3.80655C17.2529 3.6865 17.2292 3.56763 17.1832 3.45675C17.1372 3.34588 17.0697 3.24517 16.9847 3.16041L14.8396 1.01529C14.7548 0.930268 14.6541 0.862814 14.5432 0.816788C14.4323 0.770762 14.3135 0.74707 14.1934 0.74707C14.0734 0.74707 13.9545 0.770762 13.8436 0.816788C13.7328 0.862814 13.632 0.930268 13.5473 1.01529L11.8697 2.69827L15.3071 6.13026L16.9847 4.45268Z" fill="#3F8C8E"/>
                </svg>
            </button>
            <button onclick="handleDeleteProduct(${item.id},${item.categoryId})" class="cursor-pointer ml-[18px]">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00003 0.571289C8.80636 0.571288 9.58185 0.881202 10.1661 1.43693C10.7503 1.99266 11.0986 2.75168 11.139 3.557L11.1429 3.71415H15.0715C15.2717 3.71437 15.4643 3.79105 15.61 3.92853C15.7556 4.066 15.8432 4.25389 15.8549 4.45381C15.8667 4.65373 15.8016 4.85059 15.6731 5.00416C15.5446 5.15773 15.3622 5.25642 15.1634 5.28007L15.0715 5.28557H14.4044L13.4772 16.7201C13.4174 17.4579 13.0821 18.1462 12.5379 18.648C11.9937 19.1499 11.2805 19.4285 10.5402 19.4284H5.45981C4.71955 19.4285 4.00639 19.1499 3.46219 18.648C2.91799 18.1462 2.58263 17.4579 2.52281 16.7201L1.59488 5.28557H0.928598C0.73615 5.28555 0.550404 5.21489 0.406591 5.08701C0.262778 4.95913 0.1709 4.78291 0.148383 4.59179L0.142883 4.49986C0.142909 4.30741 0.213563 4.12167 0.341445 3.97785C0.469327 3.83404 0.645543 3.74216 0.836669 3.71965L0.928598 3.71415H4.85717C4.85717 2.88061 5.18829 2.08121 5.77769 1.49181C6.36709 0.902411 7.16649 0.571289 8.00003 0.571289ZM6.23217 7.83915C6.08977 7.83915 5.95219 7.89072 5.84487 7.98432C5.73755 8.07792 5.66775 8.20721 5.64838 8.34829L5.64288 8.42843V14.7141L5.64838 14.7943C5.66779 14.9353 5.7376 15.0646 5.84492 15.1581C5.95224 15.2517 6.0898 15.3032 6.23217 15.3032C6.37454 15.3032 6.5121 15.2517 6.61942 15.1581C6.72673 15.0646 6.79655 14.9353 6.81595 14.7943L6.82145 14.7141V8.42843L6.81595 8.34829C6.79659 8.20721 6.72679 8.07792 6.61947 7.98432C6.51215 7.89072 6.37457 7.83915 6.23217 7.83915ZM9.76788 7.83915C9.62548 7.83915 9.4879 7.89072 9.38058 7.98432C9.27326 8.07792 9.20346 8.20721 9.1841 8.34829L9.1786 8.42843V14.7141L9.1841 14.7943C9.2035 14.9353 9.27332 15.0646 9.38063 15.1581C9.48795 15.2517 9.62551 15.3032 9.76788 15.3032C9.91026 15.3032 10.0478 15.2517 10.1551 15.1581C10.2624 15.0646 10.3323 14.9353 10.3517 14.7943L10.3572 14.7141V8.42843L10.3517 8.34829C10.3323 8.20721 10.2625 8.07792 10.1552 7.98432C10.0479 7.89072 9.91028 7.83915 9.76788 7.83915ZM8.00003 2.14272C7.60357 2.14259 7.22172 2.29232 6.93102 2.56189C6.64032 2.83146 6.46226 3.20095 6.43253 3.59629L6.4286 3.71415H9.57146L9.56753 3.59629C9.53779 3.20095 9.35973 2.83146 9.06903 2.56189C8.77833 2.29232 8.39648 2.14259 8.00003 2.14272Z" fill="#FF0202"/>
                </svg>
            </button>
        </td>
        `
        list.append(elTr)

    
     })
    }
}
renderProducts(products, elProductsTable, "0")


//Add pool part start
function handleAddBtnClick(){
    modalWrapper.classList.remove("scale-0")
    modalInner.innerHTML = `
    <form autocomplete="off" class="add-pool-form w-[1000px] p-3 rounded-[20px]" >
    <label>
    <input type="file" class="choose-file hidden"/>
    <div class="relative mx-auto flex items-center justify-center border-[2px] border-slate-500 w-[591px] h-[216px] bg-white rounded-[20px]">
    <img class="choose-img absolute w-full h-full hidden" src="" alt="choose img"/>
    <div class="flex gap-[15px] items-center justify-center">
   <svg width="86" height="65" viewBox="0 0 86 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.0625 0C5.92419 0 3.87346 0.84944 2.36145 2.36145C0.849439 3.87346 0 5.92419 0 8.0625L0 56.4375C0 58.5758 0.849439 60.6265 2.36145 62.1385C3.87346 63.6506 5.92419 64.5 8.0625 64.5H77.9375C80.0758 64.5 82.1265 63.6506 83.6385 62.1385C85.1506 60.6265 86 58.5758 86 56.4375V8.0625C86 5.92419 85.1506 3.87346 83.6385 2.36145C82.1265 0.84944 80.0758 0 77.9375 0H8.0625ZM77.9375 5.375C78.6503 5.375 79.3338 5.65815 79.8379 6.16215C80.3419 6.66615 80.625 7.34973 80.625 8.0625V40.3125L60.3344 29.8474C59.8303 29.5949 59.2596 29.5073 58.703 29.597C58.1465 29.6867 57.6322 29.9492 57.233 30.3472L37.2918 50.2885L22.9942 40.764C22.478 40.4203 21.8588 40.2657 21.2417 40.3265C20.6245 40.3872 20.0473 40.6595 19.608 41.0972L5.38575 53.75V56.6525C5.37932 56.581 5.37574 56.5093 5.375 56.4375V8.0625C5.375 7.34973 5.65815 6.66615 6.16215 6.16215C6.66615 5.65815 7.34973 5.375 8.0625 5.375H77.9375Z" fill="#898989"/>
</svg>
    <p class="text-[20px] ">Выберите Изображение</p>
    </div>
    </div>
    </label>
    <div class="flex justify-between mt-10">
    <div class="w-[49%] flex flex-col gap-[30px]">
    <label>
    <span class="pl-5 text-[18px] text-[#898989]"> Выберите категорию </span>    
    <select name="categoryId"  class="w-full pl-5 text-[20px] py-5 bg-white shadow-md">
    <option value="0" >Каркасные</option>
    <option value="1" >Надувные</option>
    </select>
    </label>
    <label>
    <span class="pl-5 text-[18px] text-[#898989]"> Введите старую цену</span>
    <input name="oldPrice" type="number" class="w-full pl-5 text-[20px] py-3 bg-white shadow-md" placeholder="Старая цена" />
    </label>
    <label>
    <span class="pl-5 text-[18px] text-[#898989]"> Введите новую цену</span>
    <input name="newPrice" type="number" class="w-full pl-5 text-[20px] py-3 bg-white shadow-md" placeholder="Новая цена" />
    </label>
    </div>

    <div class="w-[49%] flex flex-col gap-[30px]">
    <label>
    <span class="pl-5 text-[18px] text-[#898989]"> Введите количество</span>
    <input name="quantity" type="number" class="w-full pl-5 text-[20px] py-3 bg-white shadow-md" placeholder="Количество" />
    </label>
    <label>
    <span class="pl-5 text-[18px] text-[#898989]"> Введите рамку</span>
    <select name="frameId" class="w-full pl-5 text-[20px] py-3 bg-white shadow-md">
    <option value="0"> Металлический</option>
    <option value="1">Рамка призмы </option>
    <option value="2"> Прямоугольная</option>
    </select>
    </label>
    <button class="add-btn bg-[#009398] text-white py-[10px] rounded-[30px] mt-[20px] font-bold text-[22px] px-[14px] border-[2px] border-[rgba(0,147,152,1)] hover:bg-transparent hover:text-[rgba(0,147,152,1)] duration-300">Добавить</button>
    </div>
    </div>
    </form>
    `

     let elAddPoolForm = document.querySelector(".add-pool-form")
     let elChooseFile = document.querySelector(".choose-file")
     let elChooseImg = document.querySelector(".choose-img")
     let elSubmitBtn = document.querySelector(".add-btn")

    elChooseFile.addEventListener("change", function(evt){
        elChooseImg.classList.remove("hidden")
        elChooseImg.src = URL.createObjectURL(evt.target.files[0])
    })

    elAddPoolForm.addEventListener("submit", function(evt){
    evt.preventDefault()
        let pool = {
            id:products[products.length - 1]?.id ? products[products.length - 1].id + 1 : 1,
            imgURL:elChooseImg.src,
            oldPrice:evt.target.oldPrice.value,
            newPrice:evt.target.newPrice.value,
            categoryId:evt.target.categoryId.value,
            quantity:evt.target.quantity.value,
            frameId:evt.target.frameId.value,

        }
        products.push(pool)
        localStorage.setItem("products", JSON.stringify(products))
        elSubmitBtn.innerHTML = `
           <img class="w-[30px] h-[30px] scale-[1.4] mx-auto" src="./images/loading-white.png" alt="loading" width="30" height="30" />
        
        `
        setTimeout(() => {
            elSubmitBtn.innerHTML = `Добавить`
            setTimeout(() => {
                modalWrapper.classList.add("scale-0")
                if(pool.categoryId == "0"){
                    elCategoryList.firstElementChild.className = "border-b-[3px] cursor-pointer border-[#009398] text-[#009398] font-bold text-[30px]"
                    elCategoryList.lastElementChild.className = "text-[#A6A6A6] border-b-[3px] border-transparent cursor-pointer font-bold text-[30px]"
                }
                else{
                    elCategoryList.lastElementChild.className = "border-b-[3px] cursor-pointer border-[#009398] text-[#009398] font-bold text-[30px]"
                    elCategoryList.firstElementChild.className = "text-[#A6A6A6] border-b-[3px] border-transparent cursor-pointer font-bold text-[30px]"
                }
                renderProducts(products, elProductsTable, pool.categoryId)
            }, 800)

        }, 1000)

})

}


//Delete part start
let handleDeleteProduct = (id, categoryId) => {
    modalWrapper.classList.remove("scale-0")
    modalInner.innerHTML = `
    <div class="w-[600px]">
    <h1 class="font-bold mb-[20px] text-[35px] text-center"> Хотите удалить?</h1>
    <div class="flex items-center justify-center gap-[20px]">
    <button onclick="handleCancel()" class="hover:bg-transparent hover:text-green-700   border-[2px] border-green-700 duration-300 w-[48%] p-[8px] bg-green-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px] " >
    Отмена
    </button>
    <button onclick="deleteProduct(${id}, ${categoryId})" class="hover:bg-transparent hover:text-red-700  border-[2px] border-red-700 duration-300 w-[48%] p-[8px] bg-red-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px] ">
    Удалить
    </button>
    </div>
    </div>
    `
}

function deleteProduct(id, categoryId){
    let deleteId = products.findIndex(item => item.id == id)
    products.splice(deleteId, 1)
    renderProducts(products, elProductsTable, categoryId)
    modalWrapper.classList.add("scale-0")
    localStorage.setItem("products", JSON.stringify(products))
}



//Update part
function handleUpdateProduct (id){
    findedObj = products.find(item => item.id == id)
    console.log(findedObj)
    modalWrapper.classList.remove("scale-0")
     modalInner.innerHTML = `
    <form autocomplete="off" class="add-pool-form w-[1000px] p-3 rounded-[20px]" >
    <label>
    <input type="file" class="choose-file hidden"/>
    <div class="relative mx-auto flex items-center justify-center border-[2px] border-slate-500 w-[591px] h-[216px] bg-white rounded-[20px]">
    <img class="choose-img absolute w-full h-full" src="${findedObj.imgURL}" alt="choose img"/>
    <div class="flex gap-[15px] items-center justify-center">
   <svg width="86" height="65" viewBox="0 0 86 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.0625 0C5.92419 0 3.87346 0.84944 2.36145 2.36145C0.849439 3.87346 0 5.92419 0 8.0625L0 56.4375C0 58.5758 0.849439 60.6265 2.36145 62.1385C3.87346 63.6506 5.92419 64.5 8.0625 64.5H77.9375C80.0758 64.5 82.1265 63.6506 83.6385 62.1385C85.1506 60.6265 86 58.5758 86 56.4375V8.0625C86 5.92419 85.1506 3.87346 83.6385 2.36145C82.1265 0.84944 80.0758 0 77.9375 0H8.0625ZM77.9375 5.375C78.6503 5.375 79.3338 5.65815 79.8379 6.16215C80.3419 6.66615 80.625 7.34973 80.625 8.0625V40.3125L60.3344 29.8474C59.8303 29.5949 59.2596 29.5073 58.703 29.597C58.1465 29.6867 57.6322 29.9492 57.233 30.3472L37.2918 50.2885L22.9942 40.764C22.478 40.4203 21.8588 40.2657 21.2417 40.3265C20.6245 40.3872 20.0473 40.6595 19.608 41.0972L5.38575 53.75V56.6525C5.37932 56.581 5.37574 56.5093 5.375 56.4375V8.0625C5.375 7.34973 5.65815 6.66615 6.16215 6.16215C6.66615 5.65815 7.34973 5.375 8.0625 5.375H77.9375Z" fill="#898989"/>
</svg>
    <p class="text-[20px] ">Выберите Изображение</p>
    </div>
    </div>
    </label>
    <div class="flex justify-between mt-10">
    <div class="w-[49%] flex flex-col gap-[30px]">
    <label>
    <span class="pl-5 text-[18px] text-[#898989]"> Выберите категорию </span>    
    <select name="categoryId"  class="w-full pl-5 text-[20px] py-5 bg-white shadow-md">
    <option ${findedObj.categoryId == "0" && "selected"} value="0" >Каркасные</option>
    <option ${findedObj.categoryId == "1" && "selected"}  value="1" >Надувные</option>
    </select>
    </label>
    <label>
    <span class="pl-5 text-[18px] text-[#898989]"> Введите старую цену</span>
    <input value="${findedObj.oldPrice}" name="oldPrice" type="number" class="w-full pl-5 text-[20px] py-3 bg-white shadow-md" placeholder="Старая цена" />
    </label>
    <label>
    <span class="pl-5 text-[18px] text-[#898989]"> Введите новую цену</span>
    <input value="${findedObj.newPrice}" name="newPrice" type="number" class="w-full pl-5 text-[20px] py-3 bg-white shadow-md" placeholder="Новая цена" />
    </label>
    </div>

    <div class="w-[49%] flex flex-col gap-[30px]">
    <label>
    <span class="pl-5 text-[18px] text-[#898989]"> Введите количество</span>
    <input value="${findedObj.quantity}" name="quantity" type="number" class="w-full pl-5 text-[20px] py-3 bg-white shadow-md" placeholder="Количество" />
    </label>
    <label>
    <span class="pl-5 text-[18px] text-[#898989]"> Введите рамку</span>
    <select name="frameId" class="w-full pl-5 text-[20px] py-3 bg-white shadow-md">
    <option  ${findedObj.frameId == "0" && "selected"} value="0"> Металлический</option>
    <option  ${findedObj.frameId == "1" && "selected"} value="1">Рамка призмы </option>
    <option  ${findedObj.frameId == "2" && "selected"} value="2"> Прямоугольная</option>
    </select>
    </label>
    <button class="add-btn bg-[#009398] text-white py-[10px] rounded-[30px] mt-[20px] font-bold text-[22px] px-[14px] border-[2px] border-[rgba(0,147,152,1)] hover:bg-transparent hover:text-[rgba(0,147,152,1)] duration-300">Oбновить</button>
    </div>
    </div>
    </form>
    `

    let elUpdatePoolForm = document.querySelector(".add-pool-form")
    let elChooseFile = document.querySelector(".choose-file")
    let elChooseImg = document.querySelector(".choose-img")
    let elSubmitBtn = document.querySelector(".add-btn")

    elChooseFile.addEventListener("change", function(evt){
        elChooseImg.src = URL.createObjectURL(evt.target.files[0])

    })
    

    elUpdatePoolForm.addEventListener("submit", function(evt){
        evt.preventDefault()

        findedObj.imgURL = elChooseImg.src
        findedObj.categoryId = evt.target.categoryId.value
        findedObj.oldPrice = evt.target.oldPrice.value
        findedObj.newPrice = evt.target.newPrice.value
        findedObj.quantity = evt.target.quantity.value
        findedObj.frameId = evt.target.frameId.value


        localStorage.setItem("products", JSON.stringify(products))
        elSubmitBtn.innerHTML = `
        <img class="w-[30px] h-[30px] scale-[1.4] mx-auto" src="./images/loading-white.png" alt="loading" width="30" height="30" /> `

        setTimeout(() => {
            elSubmitBtn.innerHTML = `Обновить`
            setTimeout(() => {
                modalWrapper.classList.add("scale-0")
                if(findedObj.categoryId == "0"){
                    elCategoryList.firstElementChild.className = activeList
                    elCategoryList.lastElementChild.className = notActiveList
                }
                else{
                    elCategoryList.lastElementChild.className = activeList
                    elCategoryList.firstElementChild.className = notActiveList
                }
                renderProducts(products, elProductsTable, findedObj.categoryId)
            }, 800)
        }, 1000)
    })

}

//Search part
    elSearchInput.addEventListener("input", function(e){
        let filteredProducts = products.filter(item => item.newPrice.includes(e.target.value))
        elCategoryList.firstElementChild.className = notActiveList
        elCategoryList.lastElementChild.className = activeList
        if(filteredProducts.length == 1){
            renderProducts(filteredProducts, elProductsTable, filteredProducts[0].categoryId)
      
        if(filteredProducts[0].categoryId == "0"){
        elCategoryList.firstElementChild.className = activeList
        elCategoryList.lastElementChild.className = notActiveList
        }
        else{
        elCategoryList.firstElementChild.className = notActiveList
        elCategoryList.lastElementChild.className = activeList
        }

        }
       renderProducts(filteredProducts, elProductsTable)
    })

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