const sum = (category: string, data: any[]) => {
  const result = data.reduce((total, el) => {
    return total + Number(el[category]);
  }, 0);

  return String(result);
};

const sumTotalPrice = (data: any[]) => {
  const result = data.reduce((total, el) => {
    return total + Number(el.Quantity) * Number(el.UnitPrice);
  }, 0);

  return "$" + result.toFixed(2);
};

const sumTotalDiscount = (data: any[]) => {
  const result = data.reduce((total, el) => {
    return (
      total + Number(el.Quantity) * Number(el.UnitPrice) * Number(el.Discount)
    );
  }, 0);

  return result === 0 ? "$0.00" : "$" + result.toFixed(2);
};

const preparedOrderProducts = (data: {}[]) => {
  return data.map((product: any) => {
    return {
      orderDetailsID: product.ID,
      OrderID: product.OrderID,
      ProductID: product.ProductID,
      UnitPrice: product.UnitPrice,
      Quantity: product.Quantity,
      Discount: product.Discount,
      ProductName: product.ProductName,
    };
  });
};

export const getPreparedDataOrder = (data: any) => {
  const [order] = data;
  const orderDetails = order.orderDetails.map((orderDetail: any, idx: number) => ({
    ...orderDetail,
    ProductName: order?.products[idx].ProductName,
  }))

  return {
    data: {
      OrderID: order?.orders?.OrderID,
      CustomerID: order?.orders?.CustomerID,
      EmployeeID: order?.orders?.EmployeeID,
      ShipName: order?.orders?.ShipName,
      TotalProducts: String(order?.products.length),
      TotalQuantity: orderDetails
        ? sum("Quantity", orderDetails)
        : "",
      TotalPrice: orderDetails ? sumTotalPrice(order?.orderDetails) : "",
      TotalDiscount: orderDetails
        ? sumTotalDiscount(orderDetails)
        : "$0.00",
      ShipVia: order?.shippers.CompanyName,
      Freight: "$" + order?.orders?.Freight,
      OrderDate: order?.orders?.OrderDate.split(" ")[0],
      RequiredDate: order?.orders?.RequiredDate.split(" ")[0],
      ShippedDate: order?.orders?.ShippedDate.split(" ")[0],
      ShipCity: order?.orders?.ShipCity,
      ShipRegion: "",
      ShipPostalCode: order?.orders?.ShipPostalCode,
      ShipCountry: order?.orders?.ShipCountry,
    },

    orderProducts: orderDetails
      ? preparedOrderProducts(orderDetails)
      : [],
  };
};
  
export const getPreparedAllOrders = (data: any) => {
  return data.map((order: any) => {

    return {
      OrderID: order.orders.OrderID,
      TotalPrice: order?.orderDetails ? sumTotalPrice(order?.orderDetails) : "",
      TotalProducts: String(order?.orderDetails.length),
      Quantity: order?.orderDetails ? sum("Quantity", order?.orderDetails) : "",
      OrderDate: order.orders.OrderDate,
      ShipName: order.orders.ShipName,
      ShipCity: order.orders.ShipCity,
      ShipCountry: order.orders.ShipCountry,
    };
  });
};