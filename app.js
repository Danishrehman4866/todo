const firebaseConfig = {
    apiKey: "AIzaSyD0q37-_m5h_Lzu6_KedjWN1bD4sbYbZg",
    authDomain: "bmj-todo-proj.firebaseapp.com",
    databaseURL: "https://bmj-todo-proj-default-rtdb.firebaseio.com",
    projectId: "bmj-todo-proj",
    stotageBucket: "bmj-todo-proj.appspot.com",
    messagingSenderId: "762876456294",
    appId: "1:762876456294:web:fabbff27b0d5e6db1feca7"
};

const app = firebase.initializeApp(firebaseConfig);

console.log(app);

function addTask() {
    var textItem = document.getElementById('task');
    var taskValue = textItem.ariaValueMax;
    // consol.log(textValue);

    var mainTable = document.getElementById('table');

    var taskTd = document.createElement('td');
    var eidtBtnTd = document.createElement('td');
    var delBtnTd = document.createElement('td');

    var row = document.createElement('tr');

    row.appendChild(taskTd);
    row.appendChild(eidtBtnTd);
    row.appendChild(delBtnTd);

    mainTable.appendChild(row)

    var editBtn = document.createElement('button');
    var delBtn = document.createElement('button');

    var editBtnTxt = document.createTextNode('Edit');
    var delBtnTxt = document.createTextNode('Delete');
    var textValue = document.createTextNode(textValue)

    editBtn.appendChild(editBtnTxt);
    delBtn.appendChild(delBtnTxt);
    delBtn.setAttribute('onClick','deleteTask(this)');
    editBtn.setAttribute('onClick','editTask(this)');

    taskTd.appendChild(taskValue);
    eidtBtnTd.appendChild(editBtn);
    delBtnTd.appendChild(delBtn);

    app.database().ref('/').child('Task').push(taskValue);

    textItem.value = " ";
}

function deleteAllTasks(e) {
    document.getElementById('table').innerHTML = "";
    app.database().ref('/Tasks').remove();
}

function deleteTask(e) {
    //e.parentNode.parentNode.remove();
    //app.database().ref('/Tasks/${taskId}').child("/").remove();

    app.database().ref('/Tasks/').on('child_added',function(data) {
        console.log(data.key);
    }
    )
}

function editTask(e) {
    var taskValue = e.parentNode.parentNode.firstChild.innerHTML;

    var updateValue = prompt('Enter value to Update',taskValue);

    if (!updateValue.trim()) {
        alert("Enter Task value");
    } else {
        e.parentNode.parentNode.firstChild.innerHTML = updateValue;
    }
}