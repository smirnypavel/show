import React from "react";

import styles from "@/styles/components/helpers/Pagination.module.css";
import {
  MdKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const maxVisibleButtons = 4; // Максимальное количество отображаемых кнопок

    // Пример: Если totalPages = 10, currentPage = 3, maxVisibleButtons = 5
    // Должны отображаться кнопки 1 2 3 4 5
    const minButton = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const maxButton = Math.min(totalPages, minButton + maxVisibleButtons - 1);

    for (let i = minButton; i <= maxButton; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`${styles.buttoPages} ${
            currentPage === i ? styles.buttonPagesActive : ""
          }`}
          onClick={() => handlePageClick(i)}
          disabled={currentPage === i}>
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <div className={styles.paginateContainer}>
      <button
        className={styles.buttonStart}
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}>
        <MdKeyboardDoubleArrowLeft className={styles.icon} />
      </button>
      <button
        className={styles.buttonPrevious}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}>
        <MdOutlineKeyboardArrowLeft className={styles.icon} />
      </button>
      {renderPageButtons()}
      <button
        className={styles.buttonNext}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <MdOutlineKeyboardArrowRight className={styles.icon} />
      </button>
      <button
        className={styles.buttonEnd}
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}>
        <MdOutlineKeyboardDoubleArrowRight className={styles.icon} />
      </button>
    </div>
  );
};

export default Pagination;
