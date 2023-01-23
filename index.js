var addBtn = document.querySelector("#add")
var amount = document.querySelector("#amount")
var product = document.querySelector("#product")
var allProducts = document.querySelector("#allproducts")
var totalAmount = document.querySelector("#total")
function update(){
    axios.get("https://crudcrud.com/api/3b734ebc040d4090b873b3ef7ad6e4db/products")
    .then((res)=>{
        arr = res.data
        strg = ""
        total = 0
        arr.forEach((element,index) => {
            strg+= `<li> ${element.amount} - ${element.product} <button onClick="deleted(${index})">Delete Product</button></li>`
            total+= Number(element.amount)
        });
        allProducts.innerHTML = strg
        totalAmount.innerHTML = `Total value worth of products: Rs ${total}`
    })
}
update()

addBtn.addEventListener("click",()=>{
    axios.post("https://crudcrud.com/api/3b734ebc040d4090b873b3ef7ad6e4db/products",{"amount":amount.value,"product":product.value})
    .then((res)=>{ update() })
    .catch((err)=>{console.log(err)})
})

function deleted(index){
    axios.get("https://crudcrud.com/api/3b734ebc040d4090b873b3ef7ad6e4db/products")
    .then((res)=>{
        arr = res.data
        temp = arr[index]

        axios.delete("https://crudcrud.com/api/3b734ebc040d4090b873b3ef7ad6e4db/products/"+temp._id)
        .then((res)=>{ update() })
    })
}