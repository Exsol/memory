export default function s(s, t) {
    return s.classList ? s.classList.contains(t) : new RegExp(`(^| )${t}( |$)`, "gi").test(s.className)
}