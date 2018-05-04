//localstorage
/*function idTrasladar() {
    var id = document.getElementById("id").value;
    localStorage.setItem('idTrasladar', JSON.stringify(id))

}*/

var MEETING = MEETING || {
    // CREAR Client
    /**registra el Client en la bd */
    RegisterMeeting: function() {
        console.log($('#userCombo').val());
        console.log($('#date').val());
        console.log($('#time').val());
        if (MEETING.validacion() == true) {
                if ($('#isvirtual').is(':checked')) {
    
                    var isvirtual = true;
                } else {
                    isvirtual = false;
                }
            $.ajax({
                url: 'http://localhost:3000/meetings',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    meeting: {
                        user_id: $('#userCombo').val(),
                        client_id: $('#clientCombo').val(),
                        TITLE: $('#title').val(),
                        date: $('#date').val(),
                        time: $('#time').val(),
                        IS_VITUAL: isvirtual,
                        
                        
                    }
                }),
                success: function(data) {
                    alert('Registro Exitoso');
                    window.location.href = 'MeetingRegister.html';
                },
                error: function() {
                    alert('error');
                }
            });
        }
    },
    // Valida los input
    /**no permite guardar los datos vacios*/
    validacion: function() {
        
        var result = false;
        
        if ($('#title').val() == "" || $('#daytime').val() == "" || $('#isvirtual').val() == ""
        || $('#date').val() == "" || $('#time').val() == ""){
            alert('Digite todos los datos solicitados');

            return result;
        } else {
            result = true;
            return result;
        }
    },
    // editar user
    /**edita el usaurio en la bd*/
    EditMeeting: function() {
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = parseInt(params.get("id"));
        //console.log($('#clientCombo').val());
        //if(confirm("estas seguro") == 'Aceptar'){
        ;
        if (MEETING.validacion() == true) {
            if (MEETING.validacion() == true) {
                if ($('#isvirtual').is(':checked')) {
    
                    var isvirtual = true;
                } else {
                    isvirtual = false;
                }
            }
            $.ajax({
                url: 'http://localhost:3000/meetings/' + id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    meeting: {
                        user_id: $('#userCombo').val(),
                        client_id: $('#clientCombo').val(),
                        TITLE: $('#title').val(),
                        date: $('#date').val(),
                        time: $('#time').val(),
                        IS_VITUAL: isvirtual,
                    }
                }),
                success: function(data) {
                    alert('Datos actualizados correctamente');
                    window.location.href = 'MeetingTable.html';
                },
                error: function() {
                    alert('error');
                }
            });


            //}
        }
    },

    // Elimina el usuario
    /**elimina el usuario de la bd*/
    DeleteMeeting: function() {
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = parseInt(params.get("id"));
        console.log(id)
        $.ajax({
            url: 'http://localhost:3000/meetings/' + id,
            type: 'DELETE',

            success: function(data) {
                alert('Meeting eliminado correctamente');
                window.location.href = 'MeetingTable.html';
            },
            error: function(request, msg, error) {
                alert('error');
            }
        })
    },
    // get usuarios
    /**trae todos los usuarios de la bd*/
    getMeetings: function() {
        
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/meetings"
        }).done(function(response) {
            
            response.forEach(function(element) {
                /*var nameClient
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:3000/clients/' + element.client_id,
                    contentType: 'application/json',
                    data: JSON.stringify({
                    client: {
                            NAME:NAME,
                            IDENTITY_CARD: IDENTITY_CARD,
                            WEB_PAGE: WEB_PAGE,
                            ADDRESS: ADDRESS,
                            PHONE: PHONE,
                            SECTOR: SECTOR,
                }
                
                }),
                nameClient = data.NAME,
                 }),
                console.log(nameClient);*/
                var row = "<tr>";
                row += "<td>" + element.user_id+ "</td>";
                row += "<td>" + element.client_id + "</td>";
                row += "<td>" + element.TITLE + "</td>";
                row += "<td>" + element.date + "</td>";
                row += "<td>" + element.time + "</td>";
                row += "<td>" + element.IS_VITUAL + "</td>";
                row += "<td>" + "<a href = 'MeetingEdit.html?id=" + element.id + "' id=" + element.id + " class='btn btn-info'>Edit</a>" + "</td>";
                //row += "<td>"+"<a name= 'id' id="+element.id+" onclick='USER.getUserEdit("+element.id+");' class='btn btn-info'>Edit</a>"+"</td>";
                row += "<td>" + "<a href = 'MeetingShow.html?id=" + element.id + "' id=" + element.id + " class='btn btn-success'>Show</a>" + "</td>";
                row += "<tr/>";

                $("#meetingsTable").append(row);
            });

        }).fail(function(error) {

            alert('error');
        });
    },
    /*getClientName:function(id){
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/clients/' + id,
            type: 'GET',
            contentType: 'application/json',
            data: JSON.stringify({
                client: {
                    NAME: $('#name').val(),
                    IDENTITY_CARD: $('#identitycard').val(),
                    WEB_PAGE: $('#webpage').val(),
                    ADDRESS: $('#address').val(),
                    PHONE: $('#phone').val(),
                    SECTOR: $("#sector").val(),
                }
                
            }),success: function(data) {
                console.log(data.NAME);
                return data.NAME; 
             }
            
            
        }) 
    },*/
 

    // trae un usuario por id
    /**trae la info de un usaurio y carga su info en la vista*/
    getMeetingById: function(id) {
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/meetings/' + id,
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                $("#userCombo").val(data.user_id);
                $("#clientCombo").val(data.client_id);
                $("#title").val(data.TITLE);
                $("#date").val(data.date);
                $("#time").val(data.time);
                if (data.IS_VITUAL == true) {
                    $('#isvirtual').prop("checked", true);

                }
            },
            error: function() {
                alert('error');
            }

        });
    },
    ComboboxClient: function() {
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/clients"
        }).done(function(response) {

            response.forEach(function(element) {
                console.log(element);
                $("#clientCombo").append('<option value="'+element.id+'">'+element.NAME+'</option>');
            });

        }).fail(function(error) {

            alert('error');
        });
    },

    ComboboxUser: function() {
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/users"
        }).done(function(response) {

            response.forEach(function(element) {
                console.log(element);
                $("#userCombo").append('<option value="'+element.id+'">'+element.NAME+'</option>');
            });

        }).fail(function(error) {

            alert('error');
        });
    },

    limpiar: function() {},
    // trae un usuario por id
    /**trae la info de un usaurio y carga su info en la vista*/
    getMeetingByIdLabels: function(id) {
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/meetings/' + id,
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                console.log(data.NAME);
                $("#id").text(data.id);
                $("#userid").text(data.user_id);
                $("#clientid").text(data.client_id);
                $("#title").text(data.TITLE);
                $("#date").text(data.date);
                $("#time").text(data.time);
                $("#isvirtual").text(data.IS_VITUAL);
        

            },
            error: function() {
                alert('error');
            }

        });
        
    },
}