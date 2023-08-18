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
      orderDetailsID: product.orderDetailsId,
      OrderID: product.OrderID,
      ProductID: product.ProductID,
      UnitPrice: product.UnitPrice,
      Quantity: product.Quantity,
      Discount: product.Discount,
      ProductName: product.Product.ProductName,
    };
  });
};

export const getPreparedDataOrder = (data: any) => {
  return {
    data: {
      OrderID: data?.OrderID,
      CustomerID: data?.CustomerID,
      EmployeeID: data?.EmployeeID,
      ShipName: data?.ShipName,
      TotalProducts: String(data?.orderDetails.length),
      TotalQuantity: data?.orderDetails
        ? sum("Quantity", data?.orderDetails)
        : "",
      TotalPrice: data?.orderDetails ? sumTotalPrice(data?.orderDetails) : "",
      TotalDiscount: data?.orderDetails
        ? sumTotalDiscount(data?.orderDetails)
        : "$0.00",
      ShipVia: data?.shippers.CompanyName,
      Freight: "$" + data?.Freight,
      OrderDate: data?.OrderDate.split(" ")[0],
      RequiredDate: data?.RequiredDate.split(" ")[0],
      ShippedDate: data?.ShippedDate.split(" ")[0],
      ShipCity: data?.ShipCity,
      ShipRegion: "",
      ShipPostalCode: data?.ShipPostalCode,
      ShipCountry: data?.ShipCountry,
    },

    orderProducts: data?.orderDetails
      ? preparedOrderProducts(data.orderDetails)
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