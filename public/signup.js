const baseUrl = `http://localhost:3000`;

document.getElementById('signupform').onsubmit = async (e) => {
    e.preventDefault();

    try {
        const name = document.getElementById('nameField').value;
        const email = document.getElementById('emailField').value;
        const phone = document.getElementById('phoneField').value;
        const password = document.getElementById('passwordField').value;
        
        let res = await axios.post(`${baseUrl}/user/signup`, {name, email, phone, password});
        console.log(res);
        if(res.status === 200) {
            alert(res.data.message);
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.log(error);
        document.getElementById('error-text').innerHTML+=`<div style="color:red;">${error.response.data.message}<div>`; 
    }
    document.getElementById('nameField').value="";
    document.getElementById('emailField').value="";
    document.getElementById('phoneField').value="";
    document.getElementById('passwordField').value="";
    
};