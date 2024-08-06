const Patient = require('./Patient');
const MeasurementObservationType = require('./MeasurementObservationType');
const CategoryObservationType = require('./CategoryObservationType');
const MeasurementObservation = require('./MeasurementObservation');
const CategoryObservation = require('./CategoryObservation');
const fs = require('fs');

class PatientRecordSystem {
    constructor() {
        this.patients = [];
        this.observationTypes = [];
    }

    addMeasurementObservationType(code, name, unit) {
        // Check if the observation type already exists
        if (this.observationTypes.some(observationType => observationType.getCode() === code)) {
            console.log(`Error: Observation type with code '${code}' already exists.`);
            return;
        }
        // If not, add the observation type
        this.observationTypes.push(new MeasurementObservationType(code, name, unit));
    }

    addCategoryObservationType(code, name, categories) {
        // Check if the observation type already exists
        if (this.observationTypes.some(observationType => observationType.getCode() === code)) {
            console.log(`Error: Observation type with code '${code}' already exists.`);
            return;
        }
        // If not, add the observation type
        this.observationTypes.push(new CategoryObservationType(code, name, categories));
    }

    addPatient(id, name) {
        // Check if the patient already exists
        if (this.patients.some(patient => patient.getId() === id)) {
            console.log(`Error: Patient with ID '${id}' already exists.`);
            return;
        }
        // If not, add the patient
        this.patients.push(new Patient(id, name));
    }

    addMeasurementObservation(patientId, observationTypeCode, value) {
        // Find the patient by ID
        const patient = this.findPatientById(patientId);
        if (!patient) {
            console.log(`Error: Patient with ID '${patientId}' not found.`);
            return;
        }
        // Find the measurement observation type by code
        const observationType = this.findMeasurementObservationTypeByCode(observationTypeCode);
        if (!observationType) {
            console.log(`Error: Measurement observation type with code '${observationTypeCode}' not found.`);
            return;
        }
        // Add the measurement observation to the patient
        patient.addObservation(new MeasurementObservation(observationType, value));
    }

    addCategoryObservation(patientId, observationTypeCode, category) {
        // Find the patient by ID
        const patient = this.findPatientById(patientId);
        if (!patient) {
            console.log(`Error: Patient with ID '${patientId}' not found.`);
            return;
        }
        // Find the category observation type by code
        const observationType = this.findCategoryObservationTypeByCode(observationTypeCode);
        if (!observationType) {
            console.log(`Error: Category observation type with code '${observationTypeCode}' not found.`);
            return;
        }
        // Add the category observation to the patient
        patient.addObservation(new CategoryObservation(observationType, category));
    }

    findPatientById(id) {
        return this.patients.find(patient => patient.getId() === id);
    }

    findMeasurementObservationTypeByCode(code) {
        return this.observationTypes.find(observationType => observationType instanceof MeasurementObservationType && observationType.getCode() === code);
    }

    findCategoryObservationTypeByCode(code) {
        return this.observationTypes.find(observationType => observationType instanceof CategoryObservationType && observationType.getCode() === code);
    }

    getPatientRecord(id) {
        const patient = this.findPatientById(id);
        if (!patient) {
            console.log(`Error: Patient with ID '${id}' not found.`);
            return null;
        }
        return patient;
    }
    printPatientRecord(id) {
        const patient = this.getPatientRecord(id);
        if (patient) {
            console.log(patient.toString()); 
        }
    }

    getObservationTypeDetails(code) {
        const observationType = this.observationTypes.find(
            obsType => obsType.getCode() === code
        );
        
        if (!observationType) {
            console.log(`Error: Observation type with code '${code}' not found.`);
            return null;
        }

        return observationType;
    }

    // Method to display details of an observation type
    printObservationTypeDetails(code) {
        const observationType = this.getObservationTypeDetails(code);
        if (observationType) {
            console.log(observationType.toString()); // Use the toString method to display details
        }
    }

    loadData() {
        this.loadObservationTypes('MeasurementObservationTypes.txt', 'CategoryObservationTypes.txt');
        this.loadPatients('Patients.txt');
        this.loadObservations('MeasurementObservations.txt', 'CategoryObservations.txt');
    }

    loadObservationTypes(measurementFileName, categoryFileName) {
        this.loadMeasurementObservationTypes(measurementFileName);
        this.loadCategoryObservationTypes(categoryFileName);
    }

    loadMeasurementObservationTypes(fileName) {
        const lines = this.readLinesFromFile(fileName);
        lines.forEach(line => {
            const [code, name, unit] = line.split(';');
            this.addMeasurementObservationType(code, name, unit);
        });
    }

    loadCategoryObservationTypes(fileName) {
        const lines = this.readLinesFromFile(fileName);
        lines.forEach(line => {
            const [code, name, ...categories] = line.split(';');
            this.addCategoryObservationType(code, name, categories);
        });
    }

    loadPatients(fileName) {
        const lines = this.readLinesFromFile(fileName);
        lines.forEach(line => {
            const [id, name] = line.split(';');
            this.addPatient(id, name);
        });
    }

    loadObservations(measurementFileName, categoryFileName) {
        this.loadMeasurementObservations(measurementFileName);
        this.loadCategoryObservations(categoryFileName);
    }

    loadMeasurementObservations(fileName) {
        const lines = this.readLinesFromFile(fileName);
        lines.forEach(line => {
            const [patientId, observationTypeCode, value] = line.split(';');
            this.addMeasurementObservation(patientId, observationTypeCode, parseFloat(value));
        });
    }

    loadCategoryObservations(fileName) {
        const lines = this.readLinesFromFile(fileName);
        lines.forEach(line => {
            const [patientId, observationTypeCode, category] = line.split(';');
            this.addCategoryObservation(patientId, observationTypeCode, category);
        });
    }

    readLinesFromFile(fileName) {
        const content = fs.readFileSync(fileName, 'utf8');
        return content.trim().split('\n');
    }

    saveData() {
        this.saveObservationTypes('MeasurementObservationTypes.txt', 'CategoryObservationTypes.txt');
        this.savePatients('Patients.txt');
        this.saveObservations('MeasurementObservations.txt', 'CategoryObservations.txt');
    }

    saveObservationTypes(measurementFileName, categoryFileName) {
        this.saveMeasurementObservationTypes(measurementFileName);
        this.saveCategoryObservationTypes(categoryFileName);
    }

    saveMeasurementObservationTypes(fileName) {
        const lines = this.observationTypes
            .filter(observationType => observationType instanceof MeasurementObservationType)
            .map(observationType => `${observationType.getCode()};${observationType.getName()};${observationType.getUnit()}`);
        this.writeLinesToFile(fileName, lines);
    }

    saveCategoryObservationTypes(fileName) {
        const lines = this.observationTypes
            .filter(observationType => observationType instanceof CategoryObservationType)
            .map(observationType => `${observationType.getCode()};${observationType.getName()};${observationType.getCategories().join(';')}`);
        this.writeLinesToFile(fileName, lines);
    }

    savePatients(fileName) {
        const lines = this.patients.map(patient => `${patient.getId()};${patient.getName()}`);
        this.writeLinesToFile(fileName, lines);
    }

    saveObservations(measurementFileName, categoryFileName) {
        this.saveMeasurementObservations(measurementFileName);
        this.saveCategoryObservations(categoryFileName);
    }

    saveMeasurementObservations(fileName) {
        const lines = this.patients.flatMap(patient =>
            patient.getObservations()
                .filter(observation => observation instanceof MeasurementObservation)
                .map(observation =>
                    `${patient.getId()};${observation.getType().getCode()};${observation.getValue()}`
                )
        );
        this.writeLinesToFile(fileName, lines);
    }

    saveCategoryObservations(fileName) {
        const lines = this.patients.flatMap(patient =>
            patient.getObservations()
                .filter(observation => observation instanceof CategoryObservation)
                .map(observation =>
                    `${patient.getId()};${observation.getType().getCode()};${observation.getCategory()}`
                )
        );
        this.writeLinesToFile(fileName, lines);
    }

    writeLinesToFile(fileName, lines) {
        const content = lines.join('\n');
        fs.writeFileSync(fileName, content, 'utf8');
    }

    toString() {
        let result = 'Observation Types:\n';
        this.observationTypes.forEach(observationType => {
            result += `${observationType.toString()}\n`;
        });

        result += '\nPatients:\n';
        this.patients.forEach(patient => {
            result += `${patient.toString()}\n`;
            patient.getObservations().forEach(observation => {
                result += `  - ${observation.toString()}\n`;
            });
        });

        return result;
    }
}

module.exports = PatientRecordSystem;
