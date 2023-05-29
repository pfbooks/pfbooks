import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { allAuthors, allBooks, allGenre, filterBooks } from "../../redux/actions/actions";
import styles from './Filters.module.css';

const Filters = ({ handlePageChange }) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const genres = useSelector((state) => state.genres);
  const authors = useSelector((state) => state.authors);
  const [order, setOrder] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [gen, setGen] = useState([]);
  const [aut, setAut] = useState([]);

  useEffect(() => {
    setGen(genres)
    setAut(authors)

  }, [genres, authors]);

  useEffect(() => {
    dispatch(allBooks());
    dispatch(allGenre());
    dispatch(allAuthors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterBooks(genre, author));
  }, [dispatch, genre, author]);

  const handleFilter = (event) => {
    if (event.target.name === 'genre' && event.target.value !== 'All') {
      setGenre(event.target.value);
      let arr = books?.filter(book => book.genre.includes(event.target.value))
      let newAut = arr.map(book => book.author)
      const uniqueAut = newAut.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      setAut(uniqueAut);
    }
    if (event.target.name === 'author' && event.target.value !== 'All') {
      setAuthor(event.target.value);
      let arr = books?.filter(book => book.author.includes(event.target.value))
      let newGen = arr.map(book => book.genre)
      let flatGen = newGen.flat()
      const uniqueGens = flatGen.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });      
      setGen(uniqueGens);
    }
    setOrder(event.target.value + order);
    handlePageChange(1);
  };

  const handleAllBooks = () => {
    dispatch(allBooks());
    setAut(authors)
    setGen(genres)
    setGenre('');
    setAuthor('');
  };

  return (
    <div>
      <select className={styles.selectFilters} onChange={handleFilter} name='genre' value={genre}>
        <option value="">By genre</option>
        {gen?.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <select className={styles.selectFilters} onChange={handleFilter} name='author' value={author}>
        <option value="">By author</option>
        {aut?.map(author => (
          <option key={author} value={author}>{author}</option>
        ))}
      </select>

      <button className={styles.buttonBooks} onClick={handleAllBooks}>All books</button>
    </div>
  );
};

export default Filters;
