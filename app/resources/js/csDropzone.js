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
        if (filename != null && filename != "") {
            let fullUrl = Ajxur.Ws.getEndpoint() + 'download/' + this._currentPath + '/' + filename;
            this.convertPathToFile(fullUrl, filename).then(file => this._oDropzone.addFile(file));
        }
    }

    async convertPathToFile(path, filename) {
        const response = await fetch(path);
        const blob = await response.blob();
        return new File([blob], filename, { type: "image/*" });
    }

    getFile() {
        if (this._oDropzone.files.length == 0 || !this._oDropzone.files[0].accepted) {
            return "";
        }

        return this._oDropzone.files[0];
    }

    clearFile() {
        this._oDropzone.removeAllFiles(true);
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