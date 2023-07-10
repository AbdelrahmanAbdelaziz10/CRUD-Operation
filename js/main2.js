let name =document.querySelector("#productname");
let category = document.querySelector("#productcategory");
let price=document.querySelector("#productprice");
let count = document.querySelector("#productcount");
let description = document.querySelector("#productdescription");
let redError = document.querySelector("#red_error");
let success = document.querySelector("#success");
let createProduct = document.querySelector("#createproduct");

let addProduct = document.querySelector("#add");
let deleteAll = document.querySelector("#delete");


addProduct.addEventListener("click" , AddProduct);



function AddProduct(){
    let product={
        name:name.value,
        category:category.value,
        price:price.value,
        count:count.value,
        description:description.value,
    };
    if(product.name !== "" && product.category !=="" && product.price !==""
    && product.count !=="" && product.description !=="" ){
        success.style.display="block";
        redError.style.display="none";
    }else {
        redError.style.display="block";
        success.style.display="none";
    }
}
