
const msgInput = document.getElementById('chat');
const token = localStorage.getItem('token');



  window.addEventListener("DOMContentLoaded",()=>{
    setInterval(()=>{
        axios.get(`http://localhost:3000/user/get-message`,{headers:{"Authorization":token}})
    .then((response)=>{
        console.log(response)
        // console.log(response)
      showMessage(response.data.allMessage,response.data.user);
    })
      .catch((err)=>{console.error(err)});
    },1000)
  
});

function showMessage(message,user){
    console.log(user)
    const parentitem=document.getElementById("listOfMessages");
    parentitem.innerHTML="";
    const childitem=document.createElement("li");
    childitem.className="list-group-item";
    childitem.textContent=user+" Joined";
    parentitem.appendChild(childitem);
    for(let i=0;i<message.length;i++){
        const childitem=document.createElement("li");
        childitem.className="list-group-item";
        childitem.textContent=user+" - "+message[i].message;
        parentitem.appendChild(childitem);
    }
  }

document.getElementById("msgSent").onclick= async function(e){
    e.preventDefault();
    const message = msgInput.value;
//     <!-- <form onSubmit="document.getElementById('username').value=localStorage.getItem('username')" >
//     <input type="text" name="message" id="message" >
//     <input type="hidden" name="username" id="username">
//     </br>
//     <button type="submit">Send</button> 
// </form> -->
    const username = document.getElementById('username').value=localStorage.getItem('username')
    const inputData={
        message,
        username,
    };
    console.log(inputData)
    await axios.post("http://localhost:3000/user/message",inputData,{headers:{"Authorization":token}})
    .then((response)=>{
        console.log(response)
        // if(response.request.status==200){
        // alert(response.data.message);
        console.log(response.data.user);
        localStorage.setItem('token',response.data.token);
        showMessage(response.data.newMessage,response.data.user);
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