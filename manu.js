const PatientRecordSystem = require('./PatientRecordSystem');
const MeasurementObservationType = require('./MeasurementObservationType');
const CategoryObservationType = require('./CategoryObservationType');
const MeasurementObservation = require('./MeasurementObservation');
const CategoryObservation = require('./CategoryObservation');
const fs = require('fs');
const readline = require('readline');

const patientRecordSystem = new PatientRecordSystem();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function displayMenu() {
    console.log("===================== Patient Record System =====================");
    console.log("1. Add a measurement observation type");
    console.log("2. Add a category observation type");
    console.log("3. Add a patient");
    console.log("4. Add a measurement observation");
    console.log("5. Add a category observation");
    console.log("6. Display details of an observation type");
    console.log("7. Display a patient record by the patient id");
    console.log("8. Save data");
    console.log("9. Load data");
    console.log("D. Display all data for inspection");
    console.log("X. Exit");
    rl.question("Please enter an option (1-9 or D or X): ", handleMenuOption);
}

function handleMenuOption(option) {
    option = option.toUpperCase(); // Normalize the option to uppercase

    if (option === "1") {
        addMeasurementObservationType();
    } else if (option === "2") {
        addCategoryObservationType();
    } else if (option === "3") {
        addPatient();
    } else if (option === "4") {
        addMeasurementObservation();
    } else if (option === "5") {
        addCategoryObservation();
    } else if (option === "6") {
        displayObservationTypeDetails();
    } else if (option === "7") {
        displayPatientRecord();
    } else if (option === "8") {
        saveData();
    } else if (option === "9") {
        loadData();
    } else if (option === "D") {
        displayAllData();
    } else if (option === "X") {
        console.log("Exiting... see you later, take care, bye! :)");
        rl.close();
        process.exit(0);
    } else {
        console.log("Invalid option. Please try again.");
        displayMenu();
    }
}

function displayAllData() {
    console.log(patientRecordSystem.toString());
    displayMenu();
}

function addMeasurementObservationType() {
    rl.question("Enter observation type code: ", code => {
        rl.question("Enter observation type name: ", name => {
            rl.question("Enter observation type unit: ", unit => {
                patientRecordSystem.addMeasurementObservationType(code.toUpperCase(), name, unit);
                console.log("Measurement observation type added successfully.");
                displayMenu();
            });
        });
    });
}

function addCategoryObservationType() {
    rl.question("Enter observation type code: ", code => {
        rl.question("Enter observation type name: ", name => {
            rl.question("Enter the number of categories: ", numCategories => {
                let categories = [];
                let count = 0;
                const askCategory = () => {
                    rl.question(`Enter category ${++count}: `, category => {
                        categories.push(category);
                        if (count < numCategories) {
                            askCategory();
                        } else {
                            patientRecordSystem.addCategoryObservationType(code.toUpperCase(), name, categories);
                            console.log("Category observation type added successfully.");
                            displayMenu();
                        }
                    });
                };
                askCategory();
            });
        });
    });
}

function addPatient() {
    rl.question("Enter patient ID: ", id => {
        rl.question("Enter patient name: ", name => {
            patientRecordSystem.addPatient(id.toUpperCase(), name);
            console.log("Patient added successfully.");
            displayMenu();
        });
    });
}

function addMeasurementObservation() {
    rl.question("Enter patient ID: ", patientId => {
        rl.question("Enter observation type code: ", observationTypeCode => {
            rl.question("Enter observation value: ", value => {
                patientRecordSystem.addMeasurementObservation(patientId.toUpperCase(), observationTypeCode.toUpperCase(), parseFloat(value));
                console.log("Measurement observation added successfully.");
                displayMenu();
            });
        });
    });
}

function addCategoryObservation() {
    rl.question("Enter patient ID: ", patientId => {
        rl.question("Enter observation type code: ", observationTypeCode => {
            rl.question("Enter observation category: ", category => {
                patientRecordSystem.addCategoryObservation(patientId.toUpperCase(), observationTypeCode.toUpperCase(), category);
                console.log("Category observation added successfully.");
                displayMenu();
            });
        });
    });
}

function displayObservationTypeDetails() {
    rl.question("Enter observation type code: ", code => {
        console.log(patientRecordSystem.getObservationTypeDetails(code.toUpperCase()));
        displayMenu();
    });
}

function displayPatientRecord() {
    rl.question("Enter patient ID: ", id => {
        console.log(patientRecordSystem.getPatientRecord(id.toUpperCase()));
        displayMenu();
    });
}

function saveData() {
    patientRecordSystem.saveData();
    console.log("Data saved successfully.");
    displayMenu();
}

function loadData() {
    patientRecordSystem.loadData();
    console.log("Data loaded successfully.");
    displayMenu();
}

displayMenu();
