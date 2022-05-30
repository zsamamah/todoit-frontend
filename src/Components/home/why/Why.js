import React from 'react';
import code1 from '../../../Assets/svg/whycode1.svg';
import code2 from '../../../Assets/svg/whycode2.svg';
import code3 from '../../../Assets/svg/whycode3.svg';
import './why.css';

function why() {
  return (
    <>
    <h1 className='title'>Why <span>Code</span> ?</h1>
    <div className='wc_container'>
        <div className='wc_div'>
            <img src={code1} alt="code1"/>
            <h2>It`s popular</h2>
            <p>Technical skills are in high demand. Over 60% of new jobs worldwide will require tech skills.</p>
        </div>
        <div className='wc_div'>
            <img src={code2} alt="code2"/>
            <h2>It`s promising</h2>
            <p>Unlock your earning potential! Entry-level programmers in the U.S. earn on average over $78,000 in salary.</p>
        </div>
        <div className='wc_div'>
            <img src={code3} alt="code3"/>
            <h2>It`s fun</h2>
            <p>Imagine combining your passion and skill with your creativity, and making something new everyday!</p>
        </div>
    </div>
    </>
  )
}

export default why