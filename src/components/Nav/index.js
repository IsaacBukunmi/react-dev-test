import React from 'react'
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../../elements/CustomButton';
import { logout } from '../../redux/actions/authActions';
import styles from './index.module.scss';

const Nav = () => {

    const dispatch = useDispatch()


    return (
        <div className={styles._}>
            <div className={styles.container}>
                <PrimaryButton
                 className={styles.logout_btn}
                 handleClick={() => dispatch(logout())}
                >
                    Log Out
                </PrimaryButton>
            </div>
        </div>
    )
}

export default Nav
