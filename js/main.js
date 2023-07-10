let name =document.querySelector("#productname");
let category = document.querySelector("#productcategory");
let price=document.querySelector("#productprice");
let count = document.querySelector("#productcount");
let description = document.querySelector("#productdescription");
let redError = document.querySelector("#red_error");
let countError = document.querySelector("#count_error");
let success = document.querySelector("#success");
let createProduct = document.querySelector("#createproduct");
let ProductSearch = document.querySelector("#inputSearch");


let addProduct = document.querySelector("#add");
let deleteAll = document.querySelector("#delete");

let mood="create";
let tmp;


let arProduct ;
if(localStorage.product != null){
    arProduct = JSON.parse(localStorage.product);
} else {
    arProduct = [];
}
addProduct.addEventListener("click" , AddProduct);
deleteAll.addEventListener("click", deleteAllData);
readProduct();


//======== Add Product ==========//
function AddProduct(){
    let product={
        name:name.value.toLowerCase(),
        category:category.value,
        price:price.value,
        count:count.value,
        description:description.value.toLowerCase(),
    };
    if(product.name !== "" && product.category !=="" && product.price !==""
        && product.description !=="" ){
        success.style.display="block";
        redError.style.display="none";

        if(mood==="create"){
            if(product.count>1 || product.count === ""){
                for(let i=1 ;i<=product.count;i++){
                    arProduct.push(product);
                    countError.style.display="none";

                }
            } else{
                countError.style.display="block";
                success.style.display="none";
    
                }
        }else if(mood==="update"){
            arProduct[tmp]=product;
            mood="create";
            addProduct.innerHTML ="Add Product";
            count.style.display="block";
            scroll({
                top : 0,
                behavior:'smooth',
            }                
            )
        }


        localStorage.setItem('product' , JSON.stringify(arProduct));
        clearData();
        readProduct();

    } else{
        redError.style.display="block";
        success.style.display="none";
    }

}

//======== Read Product ==========//
function readProduct(){
    for(let i=0 ; i<arProduct.length ; i++){
        // let total = arProduct[i].price*arProduct[i].count;
        createProduct.innerHTML+= `
        <tr>
            <td>${i+1}</td>
            <td>${arProduct[i].name}</td>
            <td>${arProduct[i].category}</td>
            <td>${arProduct[i].price} $</td>
            <td>${arProduct[i].description}</td>
            <td><button type="button" id="btn" onclick="deleteItem(${i})" class="btn btn-danger">Delete</button>
            </td>
            <td><button type="button" id="btn" onclick="editData(${i})" class="btn btn-warning">Edit</button></td>
        </tr>
        `
    }
    if (arProduct.length>0){
        deleteAll.style.display="block";
    } else{
        deleteAll.style.display="none";
    }
}

//======== Read Product ==========//
function editData(i){
    name.value=arProduct[i].name;
    category.value=arProduct[i].category;
    price.value=arProduct[i].price;
    description.value=arProduct[i].description;
    count.style.display="none";
    addProduct.innerHTML=`Update`;
    mood="update";
    tmp=i;

}

//======== Delete Item ==========//
function deleteItem(i){
    arProduct.splice(i,1);
    localStorage.product=JSON.stringify(arProduct);
    readProduct();
}
//======== clear data inputs  ==========//
function clearData(){
    name.value="";
    category.value="";
    price.value="";
    count.value="";
    description.value="";
}

//======== Delete all Product ==========//
function deleteAllData(){
    localStorage.clear();
    arProduct.splice(0);
    AddProduct();
}


//======== Search in Product ==========//

let moodSearch ;
function searchMood(id){
    if(id === "searchname"){
        moodSearch ="name";
        ProductSearch.placeholder="Search By Name";
    }else{
        moodSearch ="category";
        ProductSearch.placeholder="Search By Category";
    }
    ProductSearch.focus();
    ProductSearch.value="";
    readProduct();
}

function Search(value){
    if(moodSearch === "name"){
        for(let i=0 ; i<arProduct.length; i++){
            if(arProduct[i].name.includes(value)){
                createProduct.innerHTML+= `
                <tr>
                    <td>${i+1}</td>
                    <td>${arProduct[i].name}</td>
                    <td>${arProduct[i].category}</td>
                    <td>${arProduct[i].price} $</td>
                    <td>${arProduct[i].description}</td>
                    <td><button type="button" id="btn" onclick="deleteItem(${i})" class="btn btn-danger">Delete</button>
                    </td>
                    <td><button type="button" id="btn" onclick="editData(${i})" class="btn btn-warning">Edit</button></td>
                </tr>
                `
            }
        }
    }else{
        for(let i=0 ; i<arProduct.length; i++){
            if(arProduct[i].category.includes(value)){
                createProduct.innerHTML+= `
                <tr>
                    <td>${i+1}</td>
                    <td>${arProduct[i].name}</td>
                    <td>${arProduct[i].category}</td>
                    <td>${arProduct[i].price} $</td>
                    <td>${arProduct[i].description}</td>
                    <td><button type="button" id="btn" onclick="deleteItem(${i})" class="btn btn-danger">Delete</button>
                    </td>
                    <td><button type="button" id="btn" onclick="editData(${i})" class="btn btn-warning">Edit</button></td>
                </tr>
                `
            }
        }
    }
}