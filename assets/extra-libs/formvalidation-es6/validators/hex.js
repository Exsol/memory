export default function e() {
    return {
        validate(e) {
            return {valid: e.value === "" || /^[0-9a-fA-F]+$/.test(e.value)}
        }
    }
}