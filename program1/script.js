const classNames = {
  STD_ITEM: 'std-container',
  STD_CHECKBOX: 'std-checkbox',
  STD_TEXT: 'std-text',
  STD_DELETE: 'std-delete',
};

const list = document.getElementById('std-list');
const stdCountSpan = document.getElementById('std-count');
const noShowCountSpan = document.getElementById('unchecked-count');
let idCount = 0;

function addNewStudent() {
  idCount++;
  var person = prompt("Please enter your name");
  var studentList = list.getElementsByTagName('li');
  
  if(checkForDuplicate(person, studentList) && person)
  {
	let studentLabel = document.createElement('li');
	studentLabel.innerHTML = person;
	studentLabel.id = 'student' + idCount;
	studentLabel.className = classNames.STD_TEXT;
	
	let listElement = document.createElement('input');
	listElement.type = 'checkbox';
	listElement.className = classNames.STD_CHECKBOX;
	listElement.id = 'checkbox' + idCount;
	listElement.value = person;
	listElement.checked = true;
	listElement.addEventListener('change', (event) => noShowChanged());
	
	let removeButton = document.createElement('input');
	removeButton.type = 'button';
	removeButton.id = idCount;
	removeButton.className = classNames.STD_DELETE;
	removeButton.value = "Remove";
	removeButton.addEventListener('click', (event) => studentRemoved(removeButton.id));
	
	studentLabel.prepend(listElement);
	studentLabel.appendChild(removeButton);
	list.appendChild(studentLabel);
	stdCountSpan.innerHTML++;
  }
}

function checkForDuplicate(input, array) {
  if(array.length > 0)
  {
    for(let entry of array) {
	  if(input === entry.innerText)
	  {
	    return false;
	  }
    }
  }
  return true;
}

function noShowChanged() {
  var checkList = list.getElementsByClassName(classNames.STD_CHECKBOX);
  let noShowCount = 0;
  if(checkList.length <= 0)
	return;

  for(let box of checkList) {
	if(!box.checked) {
	  noShowCount++;
	}
  }
  noShowCountSpan.innerHTML = noShowCount;
  return;
}

function studentRemoved(buttonId) {
  var buttonSelected = document.getElementById(buttonId);
  var studentSelected = document.getElementById('student' + buttonId);
  var checkboxSelected = document.getElementById('checkbox' + buttonId);
  
  studentSelected.parentNode.removeChild(studentSelected);
  stdCountSpan.innerHTML--;
  
  if(!checkboxSelected.checked) {
	noShowCountSpan.innerHTML--;  
  }	  
}