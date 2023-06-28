
const msgInput = document.getElementById('chat');
const token = localStorage.getItem('token');



  window.addEventListener("DOMContentLoaded",()=>{
  axios.get(`http://localhost:3000/user/get-message`,{headers:{"Authorization":token}})
    .then((response)=>{
        console.log(response)
        // console.log(response)
      showMessage(response.data.allMessage,response.data.user);
    })
      .catch((err)=>{console.error(err)});
});

function showMessage(message,user){
    // console.log(user)
    const parentitem=document.getElementById("listOfMessages");
    for(let i=0;i<message.length;i++){
      
        const childitem=document.createElement("li");
        childitem.className="list-group-item"
        childitem.textContent=user.name+" - "+message[i].message;
        parentitem.appendChild(childitem);
    }
  }

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
        console.log("err in post");
        console.log(err)
        // console.log(err.response.data.message);
        // document.getElementById('error').innerHTML+=`<div style="color:red;">${err.response.data.message}<div>`; 
    })
    msgInput.value=''; 

}