import { useEffect, } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUser, userDisablement } from "../../redux/actions/actions"
import { DataGrid } from "@mui/x-data-grid"


const UsersTable = () => {
    const dispatch = useDispatch()

    const handleCheckbox = (event, user) => {
        console.log(event.target.checked)
        console.log(user)
        console.log(event.target.value)

        let value;
        if(event.target.checked) value = false
        else value = true
        dispatch(userDisablement(user.id, value))
        dispatch(getAllUser())

    }
    
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
        { field: 'isActive', headerName: 'IsActive', type: "boolean", width: 100, renderCell: (params) => (
            <input type='checkbox' checked={params.row.isActive} onChange={(event) => handleCheckbox(event, params.row)} value={params.row.name}/>
        ) }
      ];
    
    const getRowHeight = (params) => {
        
        const imageHeight = 50; 
        const padding = 20; 
        return imageHeight + padding;
      };

    return (
      <div style={{ height: "100%", width: "100%", marginLeft: "64px" }}>
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
          disableRowSelectionOnClick
        />
      </div>
    );
}

export default UsersTable