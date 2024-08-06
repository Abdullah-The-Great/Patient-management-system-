class ObservationType {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
    toString() {
        return `Code: ${this.code}, Name: ${this.name}`;
    }
}



module.exports = ObservationType;