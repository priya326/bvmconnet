import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PrivateRoute = ({ children }) => {
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            router.push('/sign-in');
        }
    }, [user, router]);

    return user ? children : null;
};

export default PrivateRoute;
