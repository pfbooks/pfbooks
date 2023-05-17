const setPreference = () => {

    const libros = [
      {
        id: 158,
        title: "Emma",
        author: "Austen, Jane",
        price: 174,
        image:
          "https://www.gutenberg.org/cache/epub/158/pg158.cover.medium.jpg",
        genre: ["Classics"],
        rating: 4,
        stock: 104,
        description:
          "The story of Captain Ahab's self-destructive obsession with the white whale called Moby Dick. It is told through the narration of Ishmael, a sailor new to Ahab's ship, the Pequod. The plot of the novel follows Ahab's manic drive to kill the whale, even as it endangers his crew.",
      },
      {
        id: 28054,
        title: "The Brothers Karamazov",
        author: "Dostoyevsky, Fyodor",
        price: 102,
        image:
          "https://www.gutenberg.org/cache/epub/28054/pg28054.cover.medium.jpg",
        genre: ["Best Books Ever Listings"],
        rating: 2,
        stock: 294,
        description:
          "The story of Captain Ahab's self-destructive obsession with the white whale called Moby Dick. It is told through the narration of Ishmael, a sailor new to Ahab's ship, the Pequod. The plot of the novel follows Ahab's manic drive to kill the whale, even as it endangers his crew.",
      },
      {
        id: 46,
        title: "A Christmas Carol in Prose; Being a Ghost Story of Christmas",
        author: "Dickens, Charles",
        price: 53,
        image: "https://www.gutenberg.org/cache/epub/46/pg46.cover.medium.jpg",
        genre: ["Children's Literature", "Christmas"],
        rating: 4,
        stock: 251,
        description:
          "The story of Captain Ahab's self-destructive obsession with the white whale called Moby Dick. It is told through the narration of Ishmael, a sailor new to Ahab's ship, the Pequod. The plot of the novel follows Ahab's manic drive to kill the whale, even as it endangers his crew.",
      },
    ];
    const user = {
        id: 1,
        name: "John",
        lastname: "Doe",
        email: "ejemplo@algo.com"
    };

    let preference = {
      items: [
        {
          id: 158,
          title: "Emma",
          author: "Austen, Jane",
          price: 174,
          image:
            "https://www.gutenberg.org/cache/epub/158/pg158.cover.medium.jpg",
          genre: ["Classics"],
          rating: 4,
          stock: 104,
          description:
            "The story of Captain Ahab's self-destructive obsession with the white whale called Moby Dick. It is told through the narration of Ishmael, a sailor new to Ahab's ship, the Pequod. The plot of the novel follows Ahab's manic drive to kill the whale, even as it endangers his crew.",
        },
      ],
      payer: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
      back_urls: {
        success: "http://localhost:3000/feedback",
        failure: "http://localhost:3000/feedback",
        pending: "http://localhost:3000/feedback",
      },
      auto_return: "approved",
    };

    return preference;
};

module.exports = setPreference;