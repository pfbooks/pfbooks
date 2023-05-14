const axios = require('axios');
const { Book } = require('../db');

const defaultDescription = "The story of Captain Ahab's self-destructive obsession with the white whale called Moby Dick. It is told through the narration of Ishmael, a sailor new to Ahab's ship, the Pequod. The plot of the novel follows Ahab's manic drive to kill the whale, even as it endangers his crew."
const defaultCover = "https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg"


const loadDataFromApi = async () => {
    const booksDB = await Book.findAll()
    if(booksDB.length > 100) return console.log("Database successfully loaded")
    
    for (let page = 1; page <= 4; page ++) {
        axios.get(`https://gutendex.com/books/?page=${page}`)
            .then(response => {
                const mappedResult = response.data.results.map(mapBookFromApi)
                Book.bulkCreate(mappedResult)
                    .then(() => console.log("Database successfully loaded"))
                    .catch((err) => console.log("Error loading books into database : ", err.message))
            })
    }

};


function mapBookFromApi(book) {
    const mapped = {
        id : book.id,
        title : book.title,
        author: book.authors[0] ? book.authors[0].name : "Not known",
        price: 10 + Math.ceil(1 + Math.random() * 200),
        image: book.formats["image/jpeg"] ? book.formats["image/jpeg"] : defaultCover,
        genre: book.bookshelves.length>0 ? book.bookshelves : ["Classics"],
        rating: Math.ceil(Math.random() * 5),
        stock: Math.ceil(1 + Math.random() * 800),
        description: defaultDescription
    }
    return mapped
};

module.exports = loadDataFromApi;