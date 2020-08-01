    let allAddToCartButtons = document.querySelectorAll(".addToCartButton");
    let allIncreaseQtyButtons = document.querySelectorAll(".increaseQuantityButton");
    let allDecreaseQtyButtons = document.querySelectorAll(".decreaseQuantityButton");

    let tempQuantity = 1;
    let isStart = 0;

    if(isStart==0){
        localStorage.clear();
        isStart=1;
    }
    // register events on each
    // for add to cart
    for (let addToCartButton of allAddToCartButtons) {
        addToCartButton.addEventListener('click', () => {

           localStorage

            let itemName = addToCartButton.dataset.name;
            let itemQuantity = tempQuantity;
            let itemPrice = addToCartButton.dataset.price;
            let itemTotalPrice = itemQuantity * itemPrice;
            console.log(itemName,' ', itemPrice,' ', itemQuantity, ' ', itemTotalPrice, ' itemName, itemPrice, itemQuant, itemTotalPrice');
            
            addNewItem(itemName,itemQuantity,itemPrice);

           
            if (localStorage.hasOwnProperty('totalprice')) {
                let temptotalprice=localStorage.getItem('totalprice');
                localStorage.removeItem("totalprice");
                localStorage.setItem('totalprice', (parseFloat(temptotalprice) + parseFloat(itemTotalPrice)));
                console.log(localStorage.getItem('totalprice'));
            } else {
                localStorage.clear();
                localStorage.setItem('totalprice',parseFloat(itemTotalPrice));
                // console.log(localStorage.getItem('totalprice'));
            }
            if (localStorage.hasOwnProperty('items')) {
       
                localStorage.removeItem("items");
                
            } else {
                localStorage.clear();
                localStorage.setItem('totalprice',parseFloat(itemTotalPrice));
     
            }

        });
    }

    // for increase
    for (let increaseQtyButton of allIncreaseQtyButtons) {
        increaseQtyButton.addEventListener('click', () => {
            let nearbyInput = increaseQtyButton.parentElement.querySelector('input[type=text]');
            let qty = parseInt(nearbyInput.value);
            nearbyInput.value = qty + 1;
            tempQuantity = nearbyInput.value;

        })
    }

    // for decrease
    for (let decreaseQtyButton of allDecreaseQtyButtons) {
        decreaseQtyButton.addEventListener('click', () => {
            let nearbyInput = decreaseQtyButton.parentElement.querySelector('input[type=text]');
            let qty = parseInt(nearbyInput.value);
            nearbyInput.value = (qty !== 0) ? qty - 1 : 0;
            tempQuantity = nearbyInput.value;
        });
    }

    var addNewItem = function (name, quantity, price) {

        var items = JSON.parse(localStorage.getItem('items')) || []
        localStorage.setItem('items', JSON.stringify(items));
        items.push({name:name, quantity:""+quantity, price:price});

        console.log(quantity, 'quantity curr');

                if (localStorage.getItem("items") === null) {
                    // ;
                    // items.push({name: name, quantity: quantity, price: price});
                    // localStorage.setItem('items', JSON.stringify(items));
                    // cartCount();
                    console.log(items, ' items1');

                } else{

                    for (var i = 0; i < items.length; i++) {
                        
                        if(name === items[i].name){
                            quantity = parseInt(items[i].quantity) + parseInt(quantity);
                            // items[i].quantity, quantity;
                            localStorage.setItem('items', JSON.stringify(items));
                        }
                    }
                    // items.push({name:name, quantity:""+quantity, price:price});
                    cartCount();
                    console.log(items, ' items2')
                    console.log(quantity, 'quantity new');
                }
}

function cartCount(){
    var totalQuantity = 0;
    // let count = JSON.parse(localStorage.getItem('itemsInCart'));
    let count = 0;
    var items = JSON.parse(localStorage.getItem('items'));
    
    items.forEach(element => totalQuantity += element.quantity);
        // console.log(totalQuantity, 'This is the Total Cart');
}
// localstorage = itemsInCart   ==  name,quantity,price
// localstorage = totalprice    ++