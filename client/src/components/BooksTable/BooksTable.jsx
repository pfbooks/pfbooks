import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBooksAdmin, updateBook, createBook, bookAvailable } from "../../redux/actions/actions";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import styles from "./BookTable.module.css";

const BooksTable = () => {
  const books = useSelector((state) => state.booksAdmin);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    author: "",
    price: 0,
    rating: 0,
    genre: [],
    stock: 0,
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "genre") {
      const genreArray = value.split(",").map((item) => item.trim());
      setFormData((prevData) => ({
        ...prevData,
        [name]: genreArray,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const newBook = {
      image: formData.image,
      title: formData.title,
      author: formData.author,
      price: formData.price,
      rating: formData.rating,
      genre: formData.genre,
      stock: formData.stock,
      description: formData.description,
    };
    dispatch(createBook(newBook));
    handleClose();
  };

  useEffect(() => {
    dispatch(allBooksAdmin());
  }, [dispatch]);

  const handleClick = (book) => {
    const updatedBook = {
      ...book,
      genre:
        typeof book.genre === "string"
          ? book.genre.split(",").map((item) => item.trim())
          : book.genre,
    };
    dispatch(updateBook(updatedBook));
    alert("Libro editado con éxito");
    dispatch(allBooksAdmin());
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCheckbox = (event, book) => {
    console.log(event.target.checked)
    console.log(book)
    console.log(event.target.value)

    let value;
    if(event.target.checked) value = false
    else value = true
    dispatch(bookAvailable(book.id, value))
    dispatch(allBooksAdmin())
}

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <button className={styles.saveButton} onClick={() => handleClick(params.row)}>Save</button>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      editable: true,
      renderCell: (params) => (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={params.value}
            alt="Book Cover"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ),
      width: 100,
    },
    { field: "id", headerName: "ID", editable: true, width: 70 },
    { field: "title", headerName: "Title", editable: true, width: 250 },
    { field: "author", headerName: "Author", editable: true, width: 200 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 90,
      editable: true,
      renderCell: (params) => <div>$ {params.value}</div>,
    },
    { field: "rating", headerName: "Rating", type: "number", editable: true, width: 70 },
    { field: "genre", headerName: "Genre", editable: true, width: 240 },
    { field: 'available', headerName: 'Available', type: "boolean", width: 120, renderCell: (params) => (
      <input type='checkbox' checked={params.row.availability} onChange={(event) => handleCheckbox(event, params.row)} value={params.row.title}/>
  ) }
  ];

  const getRowHeight = () => {
    const imageHeight = 50;
    const padding = 20;
    return imageHeight + padding;
  };

  return (
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
      <button
        onClick={handleOpen}
        className={`${styles.button} ${styles.addButton}`}
      >
        Agregar libro
      </button>
      </div>
      <DataGrid
        rows={books}
        columns={columns}
        getRowHeight={getRowHeight}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar nuevo libro</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Author"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price"
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Stock"
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="Rating"
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                placeholder="Genre"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <button className={styles.button} onClick={handleClose}>Cancelar</button>
          <button className={styles.button} onClick={handleSave} >
            Guardar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BooksTable;
