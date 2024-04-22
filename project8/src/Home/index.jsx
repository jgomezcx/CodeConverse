// src/Home/index.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import HomePage from './HomePage';
import PostForm from '../components/PostForm';
import PostComment from '../PostComments/PostComment';
import logo from '../assets/code.png';

function Home() {

    return (
        <Router>
            <div className='home hidden md:flex'>
                <nav>
                    <ul className='hidden md:flex'>
                        <img className='img3' src={logo}/>
                        <li>
                            <Link className="link" to="/">Home</Link>
                        </li>
                        <li>
                            <Link className="link" to="/Post_Form">Create new post</Link>
                        </li>
                    </ul>
                </nav>

                <div >
                
                    <Routes >
                        <Route path="/Post_Form" element={<PostForm/>} />
                        <Route path="/post_comment/:id" element={<PostComment />} />
                        <Route path="/" element={
                            <>
                                <HomePage />  
                            </>
                        } />

                    </Routes>

                </div>
            </div>
        </Router>
    );
};

export default Home;