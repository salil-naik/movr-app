import style from "./modal.module.scss";

export const Modal = ({ children, onClose, title }) => {
  return (
    <div className={`${style.modalOverlay}`}>
      <div className={style.modal}>
        <div className={style.modalHeader}>{title}</div>
        <button className={style.close} onClick={onClose}>
          <span className={style.closeIcon}>&times;</span>
        </button>

        <div className={style.modalBody}>{children}</div>
      </div>
    </div>
  );
};
