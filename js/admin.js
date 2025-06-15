
let modalWrapper = document.querySelector(".modal-wrapper")
let modalInner = document.querySelector(".modal-inner")

let elCategoryList = document.querySelector(".category-list")


let products = JSON.parse(localStorage.getItem("products")) || []
let elProductTable = document.querySelector(".products-table")

let elSearchInput = document.querySelector(".search-input")

let activeList = "border-b-[3px] cursor-pointer border-[#009398] text-[#009398] font-bold text-[35px]"
let notActiveList = "border-b-[3px]  border-transparent text-[#A6A6A6] cursor-pointer font-bold text-[35px]"

let elSiteList = document.querySelector(".site-list")

// Change category start
elCategoryList.addEventListener("click", function (e) {
    if (e.target.textContent == "Каркасные") {
        e.target.className = activeList
        e.target.nextElementSibling.className = notActiveList 
        renderProducts(products, elProductTable, "0")
    }
    else if (e.target.textContent == "Надувные") {
        e.target.className = activeList
        e.target.previousElementSibling.className = notActiveList
        renderProducts(products, elProductTable, "1")
    }
})

// Add Pool part start
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
    <button class="add-btn bg-[#009398] text-white py-[10px] rounded-[30px] mt-[20px] font-bold text-[22px] px-[14px] border-none hover:opacity-[80%] duration-300">Добавить</button>
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
                renderProducts(products, elProductTable, pool.categoryId)
            }, 800)

        }, 1000)

})

}


// Update Part 
function handleUpdateProduct (id){
    findedObj = products.find(item => item.id == id)
    console.log(findedObj)
    modalWrapper.classList.remove("scale-0")
     modalInner.innerHTML = `
    <form autocomplete="off" class="add-pool-form w-[1000px] p-3 rounded-[20px]" >
    <label>
    <input type="file" class="choose-file hidden"/>
    <div class="relative mx-auto flex items-center justify-center border-[2px] border-slate-500 w-[591px] h-[216px] bg-white rounded-[20px]">
    <img class="choose-img absolute w-full h-full" src="${findedObj.imgURL}" />
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
    <button class="add-btn bg-[#009398] text-white py-[10px] rounded-[30px] mt-[20px] font-bold text-[22px] px-[14px] border-none hover:opacity-[80%] duration-300">Oбновить</button>
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
                renderProducts(products, elProductTable, findedObj.categoryId)
            }, 800)
        }, 1000)
    })

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