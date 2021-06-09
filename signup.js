function signup() {
    
    var firstname=document.getElementById("fn");
    var lastname=document.getElementById("ln");
    var username=document.getElementById("nam");
    var pass=document.getElementById("pass");
    var add=document.getElementById("message");
    
    var customer={
        firstname:firstname.value,
        lastname:lastname.value,        
        username:username.value,
        password:pass.value,
        address:add.value
    }
    firebase.database().ref("customer").set(customer);
    // console.log(customer)
}
// console.log(firebase.database)
