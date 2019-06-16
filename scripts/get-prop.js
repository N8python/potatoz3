function getProp(obj, str) {
    const [propName, rest] = str.split(".");
    if (rest) {
        return getProp(obj[propName], rest);
    }
    return obj[propName];
}
export default getProp;