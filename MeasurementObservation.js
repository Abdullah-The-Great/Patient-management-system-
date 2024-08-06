const MeasurementObservationType = require('./MeasurementObservationType');

class MeasurementObservation {
    constructor(type, value) {
        if (!(type instanceof MeasurementObservationType)) {
            throw new Error('Invalid observation type for MeasurementObservation.');
        }
        this.type = type;
        this.value = value;
    }
    getType() {
        return this.type;
    }
    getValue() {
        return this.value;
    }
toString() {
    return `Measurement - ${this.type.toString()}, Value: ${this.value}`;
}
}


module.exports = MeasurementObservation;