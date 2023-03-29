
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { isAuthenticated } from '@/lib/authenticate';

export default function RouteGuard(props) {
    const router = useRouter();

    const [favourites, setFavourites] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [authorized, setAuthorized] = useState(false);

    const PUBLIC_PATHS = ['/login','/register','/','/_error']

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
           setAuthorized(false);
           router.push('/login');
        }
        else {
            setAuthorized(true);
        }
    }

    async function updateAtoms() {
        setFavourites(await getFavourites());
        setSearchHistory(await getHistory());
    }

    useEffect(() => {
        updateAtoms();
        authCheck(router.pathname);
        router.events.on('routeChangeComplete', authCheck);
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [])

    return <>{authorized && props.children}</>
}