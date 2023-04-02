/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Kristjan Punno
*  Date: 2023-04-02
*  ID  : 150695211
*
********************************************************************************/ 

import { Inter } from '@next/font/google'
import Container from 'react-bootstrap/Container';
import {Row, Col, Image} from 'react-bootstrap';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Container>
      <Row>
        <h1>Browse the Met<hr/></h1>
        <Col md={4}>The Metropolitan Museum of Art in New York City, colloquially &quot;the Met&quot;, is the largest art museum in the Americas and the most-visited museum in the Western Hemisphere. Its permanent collection contains over two million works, divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan&apos;s Upper East Side, is by area one of the world&apos;s largest art museums. The first portion of the approximately 2-million-square-foot (190,000 m2) building was built in 1880. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.</Col>
        <Col md={8}><Image rounded fluid src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" alt="image"/></Col>
      </Row>
      <Row>
        <h2><br/>Collections</h2>
        <hr/>
        <Col md={12}>The Met&apos;s permanent collection is curated by seventeen separate departments, each with a specialized staff of curators and scholars, as well as six dedicated conservation departments and a Department of Scientific Research. The permanent collection includes works of art from classical antiquity and ancient Egypt, paintings and sculptures from nearly all the European masters; and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is also home to encyclopedic collections of musical instruments, costumes and accessories, and antique weapons and armor from around the world. A great number of period rooms, ranging from first-century Rome through modern American design, are permanently installed in the Met&apos;s galleries. In addition to its permanent exhibitions, the Met organizes and hosts large traveling shows throughout the year.&nbsp;
          <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">[Wikipedia]</a>
        </Col>
      </Row>
      <br/>
    </Container>
  )
}
