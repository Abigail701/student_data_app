// ASSIGNMENT

let thead = document.querySelector(".thead");
let addStudentBtn = document.querySelector(".addStudentBtn");
let form = document.querySelector(".form");
let formContainer = document.querySelector(".wrapper");
let id = 0;
let closeIcon = document.querySelector(".close-icon");
let submitBtn = document.querySelector(".submit");
let tBody = document.querySelector(".tbody");
let input = document.querySelector(".input");
let searchBtn = document.querySelector(".search-table");
let deleteIcon = document.querySelector(".dltIcon");
let editIcon = document.querySelector(".editIcon");
let select = document.querySelector(".select");




let isStudentDetailsAvailable = localStorage.getItem("studentDetails");
let studentDetails =  isStudentDetailsAvailable ? JSON.parse(isStudentDetailsAvailable):[];
console.log(isStudentDetailsAvailable);



//  let studentDetails = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let studentName = e.target[0].value;
    let rollNo = e.target[1].value
    let math = parseInt(e.target[2].value);
    let english = parseInt(e.target[3].value);
    let science = parseInt(e.target[4].value);
    let Biology = parseInt(e.target[5].value);
    
    console.log(rollNo);
    
    let SubjectNumber = 4;
    let totalObtainableMarks = SubjectNumber * 100;
    let Total = math + english + science + Biology;
    let percentage = (Total / totalObtainableMarks) * 100;
    
    
    let studentDetail = {
        id: "student"+ Math.random() *1000,
        studentName,
        rollNo,
        math,
        english,
        science,
        Biology,
        Total,
        percentage,
    };
    submitBtn.innerText = "Submitting...";
    studentDetails.push(studentDetail);
    localStorage.setItem("studentDetails", JSON.stringify(studentDetails));
    
    setTimeout(() => {
        alert("Student added successfully");
        submitBtn.innerText = "Submit";
        form.reset();
        closeAddModal();
        generateStudent(studentDetails)
    },1500);
    console.log(studentDetail);
});
addStudentBtn.addEventListener("click", () => {
    openAddModal();
});
let openAddModal = () => {
    form.classList.remove("hide-modal");

}
closeIcon.addEventListener("click", () => {
    closeAddModal();
});


let closeAddModal  = () => {
    
    form.classList.add("hide-modal");
}

const generateStudent = (data) => {
   tBody.innerHTML = data
   .map((student, index) => {
       let { 
         studentName,
         rollNo,
         math,
         english,
         science,
         Biology,
         Total,
         percentage,
      } = student;

        return `
        <tr>
        <td>${index + 1}</td>
        <td>${studentName}</td>
        <td>${rollNo}</td>
        <td>${math}</td>
        <td>${english}</td>
        <td>${science}</td>
        <td>${Biology}</td>
        <td>${Total}</td>
        <td>${percentage}</td>
        <td>
        <ion-icon name="create-outline" class ="editIcon"></ion-icon>
        <ion-icon name="trash-outline" class ="dltIcon"></ion-icon>
       </td>
        </tr>

        `
    }).join("");
};
generateStudent(studentDetails);
console.log(generateStudent);

function searchStudent (arrays, searchInput) {
    let filteredArray = arrays.filter((array) => {
        if (array.studentName.toLowerCase().includes(searchInput.toLowerCase())) {
            return array;
        };
    });
    generateStudent(filteredArray);
};

input.addEventListener("keyup", (e) => {
  let inputResult = e.target.value;
  searchStudent(studentDetails, inputResult)
});
// searchStudent(studentDetails, inputResult)

let isStudentIndexFound = null;


let editStudentForm = (id) => {
   let isStudentFound = studentDetails.find((student) => student.id == id);
   let isStudentIndexFound = studentDetails.findIndex((student) => student.id == id);
   console.log(isStudentIndexFound); 
   if (isStudentFound !== undefined) {
    openAddModal();
    studentName.value = isStudentFound.studentName;
    rollNo.value = isStudentFound.rollNo;
    math.value = isStudentFound.math;
    english.value = isStudentFound.english;
    science.value = isStudentFound.science;
    Biology.value = isStudentFound.Biology;
   };
};

editIcon.addEventListener("click", (e) => {
    e.preventDefault();
    editStudentForm();
    studentDetails.splice(isStudentFoundIndex, 1, {})
});



// editIcon.addEventListener("click", (e) => {
//    e.preventDefault();

//   studentDetails.splice(isStudentFoundIndex, 1, {} );
//  });


select.addEventListener("change", (e) => {
     if (e.target.value === "asc-name") {
       studentDetails = studentDetails.sort((a,b) =>{
        let fa = a.studentName.toLowerCase();
        let fb = b.studentName.toLowerCase();
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;

       });
       generateStudent(studentDetails);
       
     }
     else if (e.target.value === "des-name") {
        studentDetails = studentDetails.sort((b,a) =>{
            let fa = a.studentName.toLowerCase();
            let fb = b.studentName.toLowerCase();
            if (fa < fb) {
                return -1;
            };
            if (fa > fb) {
                return 1;
            };
            return 0;
    
           });
           generateStudent(studentDetails);
     }
     else if (e.target.value === "asc-total") {
        studentDetails = studentDetails.sort((a,b) =>
        a.Total - b.Total);
           generateStudent(studentDetails);
     }
     else if (e.target.value === "des-total") {
        studentDetails = studentDetails.sort((a,b) =>
        b.Total - a.Total);
           generateStudent(studentDetails);
     }
 });
 console.log(select);