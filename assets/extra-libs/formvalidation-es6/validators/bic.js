export default function a() {
    return {
        validate(a) {
            return {valid: a.value === "" || /^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/.test(a.value)}
        }
    }
}