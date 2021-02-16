const cart = document.getElementById('cart');
const courses = document.getElementById('list-courses');
const listCourses = document.querySelector('#listCart tbody');
const emptyCartBtn = document.getElementById('empty-cart');

// listeners
loadEventListeners();
function loadEventListeners(){
 // when add cart is clicked
 courses.addEventListener('click',buyCourse);
// when a single courrse is removed from cart
cart.addEventListener('click',deleteCourse);
//when empty cart is clicked
emptyCartBtn.addEventListener('click',emptyCart);
// after loading the document, show data inot the cart from local storage
document.addEventListener('DOMContentLoaded',readLocalStorage);
}

//all functions

//function that adds the course to the cart
function buyCourse(e){
 e.preventDefault();

 if(e.target.classList.contains('add-cart')){
  const course=e.target.parentElement.parentElement;

  readDataCourse(course);
 }
}

//read the course data
function readDataCourse(course){
  const infoCourse={
   image:course.querySelector('img').src,
   title:course.querySelector ('h4').textContent,
   price:course.querySelector('.discounted').textContent,
   id:course.querySelector('a').getAttribute('data-id')
  }
  insertInCart(infoCourse);
}

//insert data into cart
function insertInCart(course){
  const row=document.createElement('tr');
  row.innerHTML=`
  <td>
  <img src="${course.image}">
  </td>
  <td>
  ${course.title}
  </td>
  <td>
  ${course.price}
  </td>
  <td class="cross">
  <a href="#" class="delete-course" data-id="${course.id}">x</a>
  </td>
  `;
  listCourses.appendChild(row);
  saveCourseLocalStorage(course);
}

//delete course from cart
function deleteCourse(e){
e.preventDefault();
let course, courseId;
if(e.target.classList.contains('delete-course')){
  e.target.parentElement.parentElement.remove();
  course=e.target.parentElement.parentElement;
  courseId=course.queryselector('a').getAttribute('data-id');

}
  deleteCourseLocalStorage(courseId);
}

// remove cart courses
function emptyCart(){
  while(listCourses.firstChild){
    listCourses.removeChild(listCourses.firstChild);
  }
  emptyLocalStorage();
  return false ;
}
//store courses in local storage from cart
function saveCourseLocalStorage(course){
  let courses;
  courses=getCoursesLocalStorage();
  courses.push(course);
  localStorage.setItem('courses',JSON.stringify(courses));
}

//check for items in the local storage
function getCoursesLocalStorage(){
  let coursesLS;
  if (localStorage.getItem('courses')===null){
    coursesLS=[];
  }else{
    coursesLS=JSON.parse(localStorage.getItem('courses'));
  }
  return coursesLS;
}

function readLocalStorage (){
  let coursesLS;
  coursesLS= getCoursesLocalStorage();
  coursesLS.forEach(function(course){
    const row=document.createElement('tr');
    row.innerHTML=`
    <td>
    <img src="${course.image}">
    </td>
    <td>
    ${course.title}
    </td>
    <td>
    ${course.price}
    </td>
    <td class="cross">
    <a href="#" class="delete-course" data-id="${course.id}">x</a>
    </td>
    `;
    listCourses.appendChild(row);  
  });
}

function deleteCourseLocalStorage(course){
  let coursesLS;
  coursesLS=getCoursesLocalStorage();
  coursesLS.forEach(function(courseLS,index){
    if(courseLS.id===course){
      coursesLS.splice(index,1);
    }
  });
  localStorage.setItem('courses',JSON.stringify(coursesLS));
}

function emptyLocalStorage(){
  localStorage.clear();
}