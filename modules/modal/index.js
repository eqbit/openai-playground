import React from 'react';
import css from './index.module.scss';

export const Modal = ({ open, children, onClose }) => {
    return (
        <>
            <div className={`${css.modal} ${open ? css.modalOpen : ''}`}>
                <div className={css.background} onClick={onClose} />
                <div className={css.inner}>{children}</div>
            </div>
        </>
    )
}