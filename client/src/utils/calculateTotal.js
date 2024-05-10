const calculateTotal = (cart) => {
    let total = 0;
    cart.forEach((product) => {
      total += product.unit_price * product.quantity;
    });
    return total;
};

export default calculateTotal;
