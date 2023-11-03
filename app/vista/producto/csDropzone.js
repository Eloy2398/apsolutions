class csDropzone {
    constructor(selectorTemplate, selectorPreviews, selectorClickable) {
        this._selectorTemplate = selectorTemplate;
        this._selectorPreviews = selectorPreviews;
        this._selectorClickable = selectorClickable;
        this._currentPath = location.pathname.split('/').reverse()[1];

        this.init();
    }

    init() {
        var previewNode = document.querySelector(this._selectorTemplate);
        previewNode.id = "";
        var previewTemplate = previewNode.parentNode.innerHTML;
        previewNode.parentNode.removeChild(previewNode);

        var objOptions = {
            url: "/",
            thumbnailWidth: 80,
            thumbnailHeight: 80,
            maxFiles: 1,
            acceptedFiles: "image/*",
            previewTemplate: previewTemplate,
            previewsContainer: this._selectorPreviews,
        }

        objOptions.autoQueue = false;
        objOptions.clickable = this._selectorClickable;

        this._oDropzone = new Dropzone(document.body, objOptions);
    }

    setFile(filename) {
        if (filename != "") {
            let fullUrl = Ajxur.Ws.getEndpoint() + 'download/' + this._currentPath + '/' + filename;

            let mockFile = {
                name: filename,
                size: 12345,
                dataURL: fullUrl,
                type: 'image/' + filename.split('.').reverse()[0],
                status: Dropzone.ADDED,
                accepted: true,
            };

            this._oDropzone.files.push(mockFile);
            // this._oDropzone.emit("addedfile", mockFile);
            // this._oDropzone.emit("thumbnail", mockFile, fullUrl);
            // this._oDropzone.emit("complete", mockFile);
            this._oDropzone.displayExistingFile(mockFile, fullUrl, null, null, false);
            $(this._selectorPreviews).find('img').addClass('w-px-100');
        }
    }

    getFile() {
        if (this._oDropzone.files.length == 0 || !this._oDropzone.files[0].accepted) {
            return "";
        }

        return this._oDropzone.files[0];
    }

    clearFile() {
        this._oDropzone.removeAllFiles(true);
        // $(this._selectorPreviews).html('');
    }

    getFileBase64Enviar(fnOk) {
        if (this.getFile() != "") {
            this.generateBase64FomFile(this.getFile(), fnOk);
        } else {
            fnOk();
        }
    }

    generateBase64FomFile(img, callback) {
        let oFileReader = new FileReader();

        oFileReader.onload = function (ev) {
            callback(oFileReader.result.split(',')[1]);
        }

        oFileReader.readAsDataURL(img);
    }
}