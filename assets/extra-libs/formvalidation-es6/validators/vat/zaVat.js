export default function t(t) {
    let e = t;
    if (/^ZA4[0-9]{9}$/.test(e)) {
        e = e.substr(2)
    }
    return {meta: {}, valid: /^4[0-9]{9}$/.test(e)}
}