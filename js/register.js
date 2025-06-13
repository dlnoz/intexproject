let elForm = document.querySelector(".register-form")

elForm.addEventListener("submit", function(e) {
    e.preventDefault()
    let data = {
        id:passwords.length + 1,
        username:e.target.username.value,
        firstName:e.target.firstName.value,
        lastName:e.target.lastName.value,
        password:e.target.password.value,
    }
    passwords.push(data)
    localStorage.setItem("passwords", JSON.stringify(passwords))
    elForm.lastElementChild.innerHTML = `
     <img class="w-[30px] h-[30px] scale-[1.4] mx-auto" src="./images/loading-white.png" alt="loading" width="30" height="30" />
    `
     setTimeout(() => {
         elForm.lastElementChild.innerHTML = ` Регистрация`
        setTimeout(() =>{
            location.pathname = "/index.html"
        }, 600)
     }, 1000)
})