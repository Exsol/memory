export default function t(t) {
    const e = t.replace(/\./g, "");
    return {meta: {}, valid: /^\d{7,8}$/.test(e)}
}