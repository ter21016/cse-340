
    const passwordInput = document.querySelector("#password")
    const passwordHide = document.querySelector("#passwordHide")
    passwordHide.addEventListener("click", () => {
        if(passwordInput.getAttribute("type") == "password" ) {
            passwordInput.setAttribute("type", "text")
            passwordHide.classList.remove("active")
        }
        else {
            passwordInput.setAttribute("type", "password")
            passwordHide.classList.add("active")
        }
    })

