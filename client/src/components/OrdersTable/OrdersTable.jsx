import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { allOrders } from '../../redux/actions/actions';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const OrdersTable = () => {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders)
  const handleClick = (order) => {
    console.log(order)
  }; 

  useEffect(()=>{
    dispatch(allOrders())
  }, [dispatch])
  
  // Obtener una lista de todos los libros y su cantidad en cada orden
  const getBooksData = (order) => {
    return order.Books.map(book => <p key={book.id}><strong>{book.title}:</strong> {book.BookOrder.quantity}</p>);
  }

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 90 },
    {
      field: 'amount',
      headerName: 'Price',
      width: 150,
      renderCell: (params) => <div>$ {params.value}</div>,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
    },
    {
      field: 'User',
      headerName: 'User name',
      width: 150,
      renderCell: (params) => (
        <p>{params.row.User.name + params.row.User.lastName}</p>
      )
    },
    {
      field: 'email',
      headerName: 'User email',
      width: 250,
      renderCell: (params) => (
        <p>{params.row.User.email}</p>
      )
    },
    {
      field: 'books',
      headerName: 'Books & quantity',
      width: 350,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
          {getBooksData(params.row)}
        </Box>
      ),
    }
  ];

  return (
    <div style={{height: "100%", width: "95%", marginLeft: "64px"}} >
      <DataGrid
        rows={orders}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
  </div>
  );
}

export default OrdersTable;
