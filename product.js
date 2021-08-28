var  productApi = 'http://localhost:3000/products';

function start() {
    getProducts(renderProducts);

    handleCreateForm();
}

//load lại web
start();

//Functions

//GET
function getProducts(callback) {
    fetch(productApi) 
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

//POST
function createProduct(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), data
    }
    fetch(productApi, options)
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
    fetch(productApi + '/' + id, options)
        .then(function (response) {
            response.json();
        })
        .then(function () {
            //getProducts(renderProducts); reload lại web
            var productItem = document.querySelector('.product-item-' + id);
            //xóa khỏi form code
            if (productItem) {
                productItem.remove();
            }
        });
}

//render ra users
function renderProducts(products) {
    var listProducts = document.querySelector('#myTbody');
    var htmls = users.map(function(user) {
        return `
            <tr>
            <td scope="col">${product.inputName}</td>
            <td scope="col">${product.inputBrand}</td>
            <td scope="col">${product.list}</td>
            <td scope="col" class="edit">
                <img src="https://lh3.googleusercontent.com/p4cpAfa-27fC6OC4lB_xK2MR6AZoXIcitqqzz5I2yT06f7ZbXa2UrwzaAxT7jYbwW3nORq8uYt6JrHHAzL0QgRee0BmNMwSyYBXTEm0VIaG8RwI1CVVCuX-PNo1nIfvTxa3AB8LW"
                    height=50px width=50px></img>
            </td>
            <td scope="col" class="edit">
                <a href="#"><i class="fas fa-edit" onclick="productDisplay(this)"></i></a>
                <a href="#"><i class="fas fa-trash-alt" onclick="productDelete(this)"></i></a>
            </td>
        </tr>
        `;
    });
    listProducts.innerHTML = htmls.join('');
}

//tạo form
function handleCreateForm() {
    var createBtn = document.querySelector('#updateButton');

    createBtn.onclick = function () {
        //lay data
        var number = document.querySelector('input[name="inputName"]').value;
        var inputName = document.querySelector('input[name="inputBrand"]').value;
        var power = document.querySelector('select[name="list"]').value;
        
        //gửi lệnh
        var formData = {
            inputName: inputName,
            inputBrand: inputBrand,
            list: list
        };
        createProduct(formData, function() {
            getProducts(renderProducts);
        });
    }
}