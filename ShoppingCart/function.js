var products = [{
        id: 0,
        name: 'OhOhrensessel Josslyn',
        price: 499.99,
        currency: 'EUR',
        imgurl: "photos/01.jpg",
    },
    {
        id: 1,
        name: 'Sessel Sofie',
        price: 799.99,
        currency: 'EUR',
        imgurl: "photos/02.jpg",
    },
    {
        id: 2,
        name: 'Schlafsessel Rovigo',
        price: 399.99,
        currency: 'EUR',
        imgurl: "photos/03.jpg",
    },
    {
        id: 3,
        name: 'Sessel Little',
        price: 699.99,
        currency: 'EUR',
        imgurl: "photos/04.jpg",
    },
    {
        id: 4,
        name: 'Sessel Peacock',
        price: 999.99,
        currency: 'EUR',
        imgurl: "photos/05.jpg",
    },
    {
        id: 5,
        name: 'Sessel Anna',
        price: 199.99,
        currency: 'EUR',
        imgurl: "photos/06.jpg",
    }
]

var cart = [] // {productId, qty}

function loadView() {
    products.forEach(view => {
        var x = document.getElementById("products");
        x.innerHTML += `
        <div class=" product" id="div${view.id}">
            <img src="${view.imgurl}">
            <div class=name-product id="name${view.id}">
                <h3>${view.name}</h3>
            </div>
            <div class="price-btn" style="display:flex;   justify-content: space-around; margin:5px; justify-content: baseline">
                <div class="price" id="price${view.id}">
                    <a>${view.price} EUR</a>
                </div>
                <div class="btn-product">
                    <button name="btn" id ="${view.id}_add" class="btnadd btn-primary add-to-cart" >
                        Add to cart
                    </button>
                </div>
                <div class = "qty">
                    <input id="${view.id}_qty" class="form-control inputqty" type="number" id="quantity" name="quantity" min="0" max="10000000" value="1" style="display: none; width: 80%">
                </div>
            </div>
        </div>
        `
            //     <button name="btn" id ="${view.id}_remove" class="btnremove2 btn btn-danger" style="display: none"  >
            //     Remove
            // </button>
    })
}

function clearcart() {
    const nameStuff = document.getElementById("name-stuff");
    if (nameStuff) {
        document.getElementById("name-stuff").innerHTML = `<div></div>`
    }
}

function loadcart() {
    // document.getElementById("modal").innerHTML = ` 

    // `
    clearcart()
    if (cart.length == 0) {
        document.getElementById("total").innerHTML =
            `
            <div class="text-2-1" id="name-stuff">
                Cart is empty
            </div>
            <div class="text-2-2">
                <a>Total: <span id="cost-total" class="cost-total">0</span> Euro</a>
            </div>
        </div>
        `
    } else {
        cart.forEach((view, i) => {
            var x = document.getElementById("name-stuff")
            x.innerHTML += `
            <div class="" style="display:flex;justify-content: space-between; margin:5px" >
                <div class="col-sm-8">
                    <button id="${i}"class="btn btn-danger btnremove">X</button>
                    <a><b>${view.productname} </b></a>
                 </div>
                <div class="col-sm-2"><input id="${view.productid}_qty2"class="form-control inputqty2" type="number" name="quantity" min="0" max="10000000" value="${view.productqty}"  style="width : 50px"></div>
                 <div class="col-sm-2" style="margin: 5px" ><b>${(view.productprice*view.productqty).toFixed(1)}</b></div>
            </div>
`;

        })
        let total = 0
        for (let i = 0; i < cart.length; i++) {
            total = +total + +cart[i].productprice * +cart[i].productqty;
        }
        document.getElementById("cost-total").innerHTML = `
                <a>${total.toFixed(2)}<a>
                `
    }


    var allBtnremove = document.querySelectorAll(".btnremove");
    allBtnremove.forEach(remove => {
        remove.addEventListener("click", removeproduct)
    });

    var allqty = document.querySelectorAll(".inputqty2");
    allqty.forEach(add => {
        add.addEventListener("input", changeqty2)
    });
}

function removeProductInCart(id) {
    // clearcart()
    document.getElementById(id + '_qty').style.display = "none"
    document.getElementById(id + '_qty').value = 1
    document.getElementById(id + '_add').style.display = "block"
    loadcart()
}

function removeproduct(e2) {

    var y = e2.target;
    id = cart[y.id].productid
    cart.splice(y.id, 1);
    removeProductInCart(id)
}

// function removeproduct2(e21) {


//     var x = e21.target
//     var id = +x.id.split("_")[0]
//     for (i = 0; i < cart.length; i++) {
//         if (cart[i].productid == (id)) { cart.splice(i, 1) }
//     }

//     removeProductInCart(id)
//     var allBtnadd = document.querySelectorAll(".btnadd");
//     allBtnadd.forEach(add => {
//         add.addEventListener("click", addproduct)
//     });


// }

function changeqty(e3) {
    var x = e3.target
    var id = +x.id.split("_")[0] // 3 1 2
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productid == (id)) {
            cart[i].productqty = x.value

        }
        console.log(document.getElementById(x.id + '2').value)
    }
    loadcart()
    document.getElementById(x.id + '2').value = x.value
    if (x.value < 1) {
        document.getElementById(x.id).style.display = "none"
        document.getElementById(id + "_add").style.display = "block"
        for (i = 0; i < cart.length; i++) {
            if (cart[i].productid == (id)) {
                cart.splice(i, 1)

            }
        }
        removeProductInCart(id)
    }
}

function changeqty2(e31) {
    var x = e31.target
    var id = +x.id.split("_")[0] // 3 1 2
    document.getElementById(id + '_qty').value = x.value
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productid == (id)) {
            cart[i].productqty = x.value
        }
    }



    document.getElementById(id + '_qty').value = x.value

    if (x.value < 1) {
        document.getElementById(x.id).style.display = "none"
        document.getElementById(id + "_add").style.display = "block"
        for (i = 0; i < cart.length; i++) {
            if (cart[i].productid == (id)) {
                cart.splice(i, 1)

            }
        }
        removeProductInCart(id)
    }
    loadcart();
}

function addproduct(e1) {
    // clearcart()
    var product = {};
    var x = e1.target;
    var [id] = x.id.split("_") //id san pham

    document.getElementById(x.id).style.display = "none"
    document.getElementById(id + "_qty").style.display = "block"

    product.productqty = 1;
    product.productid = products[id].id;
    product.productname = products[id].name
    product.productprice = products[id].price

    cart.push(product);
    loadcart()

}
// $(window).resize(function() {
//     let width = $(window).width
//     if (width <= 1200) {
//         $('.body').addClass('responsive_768');
//     } else {
//         $('.body').removeClass('responsive_768')
//     }
// })

function main() {
    loadView();

    var allBtnadd = document.querySelectorAll(".btnadd");
    allBtnadd.forEach(add => {
        add.addEventListener("click", addproduct)
    });

    // var allBtnremove = document.querySelectorAll(".btnremove2");
    // allBtnremove.forEach(remove => {
    //     remove.addEventListener("click", removeproduct2)
    // });

    var allqty = document.querySelectorAll(".inputqty");
    allqty.forEach(add => {
        add.addEventListener("input", changeqty)
    });

    loadcart();


    // 1. listen button click
    // 2. Get id of product
    // 3. them item vo mang cart[]
    // 4. goi ham renderCart()
}

main();