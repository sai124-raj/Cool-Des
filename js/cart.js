// cart list
const tables = document.querySelector('.table-body');

// all functions
loadAllEvents()

function loadAllEvents() {
  cartLength()
  // add the following
  getItemToDisplay()
  //delete
  tables.addEventListener('click', deleteItem)
}

//get items
function getItems() {
  let items;
  if (localStorage.getItem('items') == null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  return items
}

//prices indiviually
function org_price() {
  return JSON.parse(localStorage.getItem('prices'))
}
org_price()

// cart length
function cartLength() {
  if (getItems().length == 0) {
    document.querySelector('.cardBtn').style.display = 'none';
  } else {
    document.querySelector('.cardBtn').textContent = getItems().length;
  }
}

// make them display from the local storage
function getItemToDisplay() {
  let items = getItems()
  let orgPrice = org_price();
  let n = 0;
  items.forEach(function (item) {
    n += 1
    let c = "tab" + String(n)
    let name = item[0];
    let image = item[1];
    let price = item[2];
    document.querySelector('.table-body').innerHTML += `
  <div class="table-grid ${c}">
    <div class="body-item ite">
      <h2 id="title">${name}</h2>
      <div class="img-fluid" id="image">
        ${image}
      </div>
      <h3 id="price">Price: ₹${orgPrice[n-1][1]}/kg</h3>
    </div>
    <div class="body-quantity">
      <div class="quan-body">
        <div class="increase">
          <button class="dec-body">-</button>
        </div>
        <div class="quan-disp">
          <input id="num" value="${item[3]}" disabled="" style="font-size: 16px;">
        </div>
        <div class="increase">
          <button class="inc-body">+</button>
        </div>
      </div>
    </div>
    <div class="body-price">
      <div class="price-text">${price}</div>
    </div>
    <button class="delete ${c}">&times</button>
  </div>
    `
  })
}

// delete item
function deleteItem(e) {
  let table = document.querySelectorAll('.table-grid');
  let index = 0;
  table.forEach(function (tab) {
    index += 1
    if (tab.lastElementChild.className === e.target.className) {
      let items = getItems();
      let orgPrice = org_price();
      tables.removeChild(tab);
      items.splice(index - 1, 1);
      orgPrice.splice(index - 1, 1);
      localStorage.setItem('items', JSON.stringify(items))
      localStorage.setItem('prices', JSON.stringify(orgPrice))
      cartLength()
    }
  })
  location.reload();
}

// total price 
function totalPrice() {
  let total = 0;
  let items = getItems();
  items.forEach(function (item) {
    total += parseInt(item[2])
  })
  return total
}

// buttons 
const decrease = document.querySelectorAll('.dec-body');
const increase = document.querySelectorAll('.inc-body');

//increase num
tables.addEventListener('click', incBtn);
//decrease num
tables.addEventListener('click', decBtn);

//increase num
function incBtn(e) {
  increase.forEach(function (ibtn) {
    if (ibtn == e.target) {
      let before = e.target.parentElement.parentElement.parentElement;
      let num = parseInt(before.querySelector('input').value);
      num += 1
      let title = before.parentElement.querySelector('#title').textContent;
      let items = getItems();
      let orgPrice = org_price();
      items.forEach(function (item, index) {
        if (title == item[0]) {
          item[3] = num;
          item[2] = Number(orgPrice[index][1]) * num;
          localStorage.setItem('items', JSON.stringify(items))
        }
      })
      location.reload()

    }
  })
}

//decrease num
function decBtn(e) {
  decrease.forEach(function (dbtn) {
    if (dbtn == e.target) {
      let before = e.target.parentElement.parentElement.parentElement;
      let num = parseInt(before.querySelector('input').value);
      if (num!=1) {
        num -= 1
        let title = before.parentElement.querySelector('#title').textContent;
        let items = getItems();
        let orgPrice = org_price();
        items.forEach(function (item, index) {
          if (title == item[0]) {
            item[3] = num;
            item[2] = Number(orgPrice[index][1]) * num;
            localStorage.setItem('items', JSON.stringify(items))
          }
        })
        location.reload()
      }
    }
  })
}

// to display total price
let total = totalPrice();
document.querySelector('.disPrice').textContent = total;