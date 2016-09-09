"use strict";
$(document).ready(function(){

  let dropDown = $(".category-selector");
  let output = $(".output");
  let categories, types, products;

  let getCategories = function(){
    return new Promise( (resolve, reject) => {
      $.ajax({
        url: "assets/categories.json"
      }).done(function(result) {
        resolve(result.categories);       //resolve the data//
      }).fail(function(error) {   //reject the data/throw error//
        reject(error);

      });
    })
  }

let getTypes = function(){
    return new Promise( (resolve, reject) => {
      $.ajax({
        url: "assets/types.json"
      }).done(function(result) {
        resolve(result.types);       //resolve the data//
      }).fail(function(error) {   //reject the data/throw error//
        reject(error);

      });
    })
  }

  let getProducts = function(){
    return new Promise( (resolve, reject) => {
      $.ajax({
        url: "assets/products.json"
      }).done(function(result) {
        resolve(result.products);       //resolve the data//
      }).fail(function(error) {   //reject the data/throw error//
        reject(error);

      });
    })
  }

  let getInventory = function(id){
    // console.log(id);
    getCategories()
    .then(function(returnedCategories) {
      categories = returnedCategories;
      return getTypes();
    })
    .then(function(returnedTypes){
      types = (returnedTypes);
      return getProducts();
    })
    .then(function(returnedProducts){
      products = returnedProducts;
    })
    .then(function() {
      filterCategories(id)
      // console.log("categories ", categories);
      // console.log("types ", types);
      // console.log("products ", products);
    });
  };

   let populateDropDown = function(dropDownCategories){
      for(var key in dropDownCategories){
      let option = `<option class="options" id="${dropDownCategories[key].id}">${dropDownCategories[key].name}</option>`;
    dropDown.append(option)
      };
   };
    getCategories()
    .then(function(dropDownCategories) {
      populateDropDown(dropDownCategories)
      loadEventListeners();
    });


    let loadEventListeners = function(){
      dropDown.change(function(event) {
        getInventory(Number($(this).children(":selected")[0].id));

        // getInventory();
      })
    }

    let filterCategories = function(id) {
      for(var key in categories) {
        console.log(categories[key])
        if(categories[key].id === id) {
          filterTypes(id, categories[key].name);
        };
      };
    };

    let filterTypes = function(id, name) {
      let typesArray = [];
      console.log("filter names ", name)
      for(var key in types) {
        if(types[key].category === id) {
          let currentTypeObject = {
            categoryName: name,
            typeName: types[key].name,
            typeDescription: types[key].description,
            productType: types[key].id
          };
            typesArray.push(currentTypeObject)
        };
      }
      filterProducts(typesArray);
    };

    let filterProducts = function(typesArray) {
      let productsArray = [];
      for(var type in typesArray){
        for(var key in products) {
          for(var obj in products[key]) {
            if (typesArray[type].productType === products[key][obj].type) {
              let currentProductObject = {
                categoryName: typesArray[type].categoryName,
                typeName: typesArray[type].typeName,
                typeDescription: typesArray[type].typeDescription,
                productName: products[key][obj].name,
                productDescription: products[key][obj].description
              };
              productsArray.push(currentProductObject);
            }
          }
        }
      }
      populateDom(productsArray);
    };

    let populateDom = function(productsArray) {
      output.html("")
      for(var product in productsArray) {
        output.append(
        `<tr>
        <td>${productsArray[product].categoryName}</td>
        <td>${productsArray[product].typeName}</td
        <td>${productsArray[product].productName}</td>
        <td>${productsArray[product].productDescription}</td>
        </tr>`

        )
      }

    }

});












