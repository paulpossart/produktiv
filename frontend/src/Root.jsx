import { Outlet } from 'react-router-dom';
import Header from './components/2_header/Header';

function Root() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default Root;
