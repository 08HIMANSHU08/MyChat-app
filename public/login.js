const myForm = document.getElementById('my-form');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

    myForm.addEventListener('submit', onSubmit);
           
    function onSubmit(e){
        e.preventDefault();       
        const email=emailInput.value;
        const password=passwordInput.value;
        const inputData={
            email,
            password,
        };
        console.log(inputData);
        axios.post("http://localhost:3000/user/login",inputData)
            .then((response)=>{
                // console.log(response)
                if(response.request.status==201){
                alert(response.data.message);
                window.location.href="./signup.html";
                }
                else{
                    throw new Error ("Failed To Login, Try Again!")
                }
            })
            .catch((err)=>{
                // console.log(err);
                // console.log(err.response.data.message);
                document.getElementById('error').innerHTML+=`<div style="color:red;">${err.response.data.message}<div>`; 
            })
            emailInput.value='';
            passwordInput.value = ''; 
    }