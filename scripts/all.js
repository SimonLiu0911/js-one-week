const headerInput = document.querySelector(".header__input");
const todocontentList = document.querySelector(".todocontent__list");
const todocontentListItemDelete = document.querySelector(".todocontent__list__item__delete");
const todocontentClearAllitems = document.querySelector(".todocontent__clear_allitems");
let todoItems = [];

// 監聽
headerInput.addEventListener("keypress", addItem);
todocontentListItemDelete.addEventListener("click", deleteItem);

function addItem(event) {
    if (event.key === "Enter") {
        let headerInputValue = headerInput.value;
        if (headerInputValue.trim() !== "") {
            let todoItem = {
                id: Math.floor(Date.now()),
                itemValue: headerInputValue,
                completed: false
            }
            todoItems.push(todoItem);
            render();
            headerInput.value = "";
        }
    }
}

function deleteItem() {
    console.log('delete')
}

function render() {
    let listItem = "";
    todoItems.forEach(element => {
        listItem += `
            <li class="todocontent__list__item">
                <div class="todocontent__list__item__check">
                    <input type="checkbox">
                </div>
                <div class="todocontent__list__item__title">
                    ${element.itemValue}
                </div>
                <div class="todocontent__list__item__delete">
                    <a href="#">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                    <div id="clearfix"></div>
                </div>
            </li>
        `;
        todocontentList.innerHTML = listItem;
    })
}

