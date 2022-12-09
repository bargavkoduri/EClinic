$(document).ready(function(){
  $("#Input1").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable1 tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});




document.getElementById("strip").addEventListener("click", function() {


    let check = document.getElementById("elements").style.display;
    if (check == "none") {
        document.getElementById("elements").style.display = "block";


    } else {
        document.getElementById("elements").style.display = "none";

    }


})
document.getElementById('changes').addEventListener("click",async (e)=>{
    e.preventDefault();
    const rawResponse = await fetch('/doctorportal', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({pass1:document.getElementById('pass-1').value,pass2:document.getElementById('pass-2').value,name:document.getElementById('name').value,phno:document.getElementById('phonenum').value,dob:document.getElementById('dobd').value,gender:document.getElementById('genderD').value,adhar:document.getElementById('adhar-card-d').value,qualification:document.getElementById('qualification').value,department:document.getElementById('department').value,experience:document.getElementById('exp').value,flag:'info'})

    });
    const content = await rawResponse.json();
    if(content.status=='updated')
    {
        window.alert("Info Updated Successfully!")
        window.location.href="/doctorportal"
    }
    else {
        console.log("Update Failed please try again")
        window.location.href="/doctorportal"

    }
})
document.getElementById("cancelapt").addEventListener("click",async function(e){
    e.preventDefault();
    const rawResponse = await fetch('/doctorportal', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({patid:document.getElementById('patidc').value,slot:document.getElementById('slotc').value,flag:"cancel"})

    });
    const content = await rawResponse.json();
    console.log(content.status);
    if(content.status=='yes')
    {
        window.alert("Cancelled Successfully!")
        window.location.href="/doctorportal"
    }
    else {
        window.alert("Error@123/No slot found booked with patient/check details")
        window.location.href="/doctorportal"

    }
})
document.getElementById('butslot').addEventListener("click",async (e)=>{
    e.preventDefault();
    const rawResponse = await fetch('/doctorportal', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({slot:document.getElementById('slot').value,flag:'slot'})

    });
    const content = await rawResponse.json();
    if(content.status=='slot')
    {
        window.alert("slot added Successfully!")
        window.location.href="/doctorportal"
    }
    else {
        console.log("Failed please try again")
        window.location.href="/doctorportal"

    }
})
document.getElementById('butdel').addEventListener("click",async (e)=>{
    e.preventDefault();
    const rawResponse = await fetch('/doctorportal', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({slot:document.getElementById('shed-del').value,flag:'del'})

    });
    const content = await rawResponse.json();
    if(content.status=='del')
    {
        window.alert("slot delete Successfully!")
        window.location.href="/doctorportal"
    }
    else {
        console.log("Failed please try again")
        window.location.href="/doctorportal"

    }
})
// document.getElementById('butdel').addEventListener("click",async (e)=>{
//     e.preventDefault();
//     const rawResponse = await fetch('/doctorportal', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({slot:document.getElementById('shed-del').value,flag:'slotd'})
//
//     });
//     const content = await rawResponse.json();
//     if(content.status=='slotd')
//     {
//         window.alert("slot deleted Successfully!")
//         window.location.href="/doctorportal"
//     }
//     else {
//         console.log("Failed please try again")
//         window.location.href="/doctorportal"
//
//     }
// })

function upcoming(){
        document.getElementById('upcoming').style.display = 'inline-block';
        document.getElementById('info').style.display = 'none';
        document.getElementById('mess').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('pasp').style.display = 'none';
        document.getElementById('schmana').style.display = 'none';
}


function info(){
        document.getElementById('upcoming').style.display = 'none';
        document.getElementById('info').style.display = 'inline-block';
        document.getElementById('mess').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('pasp').style.display = 'none';
        document.getElementById('schmana').style.display = 'none';
}

function messages(){
        document.getElementById('upcoming').style.display = 'none';
        document.getElementById('info').style.display = 'none';
        document.getElementById('mess').style.display = 'inline-block';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('pasp').style.display = 'none';
        document.getElementById('schmana').style.display = 'none';
}

function pastapp(){
        document.getElementById('upcoming').style.display = 'none';
        document.getElementById('info').style.display = 'none';
        document.getElementById('mess').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('pasp').style.display = 'inline-block';
        document.getElementById('schmana').style.display = 'none';
}

function cancel(){
        document.getElementById('upcoming').style.display = 'none';
        document.getElementById('info').style.display = 'none';
        document.getElementById('mess').style.display = 'none';
        document.getElementById('cancel').style.display = 'inline-block';
        document.getElementById('pasp').style.display = 'none';
        document.getElementById('schmana').style.display = 'none';
}

function schedulemanager(){
        document.getElementById('upcoming').style.display = 'none';
        document.getElementById('info').style.display = 'none';
        document.getElementById('mess').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('pasp').style.display = 'none';
        document.getElementById('schmana').style.display = 'inline-block';
}
