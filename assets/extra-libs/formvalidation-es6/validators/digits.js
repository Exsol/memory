export default function e() {
    return {
        validate(e) {
            return {valid: e.value === "" || /^\d+$/.test(e.value)}
        }
    }
}