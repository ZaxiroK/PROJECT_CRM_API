//localstorage
function idTrasladar() {
    var id = document.getElementById("id").value;
    localStorage.setItem('idTrasladar', JSON.stringify(id))

}

var USER = USER || {
    // login user

    login: function () {
        console.log($('#username').val());
        console.log($('#password').val());
        if (USER.verificacionLogin() == true){
        $.ajax({    
            url: 'http://localhost:3000/sessions',
            type: 'POST',
            contentType: 'application/json',
            
            data: JSON.stringify({ USER_NAME: $('#username').val(), PASSWORD: $('#password').val() }),
            
            success: function (data) {
                alert('Bienvenido');
                localStorage.setItem("token", data);
                window.location.replace("MenuPrincipal.html");
            },
            error: function () {
                
                alert('Credenciales Incorrectos');
                //window.location.replace("UserLogin.php");
            }
        });
    }
    },
    verificacionLogin:function(){
        var result = false;
        if($('#username').val() == "" || $('#password').val() == ""){
            alert('Digite todos los datos solicitados');

            return result;
        }else{
            result = true;
            return result;
        }
    },

    // CREAR USUARIO
    /**registra el usuario en la bd */
    RegisterUser: function() {
        if (USER.validacion() == true) {
            $.ajax({
                url: 'http://localhost:3000/users',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    user: {
                        USER_NAME: $('#username').val(),
                        NAME: $('#name').val(),
                        LAST_NAME: $('#lastname').val(),
                        PASSWORD: $('#password').val(),
                        PASSWORD_CONFIRMATION: $('#password_confirmation').val(),
                        admin: 'false'
                    }
                }),
                success: function(data) {
                    alert('Registro Exitoso');
                    window.location.href = 'UserRegister.html';
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
        if ($('#username').val() == "" || $('#name').val() == "" || $('#lastname').val() == "" ||
            $('#password').val() == "" || $('#password_confirmation').val() == "") {
            alert('Digite todos los datos solicitados');

            return result;
        } else if($('#password').val() != $('#password_confirmation').val()) {
            alert('Las contraseñas no coinciden');

            return result;
        }else{
            result = true;
            return result;
        }

    },
    // editar user
    /**edita el usaurio en la bd*/
    EditUser: function() {
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = parseInt(params.get("id"));
        console.log(id);
        //if(confirm("estas seguro") == 'Aceptar'){
        ;
        if (USER.validacion() == true) {
            if ($('#administrador').is(':checked')) {

                var administrador = true;
            } else {
                administrador = false;
            }
            $.ajax({
                url: 'http://localhost:3000/users/' + id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    user: {
                        USER_NAME: $('#username').val(),
                        NAME: $('#name').val(),
                        LAST_NAME: $('#lastname').val(),
                        PASSWORD: $('#password').val(),
                        PASSWORD_CONFIRMATION: $('#password_confirmation').val(),
                        admin: administrador
                    }
                }),
                success: function(data) {
                    alert('Datos actualizados correctamente');
                    window.location.href = 'UserTable.html';
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
    DeleteUser: function() {
        let params = new URLSearchParams(document.location.search.substring(1));
        let id = parseInt(params.get("id"));
        console.log(id)
        $.ajax({
            url: 'http://localhost:3000/users/' + id,
            type: 'DELETE',

            success: function(data) {
                alert('Usuario eliminado correctamente');
                window.location.href = 'UserTable.html';
            },
            error: function(request, msg, error) {
                alert('error');
            }
        })
    },
    // get usuarios
    /**trae todos los usuarios de la bd*/
    getUsers: function() {
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/users"
        }).done(function(response) {

            response.forEach(function(element) {
                console.log(element);
                var row = "<tr>";
                row += "<td>" + element.NAME + "</td>";
                row += "<td>" + element.LAST_NAME + "</td>";
                row += "<td>" + element.USER_NAME + "</td>";
                row += "<td>" + element.admin + "</td>";
                row += "<td>" + "<a href = 'UserEdit.html?id=" + element.id + "' id=" + element.id + " class='btn btn-info'>Edit</a>" + "</td>";
                //row += "<td>"+"<a name= 'id' id="+element.id+" onclick='USER.getUserEdit("+element.id+");' class='btn btn-info'>Edit</a>"+"</td>";
                row += "<td>" + "<a href = 'UserShow.html?id=" + element.id + "' id=" + element.id + " class='btn btn-success'>Show</a>" + "</td>";
                row += "<tr/>";

                $("#userTable").append(row);
            });

        }).fail(function(error) {

            alert('error');
        });
    },
    // crea una tabla
    /**con la info de todos los usario de la bad crea una tabla */
    renderUserTable: function(listOfUsers) {
        listOfUsers.forEach(function(element) {

            var row = "<tr>";
            row += "<td>" + element.NAME + "</td>";
            row += "<td>" + element.LAST_NAME + "</td>";
            row += "<td>" + element.USER_NAME + "</td>";
            row += "<td>" + element.admin + "</td>";
            row += "<tr/>";
            $("#UserTable").append(row);
        });
    },



    // trae un usuario por id
    /**trae la info de un usaurio y carga su info en la vista*/
    getUserById: function(id) {
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/users/' + id,
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                $("#username").val(data.USER_NAME);
                $("#name").val(data.NAME);
                $("#lastname").val(data.LAST_NAME);
                console.log(data.admin);
                if (data.admin == true) {
                    $('#administrador').prop("checked", true);

                }


            },
            error: function() {
                alert('error');
            }

        });
    },

    limpiar: function() {},
    // trae un usuario por id
    /**trae la info de un usaurio y carga su info en la vista*/
    getUserByIdLabels: function(id) {
        console.log(id);
        $.ajax({
            url: 'http://localhost:3000/users/' + id,
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                console.log(data.NAME);
                $("#id").text(data.id);
                $("#username").text(data.USER_NAME);
                $("#realname").text(data.NAME);
                $("#lastname").text(data.LAST_NAME);
                console.log(data.admin);
                if (data.admin == true) {
                    $('#administrador').prop("checked", true);

                }


            },
            error: function() {
                alert('error');
            }

        });
    },
}