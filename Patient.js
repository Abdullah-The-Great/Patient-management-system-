class Patient {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.observations = [];
    }

    addObservation(observation) {
        this.observations.push(observation);
    }

    getObservations() {
        return this.observations;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    toString() {
        return `Patient ID: ${this.id}, Name: ${this.name}`;
    }

}


module.exports = Patient;