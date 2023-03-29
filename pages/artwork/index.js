
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import {Row, Col, Card, Pagination} from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

import validObjectIDList from '@/public/data/validObjectIDList'

const PER_PAGE = 12;

export default function ArtWork() {

    const [page, setPage] = useState(1);
    const [artworkList, setArtworkList] = useState(null);
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    useEffect(() => {
        let filteredResults = validObjectIDList.objectIDs.filter(x => data?.objectIDs?.includes(x));

        if (data) {
            let results = []
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
        }
        
    }, [data])

    useEffect(() => {
        
    }, [page])

    function prevPage() {
        setPage(page > 1 ? page - 1 : page);
        
    }

    function nextPage() {
        setPage(page < artworkList.length ? page + 1 : page);
        
    }
    
    if (!artworkList && error) {
        return <Error statusCode={404}/>
    }
    else if (artworkList && artworkList.length) {
        return (
        <>
        <Row className="gy-4">
            {artworkList[page - 1].map(artDetail => (
                <Col lg={3} key={artDetail}><ArtworkCard objectID={artDetail}/></Col>
            ))}
        </Row>
        <Pagination >
            <Pagination.Prev disabled={page < 2} onClick={prevPage}>&laquo;</Pagination.Prev>
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next disabled={page == artworkList.length} onClick={nextPage}>&raquo;</Pagination.Next>
        </Pagination>
        </>
        )
    }
    else {
        return <Card body><h4>Nothing here.</h4></Card>
    }
    
}