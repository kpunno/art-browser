
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function ArtworkCard(props) {
    let objectID = props.objectID;
    const {data,error} = useSWR('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID)
    if (error) {
        return (
            <Card  bg="light" border="dark" >
                <Card.Img src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"/>
                <Card.Body>
                    <Card.Title>N/A</Card.Title>
                </Card.Body>
            </Card>
        )
    }
    else if (data) {
        return (
            <Card  bg="light" border="dark" >
                <Card.Img src={data?.primaryImageSmall ? data?.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"}/>
                <Card.Body>
                    <Card.Title>{data?.title}</Card.Title>
                    <hr/>
                    <Card.Text>
                        <strong>Date:</strong> {data?.objectDate ? data?.objectDate : "N/A"}<br/>
                        <strong>Classification: </strong>{data?.classification ? data?.classification : "N/A"}<br/>
                        <strong>Medium: </strong>{data?.medium ? data?.medium : "N/A"}
                    </Card.Text>
                    
                </Card.Body>
                <Link href={`/artwork/${data.objectID}`} legacyBehavior><Button style={{margin: "1rem", marginTop: "0%"}} variant="dark">{objectID}</Button></Link>
            </Card>
        )
    }

}