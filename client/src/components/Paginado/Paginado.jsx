import styles from './Paginado.module.css';

const Paginado = ({ handlePageChange, size, currentPage }) => {
  const totalPages = Math.ceil(size);

  return (
    <div className={styles.paginadoContainer}>
      <button
        className={currentPage === 1 ? styles.pageOf : styles.pageOn}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>
      <button
        className={currentPage === 1 ? styles.pageOf : styles.pageOn}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      <span className={styles.textContainer}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={currentPage === totalPages ? styles.pageOf : styles.pageOn}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
      <button
        className={currentPage === totalPages ? styles.pageOf : styles.pageOn}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </button>
    </div>
  );
};
// className={currentPage === totalPages ? styles['disabled'] : ''}

export default Paginado;

