export default new Proxy(localStorage, {
    get(_, prop) {
        return localStorage[prop] ? JSON.parse(localStorage[prop]) : undefined;
    },
    set(_, prop, val) {
        localStorage[prop] = JSON.stringify(val);
        return true;
    },
    deleteProperty(_, prop) {
        delete localStorage[prop];
    }
});