
import {Card, Row, Col} from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if (!favouritesList) return null;

    if (favouritesList.length) {
        return (
            <>
            <Row className="gy-4">
                {favouritesList.map(fav => (
                    <Col lg={3} key={fav}><ArtworkCard objectID={fav}/></Col>
                ))}
            </Row>
            </>
            )
    }
    else {
        return (
            <Card body>
                <Card.Title>Nothing here.</Card.Title>
                <Card.Text>You do not have any favourited items.</Card.Text>
            </Card>
        )
    }
}