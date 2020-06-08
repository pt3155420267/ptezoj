const { Route, Handler } = global.Hydro.service.server;
const { PERM_LOGGEDIN } = global.Hydro.permission;
const { pastebin } = global.Hydro.model;
const { nav } = global.Hydro.lib;

class PasteShowHandler extends Handler {
    async get({ docId }) {
        const doc = await pastebin.get(docId);
        const path = [
            ['Hydro', '/'],
            ['paste_show', null],
            [doc.title, null, true],
        ];
        this.response.body = { path, doc };
        this.response.template = 'paste_show.html';
    }
}

class PasteCreateHandler extends Handler {
    async prepare() {
        this.checkPerm(PERM_LOGGEDIN);
    }

    async get() {
        const path = [
            ['Hydro', '/'],
            ['paste_create', null],
        ];
        this.response.body = { path };
        this.response.template = 'paste_create.html';
    }

    async post({
        language, expire, password, title, content,
    }) {
        const docId = await pastebin.add({
            language, expire, password, owner: this.user._id, title, content,
        });
        this.response.body = { docId };
        this.response.redirect = `/paste/${docId}`;
    }
}

async function apply() {
    Route('/paste/create', module.exports.PasteCreateHandler);
    Route('/paste/:docId', module.exports.PasteShowHandler);
    nav('/paste/create', 'pastebin', 'pastebin', PERM_LOGGEDIN);
}

global.Hydro.handler.pastebin = module.exports = apply;
