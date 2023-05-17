import CardPayment from "./CardPayment";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
const Payment = () => {
    const libros = [
      {
		"id": 158,
		"title": "Emma",
		"author": "Austen, Jane",
		"price": 174,
		"image": "https://www.gutenberg.org/cache/epub/158/pg158.cover.medium.jpg",
		"genre": [
			"Classics"
		],
		"rating": 4,
		"stock": 104,
		"description": "The story of Captain Ahab's self-destructive obsession with the white whale called Moby Dick. It is told through the narration of Ishmael, a sailor new to Ahab's ship, the Pequod. The plot of the novel follows Ahab's manic drive to kill the whale, even as it endangers his crew."
	},
	{
		"id": 28054,
		"title": "The Brothers Karamazov",
		"author": "Dostoyevsky, Fyodor",
		"price": 102,
		"image": "https://www.gutenberg.org/cache/epub/28054/pg28054.cover.medium.jpg",
		"genre": [
			"Best Books Ever Listings"
		],
		"rating": 2,
		"stock": 294,
		"description": "The story of Captain Ahab's self-destructive obsession with the white whale called Moby Dick. It is told through the narration of Ishmael, a sailor new to Ahab's ship, the Pequod. The plot of the novel follows Ahab's manic drive to kill the whale, even as it endangers his crew."
	},
	{
		"id": 46,
		"title": "A Christmas Carol in Prose; Being a Ghost Story of Christmas",
		"author": "Dickens, Charles",
		"price": 53,
		"image": "https://www.gutenberg.org/cache/epub/46/pg46.cover.medium.jpg",
		"genre": [
			"Children's Literature",
			"Christmas"
		],
		"rating": 4,
		"stock": 251,
		"description": "The story of Captain Ahab's self-destructive obsession with the white whale called Moby Dick. It is told through the narration of Ishmael, a sailor new to Ahab's ship, the Pequod. The plot of the novel follows Ahab's manic drive to kill the whale, even as it endangers his crew."
	},
    ];
    
    initMercadoPago("TEST-75896b1c-2143-43c1-82c4-274c670747f1");

  return (
    <>
      <h1>Vista de Pagos</h1>
      {libros.map((book) => {
        return (
          <CardPayment
            key={book.id}
            id={book.id}
            title={book.title}
            image={book.image}
            price={book.price}
            rating={book.rating}
          />
        );
      })}
      <div id="wallet_container">
        <Wallet initialization={{ preferenceId: "wallet_container" }} />
      </div>
    </>
  );
};

export default Payment;