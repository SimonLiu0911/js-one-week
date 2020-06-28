let data = [];

const $templateItem = document.getElementById("templateItem");
const $ul = document.getElementById("list");
const $checkAll = document.getElementById("checkAll");
const $del = document.getElementById("del");
const $add = document.getElementById("add");
const $newItemTitle = document.getElementById("newItemTitle");

// render(data);
$checkAll.checked = isAllChecked(data);


/*
	EVENTS
*/
$ul.addEventListener("click", function (event) {
    $target = event.target;
    if ($target.tagName === "LI") {
        return;
    }

    const $li = $target.parentElement;
    const $index = $li.querySelector('input[type="hidden"]');
    const index = parseInt($index.value);

    // 捕獲到delete的話，執行remove()
    if ($target.classList.contains("delete")) {

        $li.remove();
        data[index] = null;

        // 捕獲到important時，選擇收藏或取消收藏
    } else if ($target.classList.contains("important")) {

        data[index].important = !data[index].important;
        $target.innerText = data[index].important ? '不重要' : '重要';

        // 捕獲到option時，執行check/un-check
    } else if ($target.classList.contains("option")) {

        data[index].checked = !data[index].checked;
        $checkAll.checked = isAllChecked(data);

    }
}, false); // flase: 事件捕獲


// 全選全不選事件
$checkAll.addEventListener("click", function (event) {
    data
        .map(function (item, index) {
            if (item !== null) {
                data[index].checked = event.target.checked;
            }
        });

    clear();
    render(data);
}, false);

// 添加事件
$add.addEventListener("click", function (event) {
    if ($newItemTitle.value) {   // true:input裡面有值; false:input裡面無值
        const item = {
            id: null,
            title: $newItemTitle.value,
            checked: false,
            important: false
        };

        data.push(item);
        const $item = createItem({ index: data.length - 1, ...item });
        $ul.appendChild($item);

        $checkAll.checked = false;

        $newItemTitle.value = '';
    }
}, false);

// 監聽全部刪除鍵
$del.addEventListener("click", function (event) {
    data
        .map(function (item, index) {
            if (item && item.checked) {
                data[index] = null;
            }
        });
    clear();
    render(data);
    $checkAll.checked = isAllChecked(data.filter(item => item));
}, false);



/*
	FUNCTIONS
*/
// 渲染功能
function render(data) {
    data
        .filter(function (item, index) {
            if (item === null) {
                return false
            }
            item.index = index;
            return true;
        })
        .map(function ({ index, title, checked, important }) {
            const $item = createItem({ index, title, checked, important });
            $ul.appendChild($item);
        });
}

// 清除功能
function clear() {
    Array.from($ul.children)
        .map(function (item) {
            item.remove();
        });
}

// 添加功能
function createItem({ index, title, checked, important }) {
    const itemHTML = $templateItem.innerHTML
        .replace("%title%", title)
        .replace("%important_des%", important ? '不重要' : '重要');
    const $div = document.createElement("div");
    $div.innerHTML = itemHTML;
    const $item = $div.children[0];
    const $index = $item.querySelector('input[type="hidden"]');
    $index.value = index.toString();
    const $check = $item.querySelector('input[type="checkbox"]');
    $check.checked = checked;
    return $item;
}

// 全選全不選功能
function isAllChecked(data) {
    if (data.length === 0) {
        return false;
    }
    return data
        .filter(function (item) {
            return item !== null;
        })
        .every(function (item) {
            return item.checked;
        });
}