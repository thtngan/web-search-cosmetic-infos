
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function show(message) {
  var el = document.createElement("div");
  el.className = "snackbar";
  var y = document.getElementById("snackbar-container");

  el.innerHTML = message;
  y.append(el);
  el.className = "snackbar show";
  setTimeout(function(){ el.remove(); }, 5000);
}


function signin() {
	var email = document.getElementById('_email').value;
	var password = document.getElementById('_password').value;
	if(email.trim() == '' || password.trim() == '') {
		show('Nhập thiếu thông tin email hoặc mật khẩu');
		return;
	}
	fetch('/api/auth/signin', {
		method: 'POST',
		headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
	    	email: email,
	    	password: password
	    })
	})
	.then(response => {
		response.json().then(data => {
			show(data['message']);
		});
	});
}

function signup() {
	var email = document.getElementById('email').value;
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	if(username.trim() == '' || password.trim() == '') {
		show('Nhập thiếu thông tin tài khoản hoặc mật khẩu');
		return;
	}
	console.log(username, password);
	fetch('/api/auth/signup', {
		method: 'POST',
		headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
			email: email,
	    	username: username,
	    	password: password
	    })
	})
	.then(response => {
		response.json().then(data => {
			show(data['message']);
		});
	});
}