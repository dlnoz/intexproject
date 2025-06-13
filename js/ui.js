let elFrameList = document.querySelector(".frame-pool")
let elInflatableList = document.querySelector(".inflatable-pool")
let modalWrapper = document.querySelector(".modal-wrapper")
let modalInner = document.querySelector(".modal-inner")

let products = JSON.parse(localStorage.getItem("products"))
let orders = JSON.parse(localStorage.getItem("orders")) || []

function renderProducts(arr, list, id){
    list.innerHTML = null
    arr.filter(value => value.categoryId == id).forEach((item) => {
    let elItem = document.createElement("li")
    elItem.className = "pool-card relative w-[340px] px-[30px] pb-[30px] pt-[45px] rounded-tr-[35px] rounded-br-[35px] rounded-bl-[35px]"
    elItem.innerHTML = `
    <p class="font-medium text-[20px] text-[#009398] text-center mb-[10px]">
        ${item.frameId == "0" ? "Металлический каркас" : ""}
        ${item.frameId == "1" ? "Рамка призмы" : ""}
        ${item.frameId == "2" ? "Прямоугольная" : ""}
    </p>
    <img class="mb-[17px] h-[172px] w-[308px]" src="${item.imgURL}" alt="Pool img" width="308" height="172">
    <div class="flex justify-between items-center">
        <div class="flex flex-col">
            <span class="text-[12px] w-[76px] text-[#A6A6A6] relative before:w-[100%] before:h-[1px] before:bg-red-500 before:absolute before:rotate-[6deg] before:top-[7px]"> ${item.oldPrice} сум</span>
            <strong class="text-[18px]">${item.newPrice}сум</strong>
        </div>
        <button onclick="handleOrder(${item.id})" class="cursor-pointer hover:opacity-[70%] duration-300 text-[#000] text-[15px] font-bold py-[2px] w-[107px] bg-[#FFE600] text-center rounded-tr-[10px] rounded-bl-[10px]" >Заказать</button>
        <span class="bg-[#139D4B] text-white font-bold text-[15px] w-[140px] py-[4px] inline-block text-center absolute top-0 left-0 rounded-br-[10px]" >Рекомендуем</span>
    </div>
    `
    list.append(elItem)
    })
}
renderProducts(products, elFrameList, "0")
renderProducts(products, elInflatableList, "1")

let data = new Date()
let hour = data.getHours().toString().padStart(2, 0)
let minut = data.getMinutes().toString().padStart(2, 0)
let day = data.getDate().toString().padStart(2, 0)
let month = (data.getMonth() + 1).toString().padStart(2, 0)
let year = data.getFullYear().toString().split("0")[1]
let fullDate = `${hour}:${minut} ${day}.${month}.${year}`

//Order part start
    function handleOrder(id) {
        let findOrder = products.find(item => item.id == id)

        modalWrapper.classList.remove("scale-0")
        modalInner.innerHTML = `
        <div class="w-[1130px] relative flex items-center">

        <div class="p-[60px] w-[50%] rounded-[35px] pool-card">
            <h2 class="font-bold text-center text-[#009398] mb-[10px]">
                ${findOrder.frameId == "0" ? "Металлический каркас" : ""}
                ${findOrder.frameId == "1" ? "Рамка призмы" : ""}
                ${findOrder.frameId == "2" ? "Прямоугольная" : ""}
            </h2>
            <img class="mb-[31px]" src="${findOrder.imgURL}" alt="photo" width="555" height="305">
            <strong class="text-[18px]">${findOrder.newPrice}сум</strong>
        </div>
        <form class="order-form w-[50%] space-y-[17px] px-[48px] " autocomplete="off">
        <input required class="w-full text-[25px] font-bold placeholder:text-[25px] placeholder:font-bold pool-card py-[15px] outline-none border-[1px] border-[#CBCBCB] rounded-[17px] pl-[25px]" type="text" name="username" placeholder="Ваше имя">
        <input required class="w-full text-[25px] font-bold placeholder:text-[25px] placeholder:font-bold pool-card py-[15px] outline-none border-[1px] border-[#CBCBCB] rounded-[17px] pl-[25px]" type="tel" name="phoneNumber" placeholder="Ваш номер">
        <input required class="w-full text-[25px] font-bold placeholder:text-[25px] placeholder:font-bold pool-card py-[15px] outline-none border-[1px] border-[#CBCBCB] rounded-[17px] pl-[25px]" type="text" name="address" placeholder="Ваш адрес">
        <button class="duration-300 hover:scale-[1.2] cursor-pointer w-[237px] bg-[#FFE600] text-[#000] text-[25px] font-bold text-center block mx-auto py-[6px] rounded-[10px]">Заказать</button>
        </form>
       <button onclick="handleClose()" class="absolute duration-300 hover:scale-[1.2] top-[22px] right-[30px] cursor-pointer" type="button">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.66431" y="6.10352e-05" width="41.4454" height="3.76776" rx="1.88388" transform="rotate(45 2.66431 6.10352e-05)" fill="#B9B9B9"/>
        <rect y="29.3063" width="41.4454" height="3.76776" rx="1.88388" transform="rotate(-45 0 29.3063)" fill="#B9B9B9"/>
        </svg>
        </button>
        </div>
        `
        let elOrderForm = document.querySelector(".order-form")
        elOrderForm.addEventListener("submit", function(e){
            e.preventDefault()
            
            let pool = {
                id: orders[orders.length - 1]?.id ? orders[orders.length - 1]?.id + 1 : 1,
                username: e.target.username.value,
                phoneNumber: e.target.phoneNumber.value,
                imgURL: findOrder.imgURL,
                price: findOrder.newPrice,
                address: e.target.address.value,
                date: fullDate
            }
            e.target.lastElementChild.innerHTML = `
            <img class="w-[30px] h-[30px] scale-[1.4] mx-auto" src="./images/loading-white.png" alt="loading" width="30" height="30" />
            `
            setTimeout(() => {
            e.target.lastElementChild.innerHTML = `Заказать`
            setTimeout(() => {
                modalInner.innerHTML = `
                 <div class="text-center w-[1130px]">
                <img class="mx-auto mb-[43px]" src="./images/check-img.svg" alt="photo" width="232" height="232">
                <h2 class="font-bold text-[60px]">Спасибо!</h2>
                </div>
                `
                orders.push(findOrder)
                localStorage.setItem("orders", JSON.stringify(orders))
                setTimeout(() =>{
                    modalWrapper.classList.add("scale-0")
                },1000)
            },1000)
            },1000)
        })
    }

    let handleClose = () => modalWrapper.classList.add("scale-0")