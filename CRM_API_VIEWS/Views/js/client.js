//localstorage
/*function idTrasladar() {
    var id = document.getElementById("id").value;
    localStorage.setItem('idTrasladar', JSON.stringify(id))

}*/

var CLIENT = CLIENT || {
    // CREAR Client
    /**registra el Client en la bd */
    RegisterClient: function() {
        
        if (CLIENT.validacion() == true) {
            $.ajax({
                url: 'http://localhost:3000/clients',
                type: 'POST',
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
                }),
                success: function(data) {
                    alert('Registro Exitoso');
                    window.location.href = 'ClientRegister.html';
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
        
        if ($('#name').val() == "" || $('#identitycard').val() == "" || $('#webpage').val() == "" ||
            $('#address').val() == "" || $('#phone').val() == "") {
            alert('Digite todos los datos solicitados');

            return result;
        } else {
            result = true;
            return result;
        }
    },
    // editar user
    /**edita el usaurio en la bd*/
    EditClient: function() {
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = parseInt(params.get("id"));
        console.log(id);
        //if(confirm("estas seguro") == 'Aceptar'){
        ;
        if (CLIENT.validacion() == true) {
            $.ajax({
                url: 'http://localhost:3000/clients/' + id,
                type: 'PUT',
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
                }),
                success: function(data) {
                    alert('Datos actualizados correctamente');
                    window.location.href = 'ClientTable.html';
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
    DeleteClient: function() {
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = parseInt(params.get("id"));
        console.log(id)
        $.ajax({
            url: 'http://localhost:3000/clients/' + id,
            type: 'DELETE',

            success: function(data) {
                alert('Cliente eliminado correctamente');
                window.location.href = 'ClientTable.html';
            },
            error: function(request, msg, error) {
                alert('error');
            }
        })
    },
    // get usuarios
    /**trae todos los usuarios de la bd*/
    getClients: function() {
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/clients"
        }).done(function(response) {

            response.forEach(function(element) {
                console.log(element);
                var row = "<tr>";
                row += "<td>" + element.NAME + "</td>";
                row += "<td>" + element.IDENTITY_CARD + "</td>";
                row += "<td>" + element.WEB_PAGE + "</td>";
                row += "<td>" + element.ADDRESS + "</td>";
                row += "<td>" + element.PHONE + "</td>";
                row += "<td>" + element.SECTOR + "</td>";
                row += "<td>" + "<a href = 'ClientEdit.html?id=" + element.id + "' id=" + element.id + " class='btn btn-info'>Edit</a>" + "</td>";
                //row += "<td>"+"<a name= 'id' id="+element.id+" onclick='USER.getUserEdit("+element.id+");' class='btn btn-info'>Edit</a>"+"</td>";
                row += "<td>" + "<a href = 'ClientShow.html?id=" + element.id + "' id=" + element.id + " class='btn btn-success'>Show</a>" + "</td>";
                row += "<tr/>";

                $("#clientTable").append(row);
            });

        }).fail(function(error) {

            alert('error');
        });
    },
    // crea una tabla
    /**con la info de todos los usario de la bad crea una tabla */
    renderClientTable: function(listOfClients) {
        listOfClients.forEach(function(element) {

            var row = "<tr>";
            row += "<td>" + element.NAME + "</td>";
            row += "<td>" + element.IDENTITY_CARD + "</td>";
            row += "<td>" + element.WEB_PAGE + "</td>";
            row += "<td>" + element.ADDRESS + "</td>";
            row += "<td>" + element.PHONE + "</td>";
            row += "<td>" + element.SECTOR + "</td>";
            row += "<tr/>";
            $("#ClientTable").append(row);
        });
    },



    // trae un usuario por id
    /**trae la info de un usaurio y carga su info en la vista*/
    getClientById: function(id) {
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/clients/' + id,
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                $("#name").val(data.NAME);
                $("#identitycard").val(data.IDENTITY_CARD);
                $("#webpage").val(data.WEB_PAGE);
                $("#address").val(data.ADDRESS);
                $("#phone").val(data.PHONE);
                $("#sector").val(data.SECTOR);
                
            },
            error: function() {
                alert('error');
            }

        });
    },

    limpiar: function() {},
    // trae un usuario por id
    /**trae la info de un usaurio y carga su info en la vista*/
    getClientByIdLabels: function(id) {
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/clients/' + id,
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                console.log(data.NAME);
                $("#id").text(data.id);
                $("#nombre").text(data.NAME);
                $("#identitycard").text(data.IDENTITY_CARD);
                $("#webpage").text(data.WEB_PAGE);
                $("#address").text(data.ADDRESS);
                $("#phone").text(data.PHONE);
                $("#sector").text(data.SECTOR);


            },
            error: function() {
                alert('error');
            }

        });
    },
    

    
}