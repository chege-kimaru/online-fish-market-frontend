$(document).ready(() => {
  getShops();
});

const shopTemplate = (shop) => {
  const addProduct = `<a href="add-product?shopId=${shop.id}" data-text="Add Product" class="but-hover1 item_add">Add Product</a>`;
  return `
            <div class="col-sm-4 item-grid item-gr  simpleCart_shelfItem">
                <div class="grid-pro">
                    <div class=" grid-product" style="width: 100%">
                        <figure>
                            <a href="products?shopId=${shop.id}">
                                <div class="grid-img">
                                    <img src="${
                                      shop.imageUrl
                                    }" class="img-responsive" alt="">
                                </div>
                                <div class="grid-img">
                                    <img src="${
                                      shop.imageUrl
                                    }" class="img-responsive" alt="">
                                </div>
                            </a>
                        </figure>
                    </div>
                    <div class="women">
                        <a href="#"><img src="images/ll.png" alt=""></a>
                        <h6><a href="products?shopId=${shop.id}">${
    shop.name
  }</a></h6>
                        <h6><a href="products?shopId=${shop.id}">${
    shop.description
  }</a></h6>
                        <p><em class="item_price">${shop.county} | ${
    shop.location
  }</em></p>
                        <a href="products?shopId=${
                          shop.id
                        }" data-text="View Shop" class="but-hover1 item_add">View Shop</a>
                        ${SHOPS_URL === "shops/seller" ? addProduct : ""}
                    </div>
                </div>
            </div>
        `;
};

const getShops = async () => {
  try {
    const res = await axios.get(SHOPS_URL);
    const shops = res.data;

    const shopsContainer = $("#shops-container");
    shops.forEach((shop) => {
      shopsContainer.prepend(shopTemplate(shop));
    });
  } catch (e) {
    console.error(e);
    alert("Could not get data.");
  }
};
