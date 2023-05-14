import styles from './Paginado.module.css';

const Paginado = ({ handlePageChange, size, currentPage }) => {
  const totalPages = Math.ceil(size);

  return (
    <div className={styles['paginado-container']}>
      <button
        className={currentPage === 1 ? styles['disabled'] : ''}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>
      <button
        className={currentPage === 1 ? styles['disabled'] : ''}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      <span className={styles.textContainer}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={currentPage === totalPages ? styles['disabled'] : ''}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
      <button
        className={currentPage === totalPages ? styles['disabled'] : ''}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Paginado;

