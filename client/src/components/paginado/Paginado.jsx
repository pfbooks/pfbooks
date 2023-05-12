const Paginado = ({handlePageChange, size}) =>{
    const pageNumers = [];

    for(let i=1; i<= Math.ceil(size); i++){
        pageNumers.push(i)
    }
    return (
        <nav>
            
            <ul>
                {pageNumers && pageNumers.map(number =>(
  
                    <li   key= {number}>
                        <button  onClick={() => handlePageChange(number)}> {number}</button>
                    </li>
                    
                ))}
            </ul>
        </nav>
    )

}

export default Paginado;