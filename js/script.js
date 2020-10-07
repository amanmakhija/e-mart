//variables
const cart = document.getElementById("cart");
const courses = document.getElementById("list-courses");
const listCourses = document.querySelector("#list-cart tbody");
const emptyCartBtn = document.getElementById("empty-cart");
const toggle = document.getElementById('toggle');

//calling eventListeners
loadEventListeners();
//declaring eventListeners
function loadEventListeners(){
    courses.addEventListener("click",buyCourse);
    cart.addEventListener("click",deleteCourse);
    emptyCartBtn.addEventListener("click",emptyCart);
    document.addEventListener("DOMContentLoaded",readLocalStorage);
}
toggle.addEventListener('change', (e) => {
    document.body.classList.toggle('dark', e.target.checked);
});

//addtocart button
function buyCourse(e){
    e.preventDefault(); //prevents page from reloading whenwever we click add cart
    if(e.target.classList.contains("add-cart")){
        const course = e.target.parentElement.parentElement;
        readDataCourse(course);
    }
}

//readthecourse data
function readDataCourse(course){
    const infoCourse = { //infoCourse is a object
        image: course.querySelector("img").src,
        title: course.querySelector("h4").textContent,
        price: course.querySelector(".discount").textContent,
        id: course.querySelector("a").getAttribute("data-id")
    }
    insertInCart(infoCourse);
}

//showing selected course in cart
function insertInCart(infoCourse){
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
        <img src="${infoCourse.image}" width=100>
    </td>
    <td>
        ${infoCourse.title}
    </td>
    <td>
        ${infoCourse.price}
    </td>
    <td>
        <a href="#" class="delete-course" data-id="${infoCourse.id}">X</a>
    </td>
    `;
    listCourses.appendChild(row);
    saveCourseLocalStorage(course);
}

//removing cart course in DOM
function deleteCourse(e){
    e.preventDefault();
    let course,courseId;
    if(e.target.classList.contains("delete-course")){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector("a").getAttribute("data-id");
    }
    deleteCourseLocalStorage(courseId);
}

//removing cart courses
function emptyCart(){
    while(listCourses.firstChild){
        listCourses.removeChild(listCourses.firstChild);
    }
    emptyLocalStorage();
    return false;
}

//stores courses in the cart in the local storage
function saveCourseLocalStorage(course){
    let courses;
    courses = getCoursesLocalStorage();
    courses.push(course);//selected course will be added to the array
    localStorage.setItem('courses',JSON.stringify(courses));
}

//it will check course in LS
function getCoursesLocalStorage(){
    let coursesLS;
    if(localStorage.getItem('courses') == null){
        coursesLS = [];
    }
    else{
        coursesLS = JSON.parse(localStorage.getItem("courses"));
    }
    return coursesLS;
}

//it will print local storage courses into the cart
function readLocalStorage(){
    let coursesLS = getCoursesLocalStorage();
    coursesLS.forEach(function(course){
        const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>
                    ${course.title}
                </td>
                <td>
                    ${course.price}
                </td>
                <td>
                    <a href="#" class="delete-course" data-id="${course.id}">X</a>
                </td>
            `;
            listCourses.appendChild(row);
    });
}

//deleting course by particular id in LS
function deleteCourseLocalStorage(course){
    let coursesLS;
    coursesLS = getCoursesLocalStorage();
    coursesLS.forEach(function(coursesLS,index){
        if(coursesLS.id === course){
            coursesLS.splice(index,1);
        }
    });
    localStorage.setItem("courses",JSON.stringify(coursesLS));
}

//deleting all courses from LS
function emptyLocalStorage(){
    localStorage.clear();
}