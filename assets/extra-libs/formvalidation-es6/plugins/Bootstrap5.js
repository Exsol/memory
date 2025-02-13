import e from "../utils/classSet";
import t from "../utils/hasClass";
import n from "./Framework";

export default class l extends n {
    constructor(e) {
        super(Object.assign({}, {
            eleInvalidClass: "is-invalid",
            eleValidClass: "is-valid",
            formClass: "fv-plugins-bootstrap5",
            rowInvalidClass: "fv-plugins-bootstrap5-row-invalid",
            rowPattern: /^(.*)(col|offset)(-(sm|md|lg|xl))*-[0-9]+(.*)$/,
            rowSelector: ".row",
            rowValidClass: "fv-plugins-bootstrap5-row-valid"
        }, e));
        this.eleValidatedHandler = this.handleElementValidated.bind(this)
    }

    install() {
        super.install();
        this.core.on("core.element.validated", this.eleValidatedHandler)
    }

    uninstall() {
        super.install();
        this.core.off("core.element.validated", this.eleValidatedHandler)
    }

    handleElementValidated(n) {
        const l = n.element.getAttribute("type");
        if (("checkbox" === l || "radio" === l) && n.elements.length > 1 && t(n.element, "form-check-input")) {
            const l = n.element.parentElement;
            if (t(l, "form-check") && t(l, "form-check-inline")) {
                e(l, {"is-invalid": !n.valid, "is-valid": n.valid})
            }
        }
    }

    onIconPlaced(n) {
        e(n.element, {"fv-plugins-icon-input": true});
        const l = n.element.parentElement;
        if (t(l, "input-group")) {
            l.parentElement.insertBefore(n.iconElement, l.nextSibling);
            if (n.element.nextElementSibling && t(n.element.nextElementSibling, "input-group-text")) {
                e(n.iconElement, {"fv-plugins-icon-input-group": true})
            }
        }
        const i = n.element.getAttribute("type");
        if ("checkbox" === i || "radio" === i) {
            const i = l.parentElement;
            if (t(l, "form-check")) {
                e(n.iconElement, {"fv-plugins-icon-check": true});
                l.parentElement.insertBefore(n.iconElement, l.nextSibling)
            } else if (t(l.parentElement, "form-check")) {
                e(n.iconElement, {"fv-plugins-icon-check": true});
                i.parentElement.insertBefore(n.iconElement, i.nextSibling)
            }
        }
    }

    onMessagePlaced(n) {
        n.messageElement.classList.add("invalid-feedback");
        const l = n.element.parentElement;
        if (t(l, "input-group")) {
            l.appendChild(n.messageElement);
            e(l, {"has-validation": true});
            return
        }
        const i = n.element.getAttribute("type");
        if (("checkbox" === i || "radio" === i) && t(n.element, "form-check-input") && t(l, "form-check") && !t(l, "form-check-inline")) {
            n.elements[n.elements.length - 1].parentElement.appendChild(n.messageElement)
        }
    }
}