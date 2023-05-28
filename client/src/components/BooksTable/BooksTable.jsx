import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allBooks } from "../../redux/actions/actions";
import { DataGrid } from '@mui/x-data-grid';



const BooksTable = (props) => {
    const columns = [
        {
            field: "image",
            headerName: "Image", editable: true, 
            renderCell: (params) => (
                <div style={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden' }}>
                    <img src={params.value} alt="Book Cover" style={{ width: '100%', height: '100%' }} />
                </div>
            ),
            width: 100,
        },
        { field: 'id', headerName: 'ID', editable: true , width: 70 },
        { field: 'title', headerName: 'Title', editable: true , width: 300 },
        { field: 'author', headerName: 'Author', editable: true , width: 240 },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 90,
            editable: true,
            renderCell: (params) => (
              <div>
                $ {params.value}
              </div>
            ),
          },
        { field: 'rating', headerName: 'Rating', type: 'number', editable: true , width: 160 },
        { field: 'genre', headerName: 'Genre', editable: true , width: 200},
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => (
                <button onClick={() => console.log(params.row)}>
                    Save
                </button>
            ),
        },
      ];
    const books = useSelector((state) => state.books);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(allBooks())
    }, [dispatch])

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