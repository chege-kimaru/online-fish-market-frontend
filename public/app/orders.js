const getOrders = async () => {
  try {
    const res = await axios.get(`orders/${ORDER_TYPE}`);
    const orders = res.data;
    for (const order of orders) {
      $(".orders-container").append(orderTemplate(order));
    }
  } catch (e) {
    throw e;
  }
};

const orderTemplate = (order) => {
  const deliverButton = `<td><button onclick="deliver('${order.id}')" class="btn btn-warning">Deliver</button></td>`;
  return `
        <tr>
            <td>${order.createdAt}</td>
            <td>${order.buyer.name}</td>
            <td>${order.seller.name}</td>
            <td>${order.shop.name}</td>
            <td>${order.shop.location}</td>
            <td>
                ${orderItemsTemplate(order.orderItems)}
            </td>
            <td>KES ${order.total}</td>
            <td>${order.status}</td>
            ${
              ORDER_TYPE === "seller" && order.status === "pending"
                ? deliverButton
                : ""
            }
        </tr>
    `;
};

const orderItemsTemplate = (orderItems) => {
  let html = `<ol>`;
  for (const item of orderItems) {
    html += `<li>${item.product.name} KES ${item.product.price} (${item.quantity})</li>`;
  }
  html += "</ol>";
  return html;
};

const deliver = async (orderId) => {
  try {
    if (confirm("Are you sure you want to mark this order as delivered?")) {
      await axios.post(`orders/${orderId}/deliver`, {});
      location.href = location.href;
    }
  } catch (e) {
    alert("Could not mark as delivered. Please try again.");
    throw e;
  }
};

$(document).ready(() => {
  getOrders();
});
