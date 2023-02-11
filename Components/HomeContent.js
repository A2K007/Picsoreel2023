import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import style from '../styles/Index.module.css';

function HomeContent(){
    return (
        <Container>
            <h3 className={style.titleh3}>PICTOREAL</h3>
            <h4 className={style.titleh4}>presents</h4>
            <h1 className={style.titleh1}>PICS-O-REEL</h1>
            <h5 className={style.titleh5}>Let your art speak for you</h5>
            <Link href='/login'>
                <button className={`${style.button}`}>Proceed</button>
            </Link>
        </Container>
    )
}

export default HomeContent;