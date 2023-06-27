
const msgInput = document.getElementById('chat');
const token = localStorage.getItem('token');

document.getElementById("msgSent").onclick= async function(e){
    e.preventDefault();
    const message = msgInput.value;
    const inputData={
        message
    };
    console.log(inputData)
    await axios.post("http://localhost:3000/user/message",inputData,{headers:{"Authorization":token}})
    .then((response)=>{
        console.log(response)
        // if(response.request.status==200){
        // alert(response.data.message);
        // console.log(response.data.token);
        localStorage.setItem('token',response.data.token);
        // localStorage.setItem('name',)
        // window.location.href="./mainpage.html";
        // }
        // else{
        //     throw new Error ("Failed To Login, Try Again!")
        // }
    })
    .catch((err)=>{
        console.log(err);
        // console.log(err.response.data.message);
        // document.getElementById('error').innerHTML+=`<div style="color:red;">${err.response.data.message}<div>`; 
    })
    msgInput.value=''; 

}
    // myForm.addEventListener('submit', onSubmit);
           
    // function onSubmit(e){
    //     e.preventDefault();       
    //     const email=emailInput.value;
    //     const password=passwordInput.value;
    //     const inputData={
    //         email,
    //         password,
    //     };
    //     console.log(inputData);
    //     axios.post("http://localhost:3000/user/login",inputData)
            // .then((response)=>{
            //     console.log(response)
            //     if(response.request.status==200){
            //     alert(response.data.message);
            //     // console.log(response.data.token);
            //     localStorage.setItem('token',response.data.token);
            //     // localStorage.setItem('name',)
            //     window.location.href="./mainpage.html";
            //     }
            //     else{
            //         throw new Error ("Failed To Login, Try Again!")
            //     }
            // })
            // .catch((err)=>{
            //     // console.log(err);
            //     // console.log(err.response.data.message);
            //     document.getElementById('error').innerHTML+=`<div style="color:red;">${err.response.data.message}<div>`; 
            // })
            // emailInput.value='';
            // passwordInput.value = ''; 
    // }