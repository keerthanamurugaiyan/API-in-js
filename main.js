let index; 
let url="https://65b77a0946324d531d54ac37.mockapi.io/student";
let editId=null;
window.onload = () => {
    editData();
}

let form = document.getElementById('form')

form.addEventListener('submit',function validateForm(event) {
    event.preventDefault()
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var dateOb = document.getElementById("dob").value;
    var phoneNum = document.getElementById("phonum").value;
    var maleGender = document.getElementById("maleg");
    var femaleGender = document.getElementById("femaleg");
    var language = document.getElementById("lang").value;
    var password = document.getElementById("pass").value;
    var confirmPass = document.getElementById("conpass").value;
    var present = document.getElementById("present");

    if(name.trim()===''){
        document.getElementById("nameError").innerHTML="Name is Required";
        document.getElementById("name").style.border="2px solid red";
    }
    else if (name.length<3){
        document.getElementById("nameError").innerHTML="Name must be atleast 3 character";
        document.getElementById("name").style.border="2px solid red";
    }
    else{
        document.getElementById("nameError").innerHTML ='';
        document.getElementById("name").style.border="";
    }

    const emailCon= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim()===''){
        document.getElementById("emailError").innerHTML="Email is Required";
        document.getElementById("email").style.border="2px solid red";
    }

    else if (!emailCon.test(email)) {
        document.getElementById("emailError").innerHTML="Email address is invalid";
        document.getElementById("email").style.border="2px solid red";
    }
    
    else{
        document.getElementById("emailError").innerHTML ='';
        document.getElementById("email").style.border="";
    }
   

    if(dateOb.trim()===''){
        document.getElementById("dobError").innerHTML="Date of birth is Required";
        document.getElementById("dob").style.border="2px solid red";
    }

    else{
        document.getElementById("dobError").innerHTML ='';
        document.getElementById("dob").style.border="";
    }

    const PhoneNo = /^\d{10}$/;
    if(phoneNum.trim()===''){
        document.getElementById("phoError").innerHTML="Phone number is Required";
        document.getElementById("phonum").style.border="2px solid red";
    }

    else if (!PhoneNo.test(phoneNum)) {
        document.getElementById("phoError").innerHTML="Phone number must be 10 degit";
        document.getElementById("phonum").style.border="2px solid red";
    }

    else{
        document.getElementById("phoError").innerHTML ='';
        document.getElementById("phonum").style.border="";
    }

    if(maleGender.checked || femaleGender.checked){
        document.getElementById("genderError").innerHTML ='';
    }

    else{
        document.getElementById("genderError").innerHTML ='Gender is Required';
    }

    if(language.trim()===''){
        document.getElementById("lanError").innerHTML="Language is Required";
        document.getElementById("lang").style.border="2px solid red";
    }

    else{
        document.getElementById("lanError").innerHTML ='';
        document.getElementById("lang").style.border="";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(password.trim()===''){
        document.getElementById("passError").innerHTML="Password is Required";
        document.getElementById("pass").style.border="2px solid red";
    }

    else if(!passwordRegex.test(password)){
        document.getElementById("passError").innerHTML="Password must be 8 characters !includes ZbCd1234";
        document.getElementById("pass").style.border="2px solid red";
    }

    else{
        document.getElementById("passError").innerHTML ='';
        document.getElementById("pass").style.border="";
    }

    if(confirmPass.trim()===''){
        document.getElementById("conError").innerHTML="Confirm password is Required";
        document.getElementById("conpass").style.border="2px solid red";
    }

    else if (password !== confirmPass){
        document.getElementById("conError").innerHTML="Not matching! password must be same";
        document.getElementById("conpass").style.border="2px solid red";
    }

    else{
        document.getElementById("conError").innerHTML ='';
        document.getElementById("conpass").style.border="";
    }

    if (name === "" || 
        name.length < 3  || 
        name.length > 10 || 
        email ==="" || 
        !emailCon.test(email) ||
        phoneNum ==="" ||
        !PhoneNo.test(phoneNum)) {
        return false
        }

    if(name =="" || email =="" || (!emailCon.test(email))|| dateOb =="" || phoneNum =="" ||(!PhoneNo.test(phoneNum))|| language =="" || password =="" || confirmPass ==""  ||(!passwordRegex.test(password)) || password !== confirmPass){
        event.preventDefault();
        return false;
    }
        let obj = {name,email,dateOb,phoneNum,language,password,confirmPass,maleGender:maleGender.checked ? "Male" : "Feamle",present:present.checked ? "Present":"Absent" }
        console.log(obj);

        var DOB = new Date(obj.dateOb);
        var formateDob = DOB.toLocaleDateString("en-GB");
        obj["dateOb"] = formateDob;
        
            if(editId!==null){
            fetch(url+"/"+editId,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(obj)
            }).then((res) =>{
                res.json();
                window.location.href="table.html";
            })
            .catch((errMsg)=>console.log(errMsg));
        }
        else{
        fetch(url,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(obj)
        }).then((res) =>{
            res.json();
            window.location.href="table.html";
        });
    }
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("phonum").value = "";
    document.getElementById("lang").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("conpass").value = "";


})

function parseCustomDate(formateDob) {
    const parts = formateDob.split("/");
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Subtract 1 to adjust for zero-based month indexing
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
}

function editData(id){
    var url_string = window.location.href.toLocaleLowerCase();
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    editId=id
    if(id){
        let url="https://65b77a0946324d531d54ac37.mockapi.io/student";
        fetch(url+"/"+id,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
        }).then((res) =>
            res.json()
        )
        .then((data)=>{console.log(data)
        document.getElementById("name").value = data.name;
        document.getElementById("email").value =data.email;
        
        let dateOfBirth = parseCustomDate(data.dateOb);
        let formattedDate = `${dateOfBirth.getFullYear()}-${(dateOfBirth.getMonth() + 1).toString().padStart(2, '0')}-${dateOfBirth.getDate().toString().padStart(2, '0')}`;
        document.getElementById("dob").value =formattedDate;
        
        document.getElementById("phonum").value = data.phoneNum;
        document.getElementById("lang").value = data.language;
        document.getElementById("pass").value = data.password;
        document.getElementById("conpass").value = data.confirmPass;
       
        if (data.maleGender === "Male") {
           document.getElementById("maleg").checked = true
        }else{
           document.getElementById("femaleg").checked = true
        }
        if (data.present === "Present") {
            document.getElementById("present").checked = true
        } else {
            document.getElementById("present").checked = false
        }
        })
        
        .catch((errMsg)=>console.log(errMsg));
    }
}


