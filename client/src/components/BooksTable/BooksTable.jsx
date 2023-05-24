import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allBooks } from "../../redux/actions/actions";
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    {
        field: "image",
        headerName: "Image",
        renderCell: (params) => (
            <div style={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden' }}>
                <img src={params.value} alt="Book Cover" style={{ width: '100%', height: '100%' }} />
            </div>
        ),
        width: 100,
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'author', headerName: 'Author', editable: true , width: 240 },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 90,
        renderCell: (params) => (
          <div>
            $ {params.value}
          </div>
        ),
      },
    { field: 'rating', headerName: 'Rating', type: 'number', width: 160 },
    { field: 'genre', headerName: 'Genre', width: 200}
  ];

const BooksTable = (props) => {
    const books = useSelector((state) => state.books);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(allBooks())
    }, [allBooks])

    const getRowHeight = (params) => {
        
        const imageHeight = 50; 
        const padding = 20; 
        return imageHeight + padding;
      };

    return(
        <div style={{ height: '100%', width: '100%' }}>
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
            />
        </div>
    )
}

export default BooksTable