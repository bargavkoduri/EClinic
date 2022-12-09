let flap = 0;
let emailValue;
let passwordValue;
let passwordValuere;

function ValidateEmail(x) {

    var atposition = x.indexOf("@");
    var dotposition = x.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
        alert("Please enter a valid e-mail address \n atpostion:" + atposition + "\n dotposition:" + dotposition);
        return false;
    }
    return true;
}
document.getElementById("bu").addEventListener("click", function() {
    document.getElementById("body-1").style.display = "none";
    document.getElementById("body-2").style.display = "block";
})

document.getElementById("but1").addEventListener("click", function() {
    document.getElementById("body-1").style.display = "none";
    document.getElementById("body-2").style.display = "block";
    flap = 1;
    window.location.href='/signupd';
})


document.getElementById("but2").addEventListener("click", function() {

    emailValue = document.getElementById('email-1').value;
    passwordValue = document.getElementById('pass-1').value;
    passwordValuere = document.getElementById('pass-2').value;
    let validate = ValidateEmail(emailValue);
    let check = true;
    let dig = 0,
        bigChar = 0,
        smallChar = 0,
        notRequired = 0;
    let n = passwordValue.length;
    for (let i = 0; i < n; i++) {
        if (passwordValue[i] >= '0' && passwordValue[i] <= '9') {
            dig++;
        } else if (passwordValue[i] >= 'a' && passwordValue[i] <= 'z') {
            smallChar++;
        } else if (passwordValue[i] >= 'A' && passwordValue[i] <= 'Z') {
            bigChar++;
        }
    }
    let error = false;
    if (emailValue == '') {
        alert("No email value specified");
        error = true;


    } else if (validate == false) {
        alert("Invalid EmailId");
        error = true;
    } else if (passwordValue == '') {
        alert("No password value specified");
        error = true;
    } else if (passwordValue != passwordValuere) {
        alert("password din't match");
        error = true;
    } else if (dig == 0 || smallChar == 0 || bigChar == 0 ) {
        alert("password constrain din't satisfy! try other one");
        error = true;
    }
    if (error) {
        document.getElementById('email-1').value = '';
        document.getElementById('pass-1').value = '';
        document.getElementById('pass-2').value = '';

    } else {

        if (flap == 0) {


            document.getElementById("body-2").style.display = "none";
            document.getElementById("body-3").style.display = "block";
        } else {
            document.getElementById("body-2").style.display = "none";
            document.getElementById("body-4").style.display = "block";
        }
    }


})
document.getElementById("but-3").addEventListener("click", async function(e) {
    let fl = 0;
    let str = ''
    let na = document.getElementById('name');
    if(na.value == ''){
        str = str + 'Name filed cannot be empty\n';
        fl = 1;
    }

    let ph  =  document.getElementById('phone');
    if(ph.value == ''){
        str = str + 'Phone Number cannot be empty\n';
        fl = 1;
    }
    else if(ph.value.length != 10){
        str = str + 'Phone Number should have 10 digits\n';
        fl = 1;
    }
    for(let i=0;i<ph.value.length;i++){
        let temp = ph.value.charCodeAt(i);
        if(temp<48 || temp>57)
        {
            str = str + 'Phone Number must contain only numbers\n';
            fl = 1;
            break;
        }
    }

    let dob = document.getElementById('dob');
    if(dob.value == ''){
        str = str + 'Date of birth cannot be empty\n';
        fl = 1;
    }

    let adc =  document.getElementById('adhar-card');
    if(adc.value == ''){
        str  = str + 'Aadhaar Card value should be specified\n'
        fl = 1;
    }
    else if(adc.value.length != 12){
        str = str + 'Aadhar card should have 12 digits\n'
        fl = 1;
    }
    for(let i=0;i<adc.value.length;i++){
        let temp = adc.value.charCodeAt(i);
        if(temp<48 || temp>57)
        {
            str = str + 'Aadhaar Card must contain only numbers\n';
            fl = 1;
            break;
        }
    }

    let g = document.getElementById('genderP');
    if(g.value == ''){
        str = str + 'Gender cannot be empty\n';
        fl = 1;
    }

    let al = document.getElementById('allergies');
    if(al.value == ''){
        str = str + 'Allergies Cannot be empty\n';
        fl = 1;
    }

    let pm = document.getElementById('history');
    if(pm.value == ''){
        str  = str + 'Past Medical History cannot be empty\n';
        fl = 1;
    }

    if(fl == 1){
        alert(str);
    }
    else{
        e.preventDefault();
        const rawResponse = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:document.getElementById('email-1').value,pass1:document.getElementById('pass-1').value,pass2:document.getElementById('pass-2').value,name:document.getElementById('name').value,phno:document.getElementById('phone').value,dob:document.getElementById('dob').value,adno:document.getElementById('adhar-card').value,gender:document.getElementById('genderP').value,allergies:document.getElementById('allergies').value,history:document.getElementById('history').value})

        });
        const content = await rawResponse.json();

        console.log(content);

        document.getElementById("body-3").style.display = "none";
        document.getElementById("body-5").style.display = "block";

    }



})

document.getElementById("but-4").addEventListener("click", async function(e) {

    e.preventDefault();
    const rawResponse = await fetch('/signupd', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:document.getElementById('email-1').value,pass1:document.getElementById('pass-1').value,pass2:document.getElementById('pass-2').value,name:document.getElementById('namedoc').value,phno:document.getElementById('phonenum').value,dob:document.getElementById('dobd').value,gender:document.getElementById('genderD').value,adhar:document.getElementById('adhar-card-d').value,qualification:document.getElementById('qualification').value,department:document.getElementById('department').value,experience:document.getElementById('exp').value})

    });
    const content = await rawResponse.json();

    console.log(content);
    document.getElementById("body-4").style.display = "none";
    document.getElementById("body-6").style.display = "block";


})



function show_password() {
    pass = document.getElementById('pass-1')
    if(pass.type=="password"){
        pass.type = 'text'
        document.getElementById('pass-2').type = 'text'
    }
    else if (pass.type == 'text') {
        pass.type = 'password'
        document.getElementById('pass-2').type = 'password'
    }
}
