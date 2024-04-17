const { Order, User, BookOrder, Book} = require("../db");
const sendEmail = require("../emailNotifications/emailNotification");
const path = require("path");
const fs = require("fs");

const addNewOrder = async (books, userId) => {
  try {

    const quantity = books.reduce((acc, book) => acc + book.quantity, 0);
    let monto = 0;

    books.forEach((book) => {
      monto += book.quantity * book.unit_price;
    });
    
    const user = await User.findByPk(userId);
    
    const newOrder = await Order.create({
      amount: monto,
      quantity: quantity,
    });

    await user.addOrder(newOrder);

    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      await BookOrder.create({
        OrderId: newOrder.id,
        BookId: book.id,
        quantity: book.quantity,
      });
    }
    const fullOrder = await Order.findOne({
      where : {
        id : newOrder.id
      },
      include : [
        {
          model: User
        },
        {
          model: Book,
          through: {
            model: BookOrder, attributes: ['quantity']
          }
        }
      ]
    })
    sendEmailPurchaseNotification(fullOrder);
    return newOrder;
  } catch (error) {
    console.log(error);
  }
};

function sendEmailPurchaseNotification(order) {
  const emailTemplatePath = path.resolve('src/emailTemplate/payment-template.html')
  fs.readFile(emailTemplatePath, 'utf-8', (err,template) =>{
    const emailSubject = `Confirmacion de Orden de Compra #${order.id}`;
    sendEmail(
        order.User.email,
        emailSubject,
        fillEmailTemplate(template,order));
  })
}

function fillEmailTemplate(template,order){



  let htmlOrderTable = "<table style='border:1px solid #04ab77; width:100%'>" +
      "  <tr style='border:1px solid #04ab77'>" +
      "    <th style='border:1px solid #04ab77'>Libro</th>" +
      "    <th style='border:1px solid #04ab77'>Precio Unitario</th>" +
      "    <th style='border:1px solid #04ab77'>Cantidad</th>" +
      "    <th style='border:1px solid #04ab77'>Precio Total</th>" +
      "  </tr>"
  order.Books.forEach(book => {
    let row = "<tr style='border:1px solid #04ab77'>"
    row += `<th style='border:1px solid #04ab77'>${book.title}</th>`
    row += `<th style='border:1px solid #04ab77'>$${book.price}</th>`
    row += `<th style='border:1px solid #04ab77'>${book.BookOrder.quantity}</th>`
    row += `<th style='border:1px solid #04ab77'>$${book.BookOrder.quantity * book.price}</th>`
    htmlOrderTable += row
  })
  htmlOrderTable += "</table>"

  template = template.replaceAll("${books}", htmlOrderTable)
  template = template.replaceAll("${userName}",order.User.name)
  const totalAmount = order.Books.reduce((total, book) => {
    return total + book.price * book.BookOrder.quantity
  }, 0)
  template = template.replaceAll("${orderAmount}", totalAmount);
  template = template.replaceAll("${orderId}", order.id);

  return template
}

module.exports = addNewOrder;