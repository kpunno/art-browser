
import {Row, Col} from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import {useRouter} from 'next/router';

export default function ArtworkByID() {
    const router = useRouter();
    const {objectID} = router.query;
    return <ArtworkCardDetail objectID={objectID}/>
}