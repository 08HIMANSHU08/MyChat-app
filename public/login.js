const forgotBtn = document.getElementById('fgt-btn');
const loginForm = document.getElementById('loginform');
const baseUrl = `http://localhost:3000`;

loginForm.onsubmit = async (e) => {
    e.preventDefault();

    try {
        const email = document.getElementById('emailField').value;
        const password = document.getElementById('passwordField').value;

        let res = await axios.post(`${baseUrl}/user/login`, {email, password});
        console.log(res);
        if(res.status === 200) {
            email.value = '';
            password.value = '';
            console.log(res.data.token)
            alert(res.data.message);
            
            localStorage.setItem('token',res.data.token);
    
            window.location.href = 'chat.html';
        }   
    } catch (error) {
        console.log(error);
        if(error.response.status === 401) {
            document.getElementById('error-text').innerHTML+=`<div style="color:red;">${error.response.data.message}<div>`;
        }
        if(error.response.status === 404) {
            document.getElementById('error-text').innerHTML+=`<div style="color:red;">${error.response.data.message}<div>`;
        }
    }
    
};