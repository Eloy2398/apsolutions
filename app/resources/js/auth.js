$(function () {

    window.oWs = new ws();

    function login() {
        let inputUsername = document.getElementById('txtusername');
        let inputPassword = document.getElementById('txtpassword');

        if (inputUsername.value == '') {
            inputUsername.focus();
            return;
        }

        if (inputPassword.value == '') {
            inputPassword.focus();
            return;
        }

        $.ajax({
            type: "post",
            url: oWs.getEndpoint() + "auth/login",
            contentType: 'application/json',
            data: JSON.stringify({
                username: inputUsername.value,
                password: inputPassword.value,
            }),
            dataType: "json",
            beforeSend: function () {
                document.getElementById('btnsubmit').disabled = true;
                document.getElementById('btnsubmit').nextElementSibling.style.display = 'block';
            },
            success: function (response) {
                if (response.status) {
                    UtilNotification.alert($('div#contenedor'), {
                        tipo: "s",
                        titulo: response.message,
                        mensaje: "Sesión inicializada correctamente"
                    });

                    init(response.data.token);
                } else {
                    UtilNotification.alert($('div#contenedor'), {
                        tipo: "d",
                        mensaje: response.message
                    });
                }

                document.getElementById('btnsubmit').disabled = false;
                document.getElementById('btnsubmit').nextElementSibling.style.display = 'none';
            }
        });
    }

    function init(token) {
        $.post('../controller/index.php', {
            action: 'init',
            token: token
        }, function (response) {
            if (response.success) {
                oWs.setToken(token);
                window.location.href = response.data.substr(3);
            }
        }, 'json');
    }

    document.getElementById('formAuthentication').addEventListener('submit', function (e) {
        e.preventDefault();
        login();
    });

    document.getElementById('txtusername').addEventListener('keydown', function (ev) {
        if (ev.keyCode == 13) {
            document.getElementById('txtpassword').focus();
            ev.preventDefault();
        }
    });

});