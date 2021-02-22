var Courses = {
    Reset: function () {
        $("#txtName").val('');
        $("#txtDescription").val('');
        $("#txtLevel").val('');
        $("#txtFullPrice").val('');
        $("#txtAuthorId").val('');
        $('#hidden_course_id').val('');
        $("#sub").show();
        $("#myModalLabel").html('Create');
        $("#spnName").text('');
        $("#spnName").hide();
        $("#sub").html('Create');
        Courses.ToggleTextBox(false);
    },
    OpenPopUp: function () {
        debugger;
        Courses.Reset();
        $('#myModal').modal('show');
    },
    Save: function () {
        let url = '/Home/Create';
        let obj =
        {
            Id: $('#hidden_course_id').val(),
            Name: $("#txtName").val(),
            Description: $("#txtDescription").val(),
            Level: $("#txtLevel").val(),
            FullPrice: $("#txtFullPrice").val(),
            AuthorId: $("#txtAuthorId").val()

        }
        $("#txtName").blur(function () {
            var text = $(this).val();
            if (obj.text.length < 3) {
                $(this).css("box-shadow", "0 0 4px #811");
            }
            else {
                $(this).css("box-shadow", "0 0 4px #181");
            }
        })

        if (obj.Name == "" || obj.Name == null) {
            $("#spnName").text('Username is required');
            $("#spnName").show();

        }
        else {
            $("#spnName").text('');
            $("#spnName").hide();

        }
        if (obj.Description == "" || obj.Description == null) {
            $("#spnDescription").text('Description is required');
            $("#spnDescription").show();

        }
        else {
            $("#spnDescription").text('');
            $("#spnDescription").hide();

        }
        if (obj.FullPrice == "" || obj.FullPrice == null) {
            $("#spnFullPrice").text('Fullprice is required');
            $("#spnFullPrice").show();

        }
        else {
            $("#spnFullPrice").text('');
            $("#spnFullPrice").hide();

        }
        if (obj.Id != null && obj.Id != 0 && obj.Id != '') {
            url = '/Home/Edit'
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: obj,
            success: function (data) {
            },
            complete: function () {
                $('#myModal').modal('hide');
                Courses.GetCourseData();
            }
        });
        //$('#myModal').modal('hide');
    },

    LoginParams: function () {
        //$('input').removeClass('required_fields_border');
        var required_fields = [];
        var data = {
            Id: $('#hidden_course_id').val(),
            Name: $("#txtName").val(),
            Description: $("#txtDescription").val(),
            Level: $("#txtLevel").val(),
            FullPrice: $("#txtFullPrice").val(),
            AuthorId: $("#txtAuthorId").val()
        }
        if (data.Name == null || data.Name == '') {
            required_fields.push('txtName');
        }
        //if (data.password == null || data.password == '') {
        //    required_fields.push('login_user_password');
        //}

        if (required_fields.length > 0) {
            Account.RequiredValidation(required_fields);
            $('#Required_fields_message').show();
        }
        else {
            return data;
        }
        return null;
    },

    OpenDetailsModal: function (id) {
        $("#sub").hide();
        $("#myModalLabel").html('Details');
        $.ajax({
            type: 'GET',
            url: '/Home/Details?id=' + id,
            // data: obj,
            success: function (data) {
                debugger;
                $('#txtName').val(data.Name);
                $('#txtDescription').val(data.Description);
                $('#txtFullPrice').val(data.FullPrice);
                $('#txtLevel').val(data.Level);
                $('#txtAuthorId').val(data.AuthorId);
                $('#hidden_course_id').val(data.Id);
                $('#myModal').modal('show');
                Courses.ToggleTextBox(true);
                swal("Here's a message!")
            }
        });
    },
    ToggleTextBox: function (value) {
        $('#txtName').prop('readonly', value);
        $('#txtDescription').prop('readonly', value);
        $('#txtFullPrice').prop('readonly', value);
        $('#txtLevel').prop('readonly', value);
        $('#txtAuthorId').prop('readonly', value);
    },
    Delete: function (id, Description) {
        var Import = new Object();
        Import.id = id;
        bootbox.confirm({
            message: "Are you sure want to delete " + Description + "?",
            callback: function (data) {
                debugger;
                if (data) {
                    $.ajax({
                        type: 'Post',
                        url: '/Home/Delete?id=' + id,
                        contentType: 'application/json',
                        success: function (data) {
                            $('#myModal').modal('hide');
                            alert("Deleted Successfully!");
                            Courses.GetCourseData();
                        }
                    });
                }
            },
        });
    },

    OpenEditModal: function (id) {
        $("#myModalLabel").html('Edit');
        $("#sub").html('Edit');
        $("#sub").show();
        $.ajax({
            type: 'Get',
            url: '/Home/Details?id=' + id,
            success: function (data) {
                debugger;
                $('#txtName').val(data.Name);
                $('#txtDescription').val(data.Description);
                $('#txtFullPrice').val(data.FullPrice);
                $('#txtLevel').val(data.Level);
                $('#txtAuthorId').val(data.AuthorId);
                $('#hidden_course_id').val(data.Id);
                $('#myModal').modal('show');
                Courses.ToggleTextBox(false);
                swal("Here's the title!", "...and here's the text!");
            }
        });
    },

    GetCourseData: function () {
        $('#courseDiv').html('');
        $.ajax({
            type: 'Get',
            url: '/Home/_Courses',
            success: function (data) {
                debugger;
                $('#courseDiv').html(data);
            },
            complete: function () {
                //$('#CoursesTable').DataTable();
            }
        });
    }
};