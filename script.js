const ui = {
    form:            document.querySelector("#form"),
    studentsName:    document.querySelector("#nameInput"),
    studentsGrade:   document.querySelector("#gradeInput"),
    addStudent:      document.querySelector("#addStudent"),
    message:         document.querySelector("#message"),
    ul:              document.querySelector("#ul"),
    tableBody:       document.querySelector("#tablebody"),
    btn:             document.querySelector("#btn")
};

let students = [];

ui.form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (ui.studentsName.value != "" && ui.studentsGrade.value != "") {
        students.push({name: ui.studentsName.value, grade: ui.studentsGrade.value});
        console.log(students);
        ui.ul.innerHTML = "";
        newTable();
        findAvg();
        findHigh();
        findLow();
    } else {
        ui.message.textContent = "Write something into both fields.";
        setTimeout(() => {
            ui.message.textContent = "";
        }, 2000);
    }
    ui.studentsName.value = "";
    ui.studentsGrade.value = "";
})

function newTable () {
    const tableRow = document.createElement("tr");
    const studentNametd = document.createElement("td");
    const studentsGradetd = document.createElement("td");

    studentNametd.textContent = students[students.length - 1].name;
    studentsGradetd.textContent = students[students.length - 1].grade;

    ui.tableBody.appendChild(tableRow);
    tableRow.appendChild(studentNametd);
    tableRow.appendChild(studentsGradetd);
};


// Below the function calculates the avg
function findAvg () {
    let sum = 0;
    for (let i = 0; i < students.length; i++) {
        let gradeNumber = Number(students[i].grade);
        sum += gradeNumber;
    }
    let avg = sum / students.length;
    report(`The average of all grades is: ${avg.toFixed(1)}`)
    console.log(avg);
}

// Below the function finds highest number
function findHigh () {
    let highestNum = -Infinity;
    for (let i = 0; i < students.length; i++) {
        let gradeNumber = Number(students[i].grade);
        if (highestNum < gradeNumber) {
            highestNum = gradeNumber;
        }
    }
    report(`The highest grade is: ${highestNum}`)
    console.log(highestNum);
}

// Below the function finds the lowest number
function findLow () {
    let lowestNum = Infinity;
    for (let i = 0; i < students.length; i++) {
        let gradeNumber = Number(students[i].grade);
        if (lowestNum > gradeNumber) {
            lowestNum = gradeNumber;
        }
    }
    report(`The lowest grade is: ${lowestNum}`)
    console.log(lowestNum);
};

// Report of the grades
function report (input) {
    let listItem = document.createElement("li")
    listItem.textContent = input;

    ui.ul.appendChild(listItem)
}

// Downloadable CSV of all students & grades
ui.btn.addEventListener("click", function () {
    if (students.length > 0) {
        downloadableCSV()
    } else {
        console.log("Type in a student name and grade")
    }
})

function downloadableCSV () {
    let CSV = `Name, Grade\n`
    students.forEach((student) => {
        CSV += student.name + ", " + student.grade + "\n"
    })
    let myBlob = new Blob([CSV], {type: "text/csv" })
    let myUrl = URL.createObjectURL(myBlob)
    const a = document.createElement("a")
    a.href = myUrl
    a.download = "grades.csv"
    a.click()
    console.log(CSV)
}
