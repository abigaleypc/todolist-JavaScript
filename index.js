'use strict';

let data = {
  todolist: [{
    index: 0,
    task: '我今天要积极向上',
    status: true
  }, {
    index: 1,
    task: '不写作业',
    status: false
  }]
}

let ulNode = document.getElementsByTagName('ul')[0],
  taskInputNode = document.getElementsByTagName('input')['tasktext'];

// 输入框时间
function submit(e) {
  let v = taskInputNode.value;
  if (e.charCode == 13 && v) {
    let item = {
      index: data.todolist.length,
      task: v,
      status: false
    }
    addItem(item)
    taskInputNode.value = null;
  }
}



// 逻辑处理
function getItem(index) {
  return data.todolist[index];
}
function addItem(item) {
  data.todolist.push({
    index: item.index,
    task: item.task,
    status: item.status
  })
  genItem(item);
  return item;
}
function deleteItem(item) {
  data.todolist.splice(item.index, 1);
}
function editItem(item,newItem) {
  let item = {
    index:item.index,
    task:newItem.task,
    status:item.status
  }
  data.todolist[item.index] = item;
  return item;
}

function updateList(item) {
  data.todolist[item.index] = item;
}
// 操作DOM
function renderList(list) {
  Array.from(list).forEach(it => {
    genItem(it);
  })
}

function genItem(item) {
  let liNode = document.createElement('li');
  let checkboxNode = document.createElement('input');
  let aNode = document.createElement('a');

  liNode.id = item.index;
  liNode.setAttribute('id', item.index);
  checkboxNode.setAttribute('type', 'checkbox');
  checkboxNode.checked = item.status;
  checkboxNode.onclick = function () {
    let newItem = {
      task:item.task,
      status:checkboxNode.checked
    }
    editItem(getItem(index), newItem);
  }

  aNode.innerText = item.task;

  liNode.appendChild(checkboxNode);
  liNode.appendChild(aNode);
  ulNode.appendChild(liNode);

  setItemStyle(item);
}

// 修改样式
function setItemStyle(item) {
  ulNode.getElementsByTagName('li')[item.index].className = item.status ? 'lineThrough' : 'blink';
}

window.onload = function () {
  renderList(data.todolist)
}
