import useSWR from 'swr';
import Error from 'next/error';
import {Card, Button} from 'react-bootstrap';
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function ArtworkCardDetail(props) {
    
    let objectID = props.objectID;
    let added = false;

    const {data,error} = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`: null);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    
    for (let i = 0; i < favouritesList.length; i++) {
        if (favouritesList[i] == objectID) added = true;
    }
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList?.includes(objectID))
    }, [favouritesList])

    async function favouritesClicked() {
        if (showAdded) {
            setFavouritesList(await removeFromFavourites(objectID));
            setShowAdded(false);
        }
        else {
            setFavouritesList(await addToFavourites(objectID));
            setShowAdded(true);
        }
    }

    if (!data) {
        return <Error statusCode={404}/>
    }
    else if (data) {
        return (
            <Card  bg="light" border="dark">
                {data?.primaryImage && <Card.Img src={data?.primaryImage}/>}
                <Card.Body>
                    <Card.Title>{data?.title}</Card.Title>
                    <hr/>
                    <Card.Text>
                        <strong>Date:</strong> {data?.objectDate ? data?.objectDate : "N/A"}<br/>
                        <strong>Classification: </strong>{data?.classification ? data?.classification : "N/A"}<br/>
                        <strong>Medium: </strong>{data?.medium ? data?.medium : "N/A"}<br/><br/>
                        <strong>Artist: </strong>
                            {data?.artistDisplayName ? 
                            <>
                                {data?.artistDisplayName}&nbsp;
                                (<a href={data?.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>)
                            </> 
                            : "N/A"}
                        <br/>
                        <strong>Credit Line: </strong>{data?.creditLine}<br/>
                        <strong>Dimensions: </strong>{data?.dimensions}<br/><br/>
                        <Button 
                            variant={showAdded ? "primary" : "outline-primary"}
                            onClick={favouritesClicked}
                        >+ Favourite {showAdded ? "(Added)" : null}</Button>
                    </Card.Text>    
                </Card.Body>
            </Card>
        )
    }

}