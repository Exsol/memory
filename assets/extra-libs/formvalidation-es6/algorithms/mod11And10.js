export default function t(t) {
    const e = t.length;
    let n = 5;
    for (let r = 0; r < e; r++) {
        n = ((n || 10) * 2 % 11 + parseInt(t.charAt(r), 10)) % 10
    }
    return n === 1
}