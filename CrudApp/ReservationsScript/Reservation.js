var Reservations = {
    ResetReservation: function () {
        $("#txtTable").val('');
        $("#txtPerson").val('');
        $("#txtCheckIn").val('');
        $("#txtCheckOut").val('');
        $("#txtLocation").val('');
        $('#hidden_course_id').val('');
        $("#sub").show();
        $("#myModalLabel").html('Reservation Form');
        $("#spnName").text('');
        $("#spnName").hide();
        $("#sub").html('Accept Reservation');
        Reservations.ToggleTextBox(false);
    },
    OpenPopUp: function () {
        Reservations.ResetReservation();
        $('#myModal').modal('show');
    },
    SaveReservation: function () {
        let url = '/Home/ReserveTable';

        let obj =
        {
            Id: $('#hidden_course_id').val(),
            Total_Table_Number: $("#txtTable").val(),
            Total_Person: $("#txtPerson").val(),
            StartDate: $("#txtCheckIn").val(),
            EndDate: $("#txtCheckOut").val(),
            Locations: $("#txtLocation").val()

        }

        if (obj.Id != null && obj.Id != 0 && obj.Id != '') {
            url = '/Home/EditReservedTable'
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: obj,
            success: function (data) {
            },
            complete: function () {
                $('#myModal').modal('hide');
                Reservations.GetReservationData();
            }
        });
        //$('#myModal').modal('hide');
    },


    OpenReservationDetails: function (id) {
        $("#sub").hide();
        $("#myModalLabel").html('Reservation Details');
        $.ajax({
            type: 'GET',
            url: '/Home/GetReservationDetails?id=' + id,
            // data: obj,
            success: function (data) {
                debugger;
                $('#txtTable').val(data.Total_Table_Number);
                $('#txtPerson').val(data.Total_Person);
                $('#txtCheckIn').val(data.StartDate);
                $('#txtCheckOut').val(data.EndDate);
                $('#txtLocation').val(data.Locations);
                $('#hidden_course_id').val(data.Id);
                $('#myModal').modal('show');
                Reservations.ToggleTextBox(true);
            }
        });
    },
    ToggleTextBox: function (value) {
        $('#txtTable').prop('readonly', value);
        $('#txtPerson').prop('readonly', value);
        $('#txtCheckIn').prop('readonly', value);
        $('#txtCheckOut').prop('readonly', value);
        $('#txtLocation').prop('readonly', value);
    },


    EditReservationDetails: function (id) {
        $("#myModalLabel").html('EditReservation');
        $("#sub").html('EditReservation');
        $("#sub").show();
        $.ajax({
            type: 'Get',
            url: '/Home/EditReservedTable?id=' + id,
            success: function (data) {
                debugger;
                $('#txtTable').val(data.Total_Table_Number);
                $('#txtPerson').val(data.Total_Person);
                $('#txtCheckIn').val(data.StartDate);
                $('#txtCheckOut').val(data.EndDate);
                $('#txtLocation').val(data.Locations);
                $('#myModal').modal('show');
                Reservations.ToggleTextBox(false);
            }
        });
    },

    GetReservationData: function () {
        $('#courseDiv').html('');
        $.ajax({
            type: 'Get',
            url: '/Home/_GetReservationList',
            success: function (data) {
                debugger;
                $('#courseDiv').html(data);
            },
            complete: function () {
            }
        });
    }
};