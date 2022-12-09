document.getElementById('sbtn').addEventListener('click', async function(e){
    let x = document.getElementById('email').value;
    let fl = 1;
    let atposition = x.indexOf('@');
    let dotposition = x.lastIndexOf('.');
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
        fl = 0;
        alert('Please enter a valid e-mail address \n')
    }
    else{
      e.preventDefault();
      const rawResponse = await fetch('/forget', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email:document.getElementById('email').value})

      })
      const content = await rawResponse.json();

          if(content.message=="success"||content.message=="successD") {
              window.alert("email sent successfully")
              window.location.href = "/signin";
          }
          else{
              window.alert("error")
              window.location.href = "/signin";
          }

    }


})
