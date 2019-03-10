"use strict";

// Key to json (x-apikey): 5c8179f4cac6621685acbc9a
// JSON homepage: https://todolist-77b4.restdb.io/home/
// JSON file: https://todolist-77b4.restdb.io/rest/todo

window.addEventListener("DOMContentLoaded", get);
const form = document.querySelector("form");

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// OPEN FORM

document.querySelector("#open_form").addEventListener("click", openForm);

function openForm() {
  document.querySelector("#open_form").style.display = "none";

  form.elements.new_title.classList.remove("check_validation");
  form.elements.new_priority.classList.remove("check_validation_priority");
  form.elements.new_date.classList.remove("check_validation");
  form.style.display = "grid";
  document.querySelector("#close_form").addEventListener("click", closeForm);
}

function closeForm() {
  document.querySelector("#open_form").style.display = "block";
  form.style.display = "none";
  document.querySelector("#open_form").addEventListener("click", openForm);
}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// GET

function get() {
  fetch("https://todolist-77b4.restdb.io/rest/todo", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8179f4cac6621685acbc9a",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach(showTask);
    });
}

function showTask(task) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);

  clone.querySelector("#title").textContent = task.title;
  clone.querySelector("#description").textContent = task.description;
  clone.querySelector("#date").textContent = task.date;
  clone.querySelector("#priority").textContent = task.priority;
  // priority
  priority(clone, task); // go to EKSTRA

  // Delete-button:
  clone.querySelector("#delete").addEventListener("click", e => {
    e.target.parentElement.remove();
    deleteTask(task._id); // go to DELETE
  });

  document.querySelector("section").appendChild(clone);
}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// POST

function post(data) {
  const postData = JSON.stringify(data);
  fetch("https://todolist-77b4.restdb.io/rest/todo", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8179f4cac6621685acbc9a",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      form.elements.submit.disabled = false;
      form.reset();
    });
  showTask(data); // go to GET
}

// add Task / submit
form.setAttribute("novalidate", true);
form.addEventListener("submit", e => {
  form.elements.submit.disabled = true;
  const data = {
    title: form.elements.new_title.value,
    description: form.elements.new_description.value,
    date: form.elements.new_date.value,
    priority: form.elements.new_priority.value
  };
  e.preventDefault();
  console.log(form);
  console.log("submitted");

  validateForm(data); // go to VALIDATETION
});

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// DELETE

function deleteTask(id) {
  fetch("https://todolist-77b4.restdb.io/rest/todo/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8179f4cac6621685acbc9a",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => console.log(data));
}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// EKSTRA

// insert class to the right priority
function priority(clone, task) {
  if (task.priority === "must") {
    clone.querySelector("#priority").classList.add("must");
  } else if (task.priority === "should") {
    clone.querySelector("#priority").classList.add("should");
  } else if (task.priority === "could") {
    clone.querySelector("#priority").classList.add("could");
  }
}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// VALIDATETION

// validate the form
function validateForm(data) {
  if (form.checkValidity()) {
    console.log("validates!", data);
    form.elements.new_title.classList.remove("check_validation");
    form.elements.new_priority.classList.remove("check_validation_priority");
    //form.elements.new_date.classList.remove("check_validation");
    post(data);
  } else {
    form.elements.submit.disabled = false;
    validateElements();
    console.log("Doesn't validate!", data);
  }
}

// validate elements if the form doesn't validate.
function validateElements() {
  form.elements.new_title.classList.add("check_validation");
  //form.elements.new_description.classList.add("check_validation");
  form.elements.new_priority.classList.add("check_validation_priority");
  //form.elements.new_date.classList.add("check_validation");
}

// validate the element when moved away from the element
form.elements.new_title.addEventListener("blur", e => {
  form.elements.new_title.classList.add("check_validation");
});
// form.elements.new_description.addEventListener("blur", e => {
//   form.elements.new_description.classList.add("check_validation");
// });
form.elements.new_priority.addEventListener("blur", e => {
  form.elements.new_priority.classList.add("check_validation_priority");
});
// form.elements.new_date.addEventListener("blur", e => {
//   form.elements.new_date.classList.add("check_validation");
// });
