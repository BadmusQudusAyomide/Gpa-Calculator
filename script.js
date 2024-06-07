// script.js

document.addEventListener("DOMContentLoaded", (event) => {
  const coursesContainer = document.getElementById("courses-container");
  const addCourseButton = document.getElementById("add-course");
  const calculateGpaButton = document.getElementById("calculate-gpa");
  const gpaValueElement = document.getElementById("gpa-value");

  function addCourse(name = "", credit = "", grade = "4") {
    const courseDiv = document.createElement("div");
    courseDiv.className = "course";

    courseDiv.innerHTML = `
            <input type="text" placeholder="Course Name" class="course-name" value="${name}">
            <input type="number" placeholder="Credit Hours" class="course-credit" min="0" step="1" value="${credit}">
            <select class="course-grade">
                <option value="5" ${grade == "5" ? "selected" : ""}>A</option>
                <option value="4" ${grade == "4" ? "selected" : ""}>B</option>
                <option value="3" ${grade == "3" ? "selected" : ""}>C</option>
                <option value="2" ${grade == "2" ? "selected" : ""}>D</option>
                <option value="1" ${grade == "1" ? "selected" : ""}>E</option>
                <option value="0" ${grade == "0" ? "selected" : ""}>F</option>
            </select>
            <button type="button" class="remove-course">Remove</button>
        `;

    courseDiv.querySelector(".remove-course").addEventListener("click", () => {
      courseDiv.remove();
      saveCourses();
    });

    coursesContainer.appendChild(courseDiv);
  }

  function calculateGPA() {
    const courses = document.querySelectorAll(".course");
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach((course) => {
      const credit = parseFloat(course.querySelector(".course-credit").value);
      const grade = parseFloat(course.querySelector(".course-grade").value);

      if (!isNaN(credit) && !isNaN(grade)) {
        totalCredits += credit;
        totalPoints += credit * grade;
      }
    });

    const gpa = totalPoints / totalCredits;
    gpaValueElement.textContent = totalCredits ? gpa.toFixed(2) : "0.00";
  }

  function saveCourses() {
    const courses = [];
    document.querySelectorAll(".course").forEach((course) => {
      const name = course.querySelector(".course-name").value;
      const credit = course.querySelector(".course-credit").value;
      const grade = course.querySelector(".course-grade").value;
      if (name && credit && grade) {
        courses.push({ name, credit, grade });
      }
    });
    document.cookie = `courses=${JSON.stringify(courses)}; path=/`;
  }

  function loadCourses() {
    const cookies = document.cookie.split("; ");
    const courseCookie = cookies.find((row) => row.startsWith("courses="));
    if (courseCookie) {
      const courses = JSON.parse(courseCookie.split("=")[1]);
      courses.forEach((course) => {
        addCourse(course.name, course.credit, course.grade);
      });
    }
  }

  addCourseButton.addEventListener("click", () => {
    addCourse();
  });

  calculateGpaButton.addEventListener("click", calculateGPA);

  loadCourses();

  window.addEventListener("beforeunload", saveCourses);
});
