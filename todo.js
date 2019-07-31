load();

document.getElementById("todo__btn").addEventListener("click",function() {
    todoAdd();
});

function load() {
    myStorage = window.localStorage;
    if (myStorage.length > 0) {
        for (j=0; j<myStorage.length;j++) {
            var li = document.createElement("li");
            var value = myStorage.getItem("elem"+j)
            var array_value = value.split(",");
            var text = document.createTextNode(array_value[0]);
            li.appendChild(text);
            document.getElementById("todo__list").appendChild(li)
            if (array_value[1]=="true") {
                li.classList.add("checked");
            }
            // createCancelButton(li);
        }
    }
}

function save() {
    localStorage.clear();
    var list = document.querySelectorAll('li');
    var count = 0;
    for (i=0; i<list.length; i++) {
        var status = list[i].classList.contains("checked") ? true : false;
        var props = [list[i].innerHTML, status]
        if (!status) { 
            localStorage.setItem("elem"+count, props);
            console.log(props);
            count+=1;
        }
    }
}

function todoAdd() {
    var li = document.createElement("li");
    var todoInput = document.getElementById("todo__input")
    var value = todoInput.value;
    if (value!="") {
    todoInput.value="";
        var text = document.createTextNode(value);
        li.appendChild(text);
        document.getElementById("todo__list").appendChild(li)
    }
    save();
    // createCancelButton(li);
}

function createCancelButton(elem) {
    var div = document.createElement("div");
    var txt = document.createTextNode("X");
    // div.appendChild(txt);
    // div.classList.add("cancel");
    // elem.appendChild(div);
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
    save();
}, false);

var input = document.querySelector("#todo__input");
input.addEventListener('keypress', function(ev) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
        save();
    }
}, false);