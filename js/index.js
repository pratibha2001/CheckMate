//select the write here box
const item=document.querySelector("#item");
//select the todo box
const toDoBox=document.querySelector("#to-do-box");


//add in todo function
const addToDo = (item) =>{
    //create a new list element and add the item in the inner html and the cross sign as well
    const listItem= document.createElement("li");
    listItem.innerHTML=`
    ${item}
    <i class="fa-solid fa-x"></i>
    `;
    //add event listener to toggle the line through class for the checked item
    listItem.addEventListener("click",
        function(){
            this.classList.toggle("done");
        }
    )
    //select the icon tag and add remove eventlistener to it
    listItem.querySelector("i").addEventListener("click",
        function(){
            listItem.remove();
        }
    )
    //appned the newly created element to the todobox
    toDoBox.appendChild(listItem);
}


    //save to dos function
const saveToDos = () => {
    //select all the items with li tag i.e. all the tasks
    const items = document.querySelectorAll("li");
    //declare an array to store them
    const data = [];
    //use for each loop to store
    items.forEach((item) => {
        data.push(item.textContent);
    });
    //edge cases
    if (data.length === 0) {
        localStorage.removeItem("items");
    } else {
        localStorage.setItem("items", JSON.stringify(data));
    }
}

    //load the previously stored todos from the local storage
const loadToDos = () => {
    //get the saved items
    const savedItems = localStorage.getItem("items");
    //
    if (savedItems) {
        const itemsArray = JSON.parse(savedItems);
// The JSON.parse() function is used to convert the JSON-formatted string, 
//this string represents an array of to-do items.
        itemsArray.forEach((itemText) => {
            addToDo(itemText);
        });
    }
}

item.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addToDo(this.value);
        this.value = "";
        saveToDos();
    }
});

// Call loadToDos when the page loads
document.addEventListener("DOMContentLoaded", loadToDos);