import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import { Card, Button, ListGroup } from 'react-bootstrap'
import styles from '../styles/History.module.css'
import { removeFromHistory } from '@/lib/userData'

export default function History() {
    

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    if (!searchHistory) return null
    const router = useRouter();
    let parsedHistory=[];
    searchHistory.forEach(search => {
        let params = new URLSearchParams(search);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, i) {
        router.push(`/artwork?${searchHistory[i]}`);
    }

    async function removeHistoryClicked(e, i) {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[i]));
    }

    if (parsedHistory.length) {
        return (<>
            <ListGroup as="ul">
            {parsedHistory.map((item, i) => (
                <ListGroup.Item key={i} className={styles.historyListItem} as="li" onClick={e => historyClicked(e, i)}>
                    {Object.keys(item).map(key => (<>{key}: <strong>{item[key]}</strong>&nbsp;</>))}
                    <Button className="float-end" variant="danger" size="sm"
                        onClick={e => removeHistoryClicked(e, i)}>&times;
                    </Button>
                </ListGroup.Item>
                ))}
            </ListGroup>
        </>
        )
    }
    else return (
        <Card body>
            <Card.Title>Nothing here.</Card.Title>
            <Card.Text>Try searching for some artwork.</Card.Text>
        </Card>
    )
}