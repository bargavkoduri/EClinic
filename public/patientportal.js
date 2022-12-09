


$(document).ready(function(){
  $("#Input").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
$(document).ready(function(){
    $("#Input3").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable3 tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
$(document).ready(function(){
    $("#Input2").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable2 tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
$(document).ready(function(){
    $("#Input1").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable1 tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
document.getElementById("getavb").addEventListener("click",async function(e){
    e.preventDefault();
    const rawResponse = await fetch('/patientportal', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({docid:document.getElementById('docid2').value,flag:"avb"})

    });
    const content = await rawResponse.json();
    console.log(content.status);
    if(content.status=='ok')
    {
        window.open("/available")
    }
    else {
        window.alert("Error@123")
        window.location.href="/patientportal"

    }
})
document.getElementById("cancelapt").addEventListener("click",async function(e){
    e.preventDefault();
    const rawResponse = await fetch('/patientportal', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({docid:document.getElementById('docidc').value,slot:document.getElementById('slotc').value,flag:"cancel"})

    });
    const content = await rawResponse.json();
    console.log(content.status);
    if(content.status=='yes')
    {
        window.alert("Cancelled Successfully!")
        window.location.href="/patientportal"
    }
    else {
        window.alert("Error@123/No slot found booked with doctor/check details")
        window.location.href="/patientportal"

    }
})
document.getElementById("cnf").addEventListener("click",async function(e){
  e.preventDefault();
  const rawResponse = await fetch('/patientportal', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({docid:document.getElementById('docid2').value,slot:document.getElementById('slot2').value,flag:"ok"})

  });
  const content = await rawResponse.json();
  console.log(content.status);
  if(content.status=='ok')
  {
      window.alert("Booked Successfully!")
      window.location.href="/patientportal"
  }
  else {
      window.alert("Slots taken Choose others!")
      window.location.href="/patientportal"

  }
})
document.getElementById("savechanges").addEventListener("click",async function(e){
    e.preventDefault();
    const rawResponse = await fetch('/patientportal', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({pass1:document.getElementById('pass1').value,pass2:document.getElementById('pass2').value,name:document.getElementById('name').value,phno:document.getElementById('phonenum').value,dob:document.getElementById('dob').value,gender:document.getElementById('gender').value,adhar:document.getElementById('adhar').value,flag:'info'})

    });
    const content = await rawResponse.json();
    if(content.status=='updated')
    {
        window.alert("Info Updated Successfully!")
        window.location.href="/patientportal"
    }
    else {
        console.log("Update Failed please try again")
        window.location.href="/patientportal"

    }
})
document.getElementById("strip").addEventListener("click", function() {


    let check = document.getElementById("elements").style.display;
    if (check == "none") {
        document.getElementById("elements").style.display = "block";


    } else {
        document.getElementById("elements").style.display = "none";

    }


})
document.getElementById("a").addEventListener("click", function() {

    document.getElementById('cancel').style.display='none';
    document.getElementById('booking').style.display='none';
    document.getElementById('past-appointment').style.display='none';
    document.getElementById('info').style.display='none';
    document.getElementById('map1').style.display='none';
    document.getElementById('upcoming').style.display='block';


})

document.getElementById("b").addEventListener("click", async function(e) {


    document.getElementById('cancel').style.display='none';
    document.getElementById('booking').style.display='none';
    document.getElementById('past-appointment').style.display='none';

    document.getElementById('map1').style.display='none';
    document.getElementById('upcoming').style.display='none';
      document.getElementById('info').style.display='block';





})
document.getElementById("d").addEventListener("click", function() {

    document.getElementById('past-appointment').style.display='none';
    document.getElementById('cancel').style.display='none';
    document.getElementById('upcoming').style.display='none';
    document.getElementById('info').style.display='none';
    document.getElementById('map1').style.display='none';
    document.getElementById('booking').style.display='block';

})
document.getElementById("e").addEventListener("click", function() {


    document.getElementById('upcoming').style.display='none';
    document.getElementById('booking').style.display='none';
    document.getElementById('past-appointment').style.display='none';
    document.getElementById('info').style.display='none';
    document.getElementById('map1').style.display='none';
    document.getElementById('cancel').style.display='block';
})
document.getElementById("f").addEventListener("click", function() {


    document.getElementById('upcoming').style.display='none';
    document.getElementById('booking').style.display='none';
    document.getElementById('cancel').style.display='none';
    document.getElementById('info').style.display='none';
    document.getElementById('map1').style.display='none';
    document.getElementById('past-appointment').style.display='block';

})
document.getElementById("g").addEventListener("click", function() {


    document.getElementById('upcoming').style.display='none';
    document.getElementById('booking').style.display='none';
    document.getElementById('cancel').style.display='none';
    document.getElementById('info').style.display='none';
        document.getElementById('past-appointment').style.display='none';
    document.getElementById('map1').style.display='block';



})
