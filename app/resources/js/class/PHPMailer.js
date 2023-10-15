class PHPMailer {
    constructor($nModel) {
        var nModel = $nModel,
            messageTmp = null;

        this.setMessage = function (message) {
            messageTmp = message;
        }

        this.send = function (id, to, subject, message, fnOk) {
            $.ajax({
                url: window.path_request,
                type: 'POST',
                dataType: 'json',
                data: {
                    type: 'email',
                    nModel: nModel,
                    id: id,
                    to: to,
                    subject: subject,
                    message: messageTmp ?? message
                },
                beforeSend: function () {
                    UtilNotification.loading('Enviando correo', 'Espere un momento...');
                },
                success: function (data) {
                    if (data && data.success) {
                        fnOk(data);
                    } else {
                        toastr.error(data.message ?? 'Send error');
                    }
                },
                error: function (res) {
                    toastr.error('Server error');
                },
                complete: function () {
                    swal.close();
                }
            });
        }
    }
}