import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Instructions from '../Components/Instructions';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../Components/NavigationBar';

export default function Admin({ href }) {
  return (
    <>
      <Head>
        <title>User Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"/>
      </Head>
      <NavigationBar/>
      <Instructions />
    </>
  )
}