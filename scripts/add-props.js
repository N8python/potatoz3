export default function addProps(target, data) {
    for (const key of Object.keys(data)) {
        if (!target[key]) {
            target[key] = data[key];
        } else if (typeof target[key] === "function") {
            if (!(target[key].toString() === data[key].toString())) {
                target[key] = data[key];
            }
        }
        if (typeof data[key] === "object") {
            addProps(target[key], data[key]);
        }
    }
}