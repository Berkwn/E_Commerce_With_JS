const card=document.getElementById("card")
const btn=document.getElementById("shoppingbtn")
const closeShopping=document.getElementById("closeShopping")
const body=document.querySelector("body")
const list=document.querySelector(".list")
const listCard=document.querySelector(".listCard")
const total=document.querySelector(".total")
const adet=document.querySelector(".adet")

btn.addEventListener("click",()=>{
card.style.zIndex="2"
card.style.width="400px"
card.style.transition="0.5s"
card.style.left="0"
// list.style.marginLeft="400px"
card.style.overflowY="auto"
list.style.transition="0.5s"

})


closeShopping.addEventListener("click",()=>{
    
    card.style.zIndex="1"
    card.style.width="0"
    card.style.left="-100px"
    card.style.transition="0.5s"
    
    

})



let product=[

{
    "id":1,
    "name":"product1",
    "images":"1.png",
    "price":2200

},
{
    "id":2,
    "name":"product2",
    "images":"2.png",
    "price":3800

},
{
    "id":3,
    "name":"product3",
    "images":"3.png",
    "price":2000

},
{
    "id":4,
    "name":"product4",
    "images":"4.png",
    "price":2290

},
{
    "id":5,
    "name":"product5",
    "images":"5.png",
    "price":2230

},

{
    "id":6,
    "name":"product6",
    "images":"6.png",
    "price":2600

}


]

let listCards=[]

const app=()=>{

    product.forEach((element,key)=>{
        
        let newDiv=document.createElement("div")
        newDiv.classList.add("item")

        newDiv.innerHTML=`
        <div style="width:100%" class="d-flex; justify-content:center; align-items:center; ">
        <img style="width:100%" src="images/${element.images}">
        <div class="title">${element.name}</div>
        <div class="title">${element.price} TL</div>
        <button onclick="addToCard(${key})">Add to Card</button>
        </div>
    
        
        `
        list.appendChild(newDiv)

        
    })
}

const addToCard = key => {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(product[key]));
        listCards[key].adet = 1;
        console.log(listCards[key].adet);
        

        // Alışveriş sepeti içeriğini (listCard) güncelle
        updateCartUI();
    }
};

const updateCartUI = () => {
    // Mevcut içeriği temizle
    listCard.innerHTML = "";

    let count = 0;
    let totalPrice = 0;

    listCards.forEach((element, key) => {
        if (element !== null) {
            let newDiv = document.createElement("li");
            newDiv.style.listStyleType="none"
            newDiv.style.marginTop="20px"
            newDiv.innerHTML = `
                <div class="d-flex" style="width:30%">
                    <img style="width:100%" src="images/${element.images}">
                </div>
                <div class="cardTitle">${element.name}</div>
                <div class="cardTitle">${element.price} TL</div>
                <div class="d-flex">
                    <button  style="background-color:#560bad; padding:8px " class="cardButton" onclick="changeAdet(${key}, ${element.adet - 1})">-</button>
                    <div style="margin-top:9px" class="count">${element.adet}</div>
                    <button style="background-color:#560bad; padding:8px" class="cardButton" onclick="changeAdet(${key}, ${element.adet + 1})">+</button>
                </div>
            `;

            listCard.appendChild(newDiv);

            totalPrice += element.price * element.adet;
            count += element.adet;

           
        }
       
    });

    // Toplam ve adet elemanlarını güncelle
    total.innerText = totalPrice.toLocaleString();
    adet.innerHTML = count;
};

// Alışveriş sepetindeki ürün miktarını değiştirmek için fonksiyon
const changeAdet = (key, adet) => {
    if (adet === 0) {
        // Miktar sıfır olursa öğeyi kaldır
        delete listCards[key];
    } else {
        // Miktarı ve fiyatı güncelle
        listCards[key].adet = adet;
        // listCards[key].price = adet * product[key].price;
    }

    // Alışveriş sepeti içeriğini (listCard) güncelle
    updateCartUI();
};

// Uygulamayı başlatmak için fonksiyon

app();