$(document).ready(function(){
        async function fetchPatient(pid){
        const patient = await fetch(`/api/patient/${pid}`)
                            .then((response) => response.json())
        return patient
    }

    async function GetDoctors()
    {
        $.ajax({
            url: '/api/doctor',
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

    function DisplayAppointments()
    {
        //I'm sensing a severe lack of appointments rn
    }
    
    $('#doctors').change(function()
    {
        let SelVal = $('#doctors').find(":selected").val();
        console.log(SelVal)
        if (SelVal == 'default')
        {
            console.log("Yeah im coming back relax");
            //should clear appointment thing right here right now ya feel
            return;
        }

        console.log("we ain't GOING back");
        $.ajax({
            url: '/api/appointment',
            method: 'GET',
            data:{
                doctor: SelVal
            },
        success: function(response)
        {
            console.log(response);
            DisplayAppointments();
        }})   
    });


    $('#submitbutton').click(function(){
        console.log("stop poking me!");

        let data = {
            first_name:$('#fname').val().toLowerCase(),
            last_name:$('#lname').val().toLowerCase(),
            dob:$('#dob').val().toLowerCase(),
            email:$('#email').val().toLowerCase(),
            phone:$('#phnum').val().toLowerCase(),
            address:$('#address').val().toLowerCase(),
            member_id:$('#memid').val().toLowerCase(),
            gender:$('input[name=gender]:checked').val(),
            current_patient:($('input[name=newold]:checked').val() === 'true')
        }  
        console.log(data);

        $.ajax({
            url: '/api/patient',
            method: 'GET',
            data:data,
            success: function(response){
                console.log(response)
                //this is checking if you selected returning
                //if (($('input[name=newold]:checked').val() === 'true') === true)
                if(data.current_patient === true)
                {
                    console.log("im back");
                    if (response.length === 0) //this should be calling a function to actually check the response vs inputs no length
                    {
                        console.log("I didn't see that fella come in today");
                        //need to
                    }
                    else if (response.length === 1) //and this is the else of it, or vice versa
                    {
                        console.log("Yeah I saw em, took off right as you were walking in");
                        BookAppointment();
                    }
                }
                else if (data.current_patient === false)
                {
                    console.log("Welcome to Joacobs creamatorium, you kill 'em we grill 'em")
                    //so now that we checked for duplicates do an ajax post and send in the data
                    BookAppointment();
                }
            }
        });
    }); 

    GetDoctors()
});