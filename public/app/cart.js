const addToCart = (
  shopId,
  productId,
  productPrice,
  productName,
  productImage
) => {
  let order = localStorage.getItem("order");
  order = JSON.parse(order);

  if (order) {
    // check if it is the same shop
    if (+shopId !== +order.shopId) {
      alert(
        "You can only buy fish from the same shop. Empty cart below to start shopping in this shop."
      );
    }

    const orderItems = order.orderItems;
    if (orderItems && orderItems.length) {
      // check if this product is already in the cart
      let itemIndex = 0;
      let inCart = false;
      for (const item of orderItems) {
        if (item.productId === productId) {
          inCart = true;
          break;
        }
        itemIndex++;
      }
      if (inCart) {
        // update orderItem quantity and total
        order.orderItems[itemIndex].quantity =
          +order.orderItems[itemIndex].quantity + 1;
        order.orderItems[itemIndex].total =
          +order.orderItems[itemIndex].total + +productPrice;
        // update order total
        order.total = +order.total + +productPrice;
      } else {
        // insert new orderItem
        order.orderItems.push({
          productId,
          productPrice,
          productName,
          productImage,
          quantity: 1,
          total: productPrice,
        });
        order.total = +order.total + +productPrice;
      }
    } else {
      // create order Items
      order.orderItems = [];
      // insert new orderItem
      order.orderItems.push({
        productId,
        productPrice,
        productName,
        productImage,
        quantity: 1,
        total: productPrice,
      });
    }
  } else {
    // create order
    order = {
      shopId,
      total: productPrice,
      orderItems: [
        {
          productId,
          productPrice,
          productName,
          productImage,
          quantity: 1,
          total: productPrice,
        },
      ],
    };
  }
  order = JSON.stringify(order);
  localStorage.setItem("order", order);

  updateCartUI();

  alert(
    `1Kg of ${productName} has been added to cart. Click on the checkout link to checkout or continue shopping from the same shop.`
  );
};

const updateCartUI = () => {
  let order = localStorage.getItem("order");
  order = JSON.parse(order);

  let cartTotal = 0;
  let cartItemsCount = 0;
  if (order) {
    cartTotal = order.total;
    cartItemsCount = (order.orderItems && order.orderItems.length) || 0;
  }
  $(".order-total").text(cartTotal);
  $(".cart-items-count").text(cartItemsCount);
};

const emptyCart = () => {
  localStorage.removeItem("order");
  updateCartUI();
};

const updateCart = (productId, action) => {
  let order = localStorage.getItem("order");
  order = JSON.parse(order);

  if (order && order.orderItems && order.orderItems.length) {
    const orderItems = order.orderItems;

    let itemIndex = 0;
    let inCart = false;
    for (const item of orderItems) {
      if (+item.productId === +productId) {
        inCart = true;
        break;
      }
      itemIndex++;
    }
    if (inCart) {
      const productPrice = order.orderItems[itemIndex].productPrice;
      if (action === "increment") {
        // update orderItem quantity and total
        order.orderItems[itemIndex].quantity =
          +order.orderItems[itemIndex].quantity + 1;
        order.orderItems[itemIndex].total =
          +order.orderItems[itemIndex].total + +productPrice;
        // update order total
        order.total = +order.total + +productPrice;
      } else if (action === "decrement") {
        // update orderItem quantity and total
        order.orderItems[itemIndex].quantity =
          +order.orderItems[itemIndex].quantity - 1;
        order.orderItems[itemIndex].total =
          +order.orderItems[itemIndex].total - +productPrice;
        // update order total
        order.total = +order.total - +productPrice;
      } else if (action === "remove") {
        // update order total
        order.total = +order.total - +order.orderItems[itemIndex].total;
        order.orderItems.splice(itemIndex, 1);
      }
      localStorage.setItem("order", JSON.stringify(order));
      updateCartUI();
    }
  }
};
