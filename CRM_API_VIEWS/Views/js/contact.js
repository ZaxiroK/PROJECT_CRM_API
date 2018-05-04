//localstorage
/*function idTrasladar() {
    var id = document.getElementById("id").value;
    localStorage.setItem('idTrasladar', JSON.stringify(id))

}*/

var CONTACT = CONTACT || {
    // CREAR Client
    /**registra el Client en la bd */
    RegisterContact: function() {
        console.log($('#clientCombo').val());
        if (CONTACT.validacion() == true) {
            $.ajax({
                url: 'http://localhost:3000/contacts',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    contact: {
                        client_id: $('#clientCombo').val(),
                        NAME: $('#name').val(),
                        LAST_NAME: $('#lastname').val(),
                        EMAIL: $('#email').val(),
                        PHONE: $('#phone').val(),
                        JOB: $('#job').val(),
                        
                    }
                }),
                success: function(data) {
                    alert('Registro Exitoso');
                    window.location.href = 'ContactRegister.html';
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
        
        if ($('#name').val() == "" || $('#lastname').val() == "" || $('#email').val() == "" ||
            $('#phone').val() == "" || $('#job').val() == "") {
            alert('Digite todos los datos solicitados');

            return result;
        } else {
            result = true;
            return result;
        }
    },
    // editar user
    /**edita el usaurio en la bd*/
    EditContact: function() {
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = parseInt(params.get("id"));
        console.log($('#clientCombo').val());
        //if(confirm("estas seguro") == 'Aceptar'){
        ;
        if (CONTACT.validacion() == true) {
            $.ajax({
                url: 'http://localhost:3000/contacts/' + id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    contact: {
                        client_id: $('#clientCombo').val(),
                        NAME: $('#name').val(),
                        LAST_NAME: $('#lastname').val(),
                        EMAIL: $('#email').val(),
                        PHONE: $('#phone').val(),
                        JOB: $('#job').val(),
                    }
                }),
                success: function(data) {
                    alert('Datos actualizados correctamente');
                    window.location.href = 'ContactTable.html';
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
    DeleteContact: function() {
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = parseInt(params.get("id"));
        console.log(id)
        $.ajax({
            url: 'http://localhost:3000/contacts/' + id,
            type: 'DELETE',

            success: function(data) {
                alert('Contacto eliminado correctamente');
                window.location.href = 'ContactTable.html';
            },
            error: function(request, msg, error) {
                alert('error');
            }
        })
    },
    // get usuarios
    /**trae todos los usuarios de la bd*/
    getContacts: function() {
        
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/contacts"
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
                row += "<td>" + element.client_id+ "</td>";
                row += "<td>" + element.NAME + "</td>";
                row += "<td>" + element.LAST_NAME + "</td>";
                row += "<td>" + element.EMAIL + "</td>";
                row += "<td>" + element.PHONE + "</td>";
                row += "<td>" + element.JOB + "</td>";
                row += "<td>" + "<a href = 'ContactEdit.html?id=" + element.id + "' id=" + element.id + " class='btn btn-info'>Edit</a>" + "</td>";
                //row += "<td>"+"<a name= 'id' id="+element.id+" onclick='USER.getUserEdit("+element.id+");' class='btn btn-info'>Edit</a>"+"</td>";
                row += "<td>" + "<a href = 'ContactShow.html?id=" + element.id + "' id=" + element.id + " class='btn btn-success'>Show</a>" + "</td>";
                row += "<tr/>";

                $("#contactTable").append(row);
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
    getContactById: function(id) {
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/contacts/' + id,
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                $("#clientCombo").val(data.client_id);
                $("#name").val(data.NAME);
                $("#lastname").val(data.LAST_NAME);
                $("#email").val(data.EMAIL);
                $("#phone").val(data.PHONE);
                $("#job").val(data.JOB);
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

    limpiar: function() {},
    // trae un usuario por id
    /**trae la info de un usaurio y carga su info en la vista*/
    getContactByIdLabels: function(id) {
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/contacts/' + id,
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                console.log(data.NAME);
                $("#id").text(data.id);
                $("#clientid").text(data.client_id);
                $("#nameContact").text(data.NAME);
                $("#lastname").text(data.LAST_NAME);
                $("#email").text(data.EMAIL);
                $("#phone").text(data.PHONE);
                $("#job").text(data.JOB);


            },
            error: function() {
                alert('error');
            }

        });
        
    },
}