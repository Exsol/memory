export default function t(t) {
    let e = t;
    if (/^IS[0-9]{5,6}$/.test(e)) {
        e = e.substr(2)
    }
    return {meta: {}, valid: /^[0-9]{5,6}$/.test(e)}
}