function s(s, a) {
    a.split(" ").forEach((a => {
        if (s.classList) {
            s.classList.add(a)
        } else if (` ${s.className} `.indexOf(` ${a} `)) {
            s.className += ` ${a}`
        }
    }))
}

function a(s, a) {
    a.split(" ").forEach((a => {
        s.classList ? s.classList.remove(a) : s.className = s.className.replace(a, "")
    }))
}

export default function c(c, e) {
    const t = [];
    const f = [];
    Object.keys(e).forEach((s => {
        if (s) {
            e[s] ? t.push(s) : f.push(s)
        }
    }));
    f.forEach((s => a(c, s)));
    t.forEach((a => s(c, a)))
}