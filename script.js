document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelector(".products");

  async function fetchProducts(url) {
    try {
      let data = await fetch(url);
      let res = await data.json();
      console.log(res.products);

      for (let i = 0; i < res.products.length; i++) {
        discountedPrice =
          res.products[i].price -
          (res.products[i].price * res.products[i].discountPercentage) / 100;

        let des = res.products[i].description;

        products.innerHTML += `
            <div class="product">
                <img src="${
                  res.products[i].images[0]
                }" alt="" class="product_img">
                <h2 class="product-title">${res.products[i].title}</h2>
                <h4 class="product-rating"> rating ${
                  res.products[i].rating
                }</h4>
                <div class="product-price-container">
                    <h3 class="product-price"> Price ${
                      "$" + discountedPrice
                    }</h3>
                </div>
                <button type="button" class="btn btn-primary btn-lg toggleBtn">Show Description</button>
                <p class="product-desc">${
                  des.length > 80 ? des.substring(0, 80).concat("...more") : des
                }</p> 
               
            </div>`;
      }

      let descp = document.querySelectorAll(".product-desc");
      let toggleBtn = document.querySelectorAll(".toggleBtn");

      for (let i = 0; i < descp.length; i++) {
        descp[i].style.display = "none";
      }

      for (let i = 0; i < toggleBtn.length; i++) {
        toggleBtn[i].addEventListener("click", function (e) {
          if (descp[i].style.display === "none") {
            descp[i].style.display = "block";
            toggleBtn[i].innerHTML = "Hide Description";
          } else {
            descp[i].style.display = "none";
            toggleBtn[i].innerHTML = "show Description";
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  fetchProducts(`https://dummyjson.com/products?limit=15`);
});
