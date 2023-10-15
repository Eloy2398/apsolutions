class Apidoc {
    constructor() {
        var src = null, token = null;

        function init() {
            if (!(window.tokenApi && window.tokenApi != '')) {
                console.log('Token not found');
                return;
            }

            if (!(window.srcApidoc && window.srcApidoc != '')) {
                console.log('Source not found');
                return;
            }

            token = window.tokenApi;
            src = window.srcApidoc;
        }

        this.search = function (numdoc, tipdoc, fnOk) {
            if (URL != null && token != null) {
                $.ajax({
                    url: window.path_request,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        type: 'apidoc',
                        src: src,
                        tipdoc: tipdoc,
                        numdoc: numdoc,
                        token: token
                    },
                    beforeSend: function () {
                        UtilNotification.loading('Consultando datos', 'Espere un momento...');
                    },
                    success: function (data) {
                        if (data && data.success) {
                            fnOk(data.data);
                        } else {
                            toastr.error(data.message ?? 'No se encontraron resultados');
                        }
                    },
                    error: function (res) {
                        toastr.error('Api error');
                    },
                    complete: function () {
                        swal.close();
                    }
                });
            } else {
                console.log('Invalid data');
            }
        }

        init();
    }
}