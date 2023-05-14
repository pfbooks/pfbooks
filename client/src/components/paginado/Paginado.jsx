import styles from './Paginado.module.css'
const Paginado = ({handlePageChange, size, currentPage}) =>{
    const totalPages = Math.ceil(size)
    


    return (
            <div>
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </button>
    </div>

    )

}

export default Paginado;


