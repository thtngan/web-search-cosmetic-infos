var  userApi = 'http://localhost:3000/users';

function start() {
    getCourses(renderCourses);

    handleCreateForm();
}

//load lại web
start();

//Functions

//GET
function getCourses(callback) {
    fetch(userApi) 
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

//POST
function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), data
    }
    fetch(userApi, options)
        .then(function (response) {
            response.json();    
        })
        .then(callback);    
}

//DELETE
function userDelete(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(userApi + '/' + id, options)
        .then(function (response) {
            response.json();
        })
        .then(function () {
            //getCourses(renderCourses); reload lại web
            var userItem = document.querySelector('.user-item-' + id);
            //xóa khỏi form code
            if (userItem) {
                userItem.remove();
            }
        });
}

//render ra users
function renderCourses(users) {
    var listUsers = document.querySelector('#myTbody');
    var htmls = users.map(function(user) {
        return `
            <tr>
                <td scope="col" class="user-item-${user.id}">${user.number}</th>
                <td scope="col">${user.inputName}</td>
                <td scope="col">${user.inputAccount}</td>
                <td scope="col" id="pwd">${user.password}</td>
                <td scope="col">${user.power}</td>
                <td scope="col" class="edit">
                    <a href="#"><i class="fas fa-edit" onclick="userDisplay(${user.id})"></i></a>
                    <a href="#"><i class="fas fa-trash-alt" onclick="userDelete(${user.id})"></i></a>
                </td>
            </tr>
        `;
    });
    listUsers.innerHTML = htmls.join('');
}

//tạo form
function handleCreateForm() {
    var createBtn = document.querySelector('#updateButton');

    createBtn.onclick = function () {
        //lay data
        var number = document.querySelector('input[name="number"]').value;
        var inputName = document.querySelector('input[name="inputName"]').value;
        var inputAccount = document.querySelector('input[name="inputAccount"]').value;
        var password = document.querySelector('input[name="password"]').value;
        var power = document.querySelector('select[name="power"]').value;
        
        //gửi lệnh
        var formData = {
            number: number,
            inputName: inputName,
            inputAccount: inputAccount,
            password: password,
            power: power
        };
        createCourse(formData, function() {
            getCourses(renderCourses);
        });
    }
}