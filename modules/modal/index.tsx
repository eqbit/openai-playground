import React, {useEffect} from 'react';
import css from './index.module.scss';

type Props = {
    open: boolean;
    onClose: () => void;
}

export const Modal: React.FC<Props> = ({ open, children, onClose }) => {
    useEffect(() => {
        console.log('triggered')
    }, [open])
    return (
        <>
            <div className={`${css.modal} ${open ? css.modalOpen : ''}`}>
                <div className={css.background} onClick={onClose} />
                <div className={css.inner}>{children}</div>
            </div>
        </>
    )
}