
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
	var userId = document.getElementById('_user_id').value;
	var password = document.getElementById('_password').value;
	if(userId.trim() == '' || password.trim() == '') {
		show('Nhập thiếu thông tin mã nhân viên hoặc mật khẩu');
		return;
	}
	fetch('signin', {
		method: 'POST',
		headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
	    	userId: userId,
	    	password: password
	    })
	})
	.then(response => {
		if(response.status == 200) {
			window.location = '/admin';
			return;
		}
		response.json().then(data => {
			show(data['message']);
		});
	});
}
