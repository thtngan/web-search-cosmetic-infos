$('#btnSave').hide();



$("#btnPreSave").click(() => {
    $("#main :input").removeClass('borderClass');
    var flag = true;
    $("#main :input").each(function () {
        if ($(this).val() === "") {
            console.log(this);
            $(this).addClass('borderClass');
            var str = "Bạn chưa điền thông tin của " + this.placeholder;
            $('.toast-body').empty();
            $('.toast-body').append(str);
            $('.toast').toast('show');
            flag = false;
        }
    });

    if (flag == true) {
        var str1 = "Bạn có chắc chắn sẽ lưu?";
        $('.toast-body').empty();
        $('.toast-body').append(str1);
        $('.toast').toast('show');
        $('#btnPreSave').hide();
        $('#btnSave').show();
    }

})