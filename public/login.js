


const form = document.getElementById("login_form");

form.addEventListener("submit",async (e)=>{
    e.preventDefault()
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try{

        const res = await fetch("http://localhost:3000/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        });

        const data = await res.json();

        if(res.ok){
            console.log("Correct pw");
            localStorage.setItem("token",data.token);
            console.log("working");
            window.location.href="./admin.html";
        }else{
            alert(data.err);
        }

    }catch(err){
        console.log(err);
    }
});