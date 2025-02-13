import e from "../core/Plugin";
import t from "../utils/classSet";
import s from "../utils/closest";
import i from "./Message";

export default class l extends e {
    constructor(e) {
        super(e);
        this.results = new Map;
        this.containers = new Map;
        this.opts = Object.assign({}, {
            defaultMessageContainer: true,
            eleInvalidClass: "",
            eleValidClass: "",
            rowClasses: "",
            rowValidatingClass: ""
        }, e);
        this.elementIgnoredHandler = this.onElementIgnored.bind(this);
        this.elementValidatingHandler = this.onElementValidating.bind(this);
        this.elementValidatedHandler = this.onElementValidated.bind(this);
        this.elementNotValidatedHandler = this.onElementNotValidated.bind(this);
        this.iconPlacedHandler = this.onIconPlaced.bind(this);
        this.fieldAddedHandler = this.onFieldAdded.bind(this);
        this.fieldRemovedHandler = this.onFieldRemoved.bind(this);
        this.messagePlacedHandler = this.onMessagePlaced.bind(this)
    }

    install() {
        t(this.core.getFormElement(), {[this.opts.formClass]: true, "fv-plugins-framework": true});
        this.core.on("core.element.ignored", this.elementIgnoredHandler).on("core.element.validating", this.elementValidatingHandler).on("core.element.validated", this.elementValidatedHandler).on("core.element.notvalidated", this.elementNotValidatedHandler).on("plugins.icon.placed", this.iconPlacedHandler).on("core.field.added", this.fieldAddedHandler).on("core.field.removed", this.fieldRemovedHandler);
        if (this.opts.defaultMessageContainer) {
            this.core.registerPlugin("___frameworkMessage", new i({
                clazz: this.opts.messageClass, container: (e, t) => {
                    const l = "string" === typeof this.opts.rowSelector ? this.opts.rowSelector : this.opts.rowSelector(e, t);
                    const a = s(t, l);
                    return i.getClosestContainer(t, a, this.opts.rowPattern)
                }
            }));
            this.core.on("plugins.message.placed", this.messagePlacedHandler)
        }
    }

    uninstall() {
        this.results.clear();
        this.containers.clear();
        t(this.core.getFormElement(), {[this.opts.formClass]: false, "fv-plugins-framework": false});
        this.core.off("core.element.ignored", this.elementIgnoredHandler).off("core.element.validating", this.elementValidatingHandler).off("core.element.validated", this.elementValidatedHandler).off("core.element.notvalidated", this.elementNotValidatedHandler).off("plugins.icon.placed", this.iconPlacedHandler).off("core.field.added", this.fieldAddedHandler).off("core.field.removed", this.fieldRemovedHandler);
        if (this.opts.defaultMessageContainer) {
            this.core.off("plugins.message.placed", this.messagePlacedHandler)
        }
    }

    onIconPlaced(e) {
    }

    onMessagePlaced(e) {
    }

    onFieldAdded(e) {
        const s = e.elements;
        if (s) {
            s.forEach((e => {
                const s = this.containers.get(e);
                if (s) {
                    t(s, {
                        [this.opts.rowInvalidClass]: false,
                        [this.opts.rowValidatingClass]: false,
                        [this.opts.rowValidClass]: false,
                        "fv-plugins-icon-container": false
                    });
                    this.containers.delete(e)
                }
            }));
            this.prepareFieldContainer(e.field, s)
        }
    }

    onFieldRemoved(e) {
        e.elements.forEach((e => {
            const s = this.containers.get(e);
            if (s) {
                t(s, {
                    [this.opts.rowInvalidClass]: false,
                    [this.opts.rowValidatingClass]: false,
                    [this.opts.rowValidClass]: false
                })
            }
        }))
    }

    prepareFieldContainer(e, t) {
        if (t.length) {
            const s = t[0].getAttribute("type");
            if ("radio" === s || "checkbox" === s) {
                this.prepareElementContainer(e, t[0])
            } else {
                t.forEach((t => this.prepareElementContainer(e, t)))
            }
        }
    }

    prepareElementContainer(e, i) {
        const l = "string" === typeof this.opts.rowSelector ? this.opts.rowSelector : this.opts.rowSelector(e, i);
        const a = s(i, l);
        if (a !== i) {
            t(a, {[this.opts.rowClasses]: true, "fv-plugins-icon-container": true});
            this.containers.set(i, a)
        }
    }

    onElementValidating(e) {
        const s = e.elements;
        const i = e.element.getAttribute("type");
        const l = "radio" === i || "checkbox" === i ? s[0] : e.element;
        const a = this.containers.get(l);
        if (a) {
            t(a, {
                [this.opts.rowInvalidClass]: false,
                [this.opts.rowValidatingClass]: true,
                [this.opts.rowValidClass]: false
            })
        }
    }

    onElementNotValidated(e) {
        this.removeClasses(e.element, e.elements)
    }

    onElementIgnored(e) {
        this.removeClasses(e.element, e.elements)
    }

    removeClasses(e, s) {
        const i = e.getAttribute("type");
        const l = "radio" === i || "checkbox" === i ? s[0] : e;
        s.forEach((e => {
            t(e, {[this.opts.eleValidClass]: false, [this.opts.eleInvalidClass]: false})
        }));
        const a = this.containers.get(l);
        if (a) {
            t(a, {
                [this.opts.rowInvalidClass]: false,
                [this.opts.rowValidatingClass]: false,
                [this.opts.rowValidClass]: false
            })
        }
    }

    onElementValidated(e) {
        const s = e.elements;
        const i = e.element.getAttribute("type");
        const l = "radio" === i || "checkbox" === i ? s[0] : e.element;
        s.forEach((s => {
            t(s, {[this.opts.eleValidClass]: e.valid, [this.opts.eleInvalidClass]: !e.valid})
        }));
        const a = this.containers.get(l);
        if (a) {
            if (!e.valid) {
                this.results.set(l, false);
                t(a, {
                    [this.opts.rowInvalidClass]: true,
                    [this.opts.rowValidatingClass]: false,
                    [this.opts.rowValidClass]: false
                })
            } else {
                this.results.delete(l);
                let e = true;
                this.containers.forEach(((t, s) => {
                    if (t === a && this.results.get(s) === false) {
                        e = false
                    }
                }));
                if (e) {
                    t(a, {
                        [this.opts.rowInvalidClass]: false,
                        [this.opts.rowValidatingClass]: false,
                        [this.opts.rowValidClass]: true
                    })
                }
            }
        }
    }
}