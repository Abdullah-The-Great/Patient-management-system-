const CategoryObservationType = require('./CategoryObservationType');

class CategoryObservation {
    constructor(type, category) {
        if (!(type instanceof CategoryObservationType)) {
            throw new Error('Invalid observation type for CategoryObservation.');
        }
        this.type = type;
        this.category = category;
    }

getType(){
    return this.type
}
getCategory(){
    return this.category
}    
toString() {
    return `Category - ${this.type.toString()}, Category: ${this.category}`;
}
}

module.exports = CategoryObservation;