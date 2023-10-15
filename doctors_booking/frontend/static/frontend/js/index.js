$(document).ready(function(){
       /* async function fetchPatient(pid){
        const patient = await fetch(`/wellbeing/api/patient/${pid}`)
                            .then((response) => response.json())
        return patient
    }*/

    var SelectedButton = null;
    var appointmentindex = 0
    var LIMemID = null;

    async function GetDoctors()
    {
        $.ajax({
            url: '/wellbeing/api/doctor',
            method: 'GET',
            data:{
                current_doctor:true
            },
            success: function(response)
            {
                response.forEach(function(doctor) {
                 $('#doctors').append(new Option(doctor.first_name + " " + doctor.last_name, doctor.id))
                });
                {
                    
                }
            }
        })
    }

    function extractNumbers(str) {
        let matches = str.match(/\d+/g);
        return matches;
    }

    function TimeToIndex(time)
    {
        switch(time)
        {
            case "09:30:00":
                return 0;
                break;
            case "10:00:00":
                return 1;
                break;
            case "10:30:00":
                return 2;
                break;
            case "11:00:00":
                return 3;
                break;
            case "11:30:00":
                return 4;
                break;
            case "12:00:00":
                return 5;
                break;
            case "12:30:00":
                return 6;
                break;
            case "13:00:00":
                return 7;
                break;
            case "13:30:00":
                return 8;
                break;
            case "14:00:00":
                return 9;
                break;
            case "14:30:00":
                return 10;
                break;
            case "15:00:00":
                return 11;
                break;
            case "15:30:00":
                return 12;
                break;
        }
    }

    function IndexToTime(Index)
    {
        switch(Index)
        {
            case 0:
                return "09:30:00";
                break;
            case 1:
                return "10:00:00";
                break;
            case 2:
                return "10:30:00";
                break;
            case 3:
                return "11:00:00";
                break;
            case 4:
                return "11:30:00";
                break;
            case 5:
                return "12:00:00";
                break;
            case 6:
                return "12:30:00";
                break;
            case 7:
                return "13:00:00";
                break;
            case 8:
                return "13:30:00";
                break;
            case 9:
                return "14:00:00";
                break;
            case 10:
                return "14:30:00";
                break;
            case 11:
                return "15:00:00";
                break;
            case 12:
                return "15:30:00";
                break;
        }
    }

    function ColumnToDate(column)
    {
        CurDay = new Date;
        DateString = null;
        if (appointmentindex != 0)
        {
            CurDay.setDate(CurDay.getDate() + (appointmentindex * 7));
        }

        CurDay.setDate(CurDay.getDate() + (column - 1));
        DateString = (CurDay.getFullYear().toString() + "-" + (CurDay.getMonth() + 1).toString() + "-" + CurDay.getDate().toString() );
        return DateString;
    }

    function GetAppointmentsForDay(day, col, doctor)
    {
        //+1 month is offset since month is 0 indexed
        formatdate = day.getFullYear().toString() + "-" + (day.getMonth()+1).toString() + "-" + day.getDate().toString();
        $.ajax({
            url: '/wellbeing/api/appointment',
            method: 'GET',
            data:{
                date:formatdate,
                doctor:doctor
            },
            success: function(response)
            {
                len = response.length;
                if(len != 0)
                {
                    for (i = 0; i < len; i++)
                    {
                        ButChange = $('#r'+TimeToIndex(response[i].time)+'h'+(col+1));
                        ButChange.prop("disabled", true);
                        ButChange.removeClass('availablebutton');
                        ButChange.addClass('disabledbutton');
                    }
                }
            }
        })
    }

    function DayIndexToDay(DayIndex)
    {
        switch(DayIndex)
        {
            case 0:
                return "Sunday";
                break;
            case 1:
                return "Monday";
                break;
            case 2:
                return "Tuesday";
                break;
            case 3:
                return "Wednesday";
                break;
            case 4:
                return "Thursday";
                break;
            case 5:
                return "Friday";
                break;
            case 6:
                return "Saturday";
                break;
        }
    }

    function ClearTable()
    {
        Buttons = $('.tablebutton');
        Buttons.removeClass('disabledbutton');
        Buttons.addClass('availablebutton');
    }


    function DisplayAppointments(doctor)
    {
        let CurDay = new Date;
        CurDay.setDate(CurDay.getDate() + (appointmentindex * 7));
        let DayList = [CurDay, new Date(CurDay), new Date(CurDay), new Date(CurDay), new Date(CurDay), new Date(CurDay), new Date(CurDay)];
        for (i = 0; i < 7; i++)
        {  
            if (i != 0)
            DayList[i].setDate(DayList[i].getDate() + i);

            $("#header"+(i+1).toString()).html(DayList[i].getDate().toString() + "-" + (DayList[i].getMonth()+1).toString() + "<br/> " + DayIndexToDay(DayList[i].getDay()));

            GetAppointmentsForDay(DayList[i], i, doctor);
        }
        $('#apptable').show(100);
    }
    
    $('#doctors').change(function()
    {
        let SelVal = $('#doctors').find(":selected").val();
        if (SelVal == 'default')
        {
            $('#appointsect').fadeOut();
            $('#infosect').fadeOut();
            $('#submitsect').fadeOut();
            
            ClearTable();
            return;
        }

        $.ajax({
            url: '/wellbeing/api/appointment',
            method: 'GET',
            data:{
                doctor: SelVal
            },
        success: function(response)
        {
            $('#appointsect').fadeIn();
            $('#infosect').fadeIn();
            $('#submitsect').fadeIn();
            ClearTable();
            DisplayAppointments(SelVal);
        }})   
    });


    function BookAppointment(PatID)
    {
        //data.patient = PatID
        let SelVal = $('#doctors').find(":selected").val();
        //consolelog(SelectedButton.id);
        ButtonID = SelectedButton.attr('id');
        Vals = extractNumbers(SelectedButton.attr('id'))
        AppInfo = {
            patient:PatID,
            doctor:SelVal,
            time:IndexToTime(Number(Vals[0])),
            date:ColumnToDate(Number(Vals[1])),
        }
        $.ajax({
            url: '/wellbeing/api/appointment/',
            method: 'POST',
            data:AppInfo,
            success: function(response)
            {
                //console.log("Appointment booked!");
                $('#notifypara').text("Appointment booked!");
                $('#notifysect').fadeIn();
            }
        });
    }

    $('#submitbutton').click(function(){

        let data = {
            first_name:$('#fname').val().toLowerCase(),
            last_name:$('#lname').val().toLowerCase(),
            dob:$('#dob').val(),
            email:$('#email').val().toLowerCase(),
            phone:$('#phnum').val().toLowerCase(),
            address:$('#address').val().toLowerCase(),
            member_id:Number($('#memid').val()),
            gender:$('input[name=gender]:checked').val(),
            current_patient:($('input[name=newold]:checked').val() === 'true')
        }  
        let PatID = -1;
        $.ajax({
            url: '/wellbeing/api/patient',
            method: 'GET',
            data:data,
            success: function(response){
                //this is checking if you selected returning
                //if (($('input[name=newold]:checked').val() === 'true') === true)
                if(data.current_patient === true)
                {
                    if (response.length === 0) //this should be calling a function to actually check the response vs inputs no length
                    {
                        $.ajax({
                            url: '/wellbeing/api/patient/',
                            method: 'POST',
                            data:data,
                            success: function(response){
                                $.ajax({
                                    url: '/wellbeing/api/patient',
                                    method: 'GET',
                                    data:data,
                                    success: function(response){
                                        PatID = Number(response[0].id);
                                        BookAppointment(PatID);
                                    }
                                });
                            }
                        });
                    }
                    else if (response.length === 1) //and this is the else of it, or vice versa
                    {
                        PatID = Number(response[0].id);
                        BookAppointment(PatID);
                    }
                }
                else if (data.current_patient === false)
                {
                    $.ajax({
                        url: '/wellbeing/api/patient/',
                        method: 'POST',
                        data:data,
                        success: function(response){
                            $.ajax({
                                url: '/wellbeing/api/patient',
                                method: 'GET',
                                data:data,
                                success: function(response){
                                    PatID = Number(response[0].id);
                                    BookAppointment(PatID);
                                }
                            });
                        }
                    });
                }
            }
        });
    }); 

    $('.tablebutton').on('click', function()
    {
        if (SelectedButton != null)
        {
            SelectedButton.removeClass('SelectedButton');
        }
        SelectedButton = $(this);
        SelectedButton.addClass('SelectedButton');        
    });

    $('#forwardbutton').on('click',function()
    {
        appointmentindex++;
        $('#backbutton').prop('disabled',false);
        let SelVal = $('#doctors').find(":selected").val();
        ClearTable();
        DisplayAppointments(SelVal);
    });

    $('#backbutton').on('click',function()
    {
        appointmentindex--;
        if (appointmentindex <= 0)
        {
            $(this).prop('disabled', true);
        }
        let SelVal = $('#doctors').find(":selected").val();
        ClearTable();
        DisplayAppointments(SelVal);
    });

    function LoadMemeberCookie()
    {
        let cookies = document.cookie.split(';');
        cookies.forEach(function(val){
            let cook = val.split('=');
            cook[0] = cook[0].trim();
            cook[1] = cook[1].trim();
            if(cook[0] === "member_ID")
            {
                LIMemID = Number(cook[1]);
                GetNextAppointment();
            }
        })
    }

    function GetNextAppointment()
    {
        if(LIMemID != null)
        {
            $.ajax({
                url: '/wellbeing/api/patient',
                method: 'GET',
                data:{
                    member_id:LIMemID
                },
                success: function(response){
                    if(response.length > 0)
                    {
                    let myid = response[0].id;
                    $.ajax({
                        url: '/wellbeing/api/appointment',
                        method: 'GET',
                        data:{
                           patient:myid
                        },
                        success: function(response)
                        {
                            let time = response[0].time;
                            let date = response[0].date;
                            
                            $.ajax({
                                url: '/wellbeing/api/doctor',
                                method: 'GET',
                                data:{
                                    id:response[0].doctor
                                },
                                success: function(response)
                                {
                                    $('#uppernotifypara').text("You have an upcoming appointment at " + 
                                    time.toString() + " on " + date.toString() + " with Dr " + response[0].first_name + " " + response[0].last_name + ".");
                                    $('#uppernotifysect').show();
                                    
                                }
                            });
                        }
                    });
                }
                }
            });
        }
    }

    LoadMemeberCookie();
    GetDoctors()
});