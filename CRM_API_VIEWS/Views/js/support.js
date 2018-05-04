//localstorage
/*function idTrasladar() {
    var id = document.getElementById("id").value;
    localStorage.setItem('idTrasladar', JSON.stringify(id))

}*/

var SUPPORT = SUPPORT || {
    // CREAR Client
    /**registra el Client en la bd */
    RegisterSupport: function() {
        if (SUPPORT.validacion() == true) {
            $.ajax({
                url: 'http://localhost:3000/support_tickets',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    support_ticket: {
                        user_id: $('#userCombo').val(),
                        client_id: $('#clientCombo').val(),
                        PROBLEM_TITTLE: $('#problemtitlle').val(),
                        PROBLEM_DETAIL: $('#problemdetail').val(),
                        STATUS: $('#status').val(),

                        
                        
                    }
                }),
                success: function(data) {
                    alert('Registro Exitoso');
                    window.location.href = 'SupportRegister.html';
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
        
        if ($('#problemtitlle').val() == "" || $('#problemdetail').val() == "" || $('#status').val() == ""){
            alert('Digite todos los datos solicitados');

            return result;
        } else {
            result = true;
            return result;
        }
    },
    // editar user
    /**edita el usaurio en la bd*/
    EditSupport: function() {
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = parseInt(params.get("id"));
        //console.log($('#clientCombo').val());
        //if(confirm("estas seguro") == 'Aceptar'){
            $.ajax({
                url: 'http://localhost:3000/support_tickets/' + id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    support_ticket: {
                        user_id: $('#userCombo').val(),
                        client_id: $('#clientCombo').val(),
                        PROBLEM_TITTLE: $('#problemtitlle').val(),
                        PROBLEM_DETAIL: $('#problemdetail').val(),
                        STATUS: $('#status').val(),
                        
                    }
                }),
                success: function(data) {
                    alert('Datos actualizados correctamente');
                    window.location.href = 'SupportTable.html';
                },
                error: function() {
                    alert('error');
                }
            });


            //}
        
    },

    // Elimina el usuario
    /**elimina el usuario de la bd*/
    DeleteSupport: function() {
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = parseInt(params.get("id"));
        console.log(id)
        $.ajax({
            url: 'http://localhost:3000/support_tickets/' + id,
            type: 'DELETE',

            success: function(data) {
                alert('Support ticket eliminado correctamente');
                window.location.href = 'SupportTable.html';
            },
            error: function(request, msg, error) {
                alert('error');
            }
        })
    },
    // get usuarios
    /**trae todos los usuarios de la bd*/
    getSupports: function() {
        
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/support_tickets"
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
                row += "<td>" + element.PROBLEM_TITTLE + "</td>";
                row += "<td>" + element.PROBLEM_DETAIL + "</td>";
                row += "<td>" + element.STATUS + "</td>";
                row += "<td>" + "<a href = 'SupportEdit.html?id=" + element.id + "' id=" + element.id + " class='btn btn-info'>Edit</a>" + "</td>";
                //row += "<td>"+"<a name= 'id' id="+element.id+" onclick='USER.getUserEdit("+element.id+");' class='btn btn-info'>Edit</a>"+"</td>";
                row += "<td>" + "<a href = 'SupportShow.html?id=" + element.id + "' id=" + element.id + " class='btn btn-success'>Show</a>" + "</td>";
                row += "<tr/>";

                $("#supportsTable").append(row);
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
    getSupportById: function(id) {
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/support_tickets/' + id,
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                $("#userCombo").val(data.user_id);
                $("#clientCombo").val(data.client_id);
                $("#problemtitlle").val(data.PROBLEM_TITTLE);
                $("#problemdetail").val(data.PROBLEM_DETAIL);
                $("#status").val(data.STATUS);
                
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
    getSupportByIdLabels: function(id) {
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/support_tickets/' + id,
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                $("#id").text(data.id);
                $("#userid").text(data.user_id);
                $("#clientid").text(data.client_id);
                $("#problemtittle").text(data.PROBLEM_TITTLE);
                $("#problemdetail").text(data.PROBLEM_DETAIL);
                $("#status").text(data.STATUS);
        

            },
            error: function() {
                alert('error');
            }

        });
        
    },
}