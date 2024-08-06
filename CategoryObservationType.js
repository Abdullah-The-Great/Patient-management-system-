const ObservationType = require('./ObservationType');

class CategoryObservationType extends ObservationType {
    constructor(code, name, categories) {
        super(code, name);
        this.categories = categories;
    }

getCode() {
    return this.code;
}
getName() {
    return this.name;
}
getCategories() {
    return this.categories;
}
toString() {
    return `${super.toString()}, Categories: ${this.categories.join(', ')}`;
}
}
module.exports = CategoryObservationType;