let signUpForm = document.querySelector(".signUpForm");
let btn = document.querySelector("#btn");
let registeredUsers = [];

signUpForm.addEventListener("submit", (e) => {
    preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;

    let user = {
        username,
        password,
    };
    registeredUsers.push(user);
    console.log(user);
});

if (signUpForm === true) {
    btn.addEventListener("click", () =>{
        window.location.href = "login.html";
    });
    
}
