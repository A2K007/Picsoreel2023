import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import NavigationBar from "../Components/NavigationBar"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../styles/wishlist.module.css'

export default function MyVotes() {
  const router = useRouter()
  const [isloggedin, setIsLoggedIn] = useState(false)

  const checkifuser = async () => {
    
    const loggedInUser  = localStorage.getItem("user");
    const res = await fetch(`api/checkadmin/${loggedInUser}`)
    const data = await res.json()
    if (data.name !== "notuser" && data.if_submitted === true) {
      setIsLoggedIn(true)
    }
    else{
      alert("You have not submitted your votes yet!")
      router.push('/wishlist')
    }
  }

  const logout = async name => {
    localStorage.removeItem('user');
  }

  //displaying all the images with category painting from atlas
  const [paintings, setPainting] = useState([])
  const [photographys, setPhotography] = useState([])
  const [digitalarts, setDigitalart] = useState([])
  const [themes, setTheme] = useState([])

  const getcat = async cate => {
    const loggedInUser = localStorage.getItem('user')
    const res = await fetch('/api/getWishlist', {
      method: 'POST',
      body: JSON.stringify({ category: cate, username: loggedInUser }),
      headers: {
        'Content-Type': 'application/JSON'
      }
    })
    const data = await res.json()
    return data;
  }

  const loadallimages = async () => {
    setPainting(await getcat("painting"));
    setPhotography(await getcat("photo"));
    setTheme(await getcat("theme"));
    setDigitalart(await getcat("digital"));
  }

  useEffect(() => {
    loadallimages(), checkifuser()
  }, []);

  return (
    <>
      <Head>
        <title>My Votes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Niconne&display=swap" rel="stylesheet" />
      </Head>
      <NavigationBar />
      {
        isloggedin ?
          (
            <Container fluid className={style.mainBody}>
              <Container className={style.mainContainer}>
                <Row>
                  <Col>
                    <h1 className={style.mainTitle}>My Votes</h1>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                    <h3 className={style.title}>Paintings/Sketches</h3>
                    <Container>
                      {
                        paintings.map((painting) => {
                          return (
                            <Container className={style.myVoteBox}>
                                <img src={painting.url} className={style.image}/>
                            </Container>
                          )
                        })
                      }
                    </Container>
                  </Col>
                  <Col md={6} sm={12}>
                    <h3 className={style.title}>Photography</h3>
                    <Container>
                      {
                        photographys.map((photograph) => {
                          return (
                            <Container className={style.myVoteBox}>
                                <img src={photograph.url} className={style.image}/>
                            </Container>
                          )
                        })
                      }
                    </Container>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                    <h3 className={style.title}>Digital Art</h3>
                    <Container>
                      {
                        digitalarts.map((darts) => {
                          return (
                            <Container className={style.myVoteBox}>
                                <img src={darts.url} className={style.image}/>
                            </Container>
                          )
                        })
                      }
                    </Container>
                  </Col>
                  <Col md={6} sm={12}>
                    <h3 className={style.title}>Theme Based (Slice of Life)</h3>
                    <Container>
                      {
                        themes.map((theme) => {
                          return (
                            <Container className={style.myVoteBox}>
                                <img src={theme.url} className={style.image}/>
                            </Container>
                          )
                        })
                      }
                    </Container>
                  </Col>
                </Row>
                <Row>
                  <Col className={style.submitContainer}>
                    <Link href="/feedback"><button className={style.submitButton}>Feedback</button></Link>
                  </Col>
                </Row>
              </Container>
            </Container>
          )
          :
          (
            <div>
              <h2>Not logged in</h2>
            </div>
          )
      }
    </>
  )
}