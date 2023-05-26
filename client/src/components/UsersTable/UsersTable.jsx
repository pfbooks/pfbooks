import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUser, userDisablement } from "../../redux/actions/actions"
import { DataGrid } from "@mui/x-data-grid"


const UsersTable = () => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getAllUser())
    }, [dispatch])
    
    const users = useSelector((state) => state.users)
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
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'lastName', headerName: 'LastName', width: 240 },
        { field: 'email', headerName: 'Email', width: 160 },
        { field: 'adminRole', headerName: 'Admin', width: 100},
        { field: 'isActive', headerName: 'IsActive', type: "boolean", width: 100, renderCell: () => (
            <input type='checkbox'/>
        ) }
      ];
    
    const getRowHeight = (params) => {
        
        const imageHeight = 50; 
        const padding = 20; 
        return imageHeight + padding;
      };

    return(
        <div>
            <DataGrid 
                rows={users}
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

export default UsersTable