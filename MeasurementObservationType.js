 const ObservationType = require('./ObservationType');

class MeasurementObservationType extends ObservationType {
    constructor(code, name, unit) {
        super(code, name);
        this.unit = unit;
    }
    getCode() {
        return this.code;
    }
    getName() {
    return this.name;
    }
    getUnit(){
        return this.unit
    } 
    toString() {
        return `${super.toString()}, Unit: ${this.unit}`;
    }
}

module.exports = MeasurementObservationType;