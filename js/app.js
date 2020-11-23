//lists as container
const lists = document.querySelector('#products .container');
//all functions
loadAllEvents()

function loadAllEvents(){
  // addcarts
  lists.addEventListener('click', addCart);
  // length
  cartLength()
}

//get items
function getItems(){
  let items;
  if (localStorage.getItem('items') == null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  return items
}

//addcart
function addCart(e) {
  console.log(e.target);
  const image = e.target.attributes.image.value;
  const name = e.target.attributes.name.value;
  const price = e.target.attributes.price.value;
  const block = e.target.parentElement.parentElement;
  const arr = [name, image, price, 1];
  //to store them in local storage
  addToLocalStorage(arr,block)
}

//to store them in local storage
function addToLocalStorage(arr,block) {
  let items;
  let orgPrice;
  if (localStorage.getItem('items') == null) {
    items = [];
    orgPrice=[];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
    orgPrice=JSON.parse(localStorage.getItem('prices'));
  }
  //make sure it not repeated again
  let n=0;
  for(let i=0;i<items.length;i++){
    if(items[i].includes(arr[0])){
      n+=1;
    }
  }
  if(n == 0){
    items.push(arr);
    arrPrice = [arr[0],arr[2]];
    orgPrice.push(arrPrice);
    localStorage.setItem('items',JSON.stringify(items))
    localStorage.setItem('prices',JSON.stringify(orgPrice))
  }
  else{
    block.innerHTML+=`
    <div class="rem"><span>!</span> Already added to cart</div>
    `
  }
  setTimeout(function(){
    location.reload();
  },1000);
  cartLength();
}

// cart length display
cartLength();

// cart length
function cartLength(){
  if(getItems().length == 0){
    document.querySelector('.cardBtn').style.display = 'none';
  }
  else{
    document.querySelector('.cardBtn').textContent= getItems().length;
  }
}