import React, { useEffect, useState } from 'react';

export default function Dashboard(provider) {
  return (
    <div className='dashboard' id='dashboard' style={{ height: '82.5vh' }}>
      <div className='credit-overview' style={{ textAlign: 'center' }}>
        <div
          style={{
            height: '140px',
            width: '140px',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            // backgroundColor: '#1ae',
          }}
        >
          <div
            className='net-credit-score'
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              margin: '0.1875rem',
              backgroundColor: 'linear-gradient(150deg, #ee9f0c, #dbea14)',
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.25rem',
            }}
          >
            <h1 style={{ fontSize: '48px' }}>60.4</h1>
          </div>
        </div>
        <button
          style={{
            background:
              'linear-gradient(150deg,#ee9f0c 10.51%, #dbea14 93.41%)',
            border: 'none',
            fontFamily: "'Inter', sans-serif ",
            fontWeight: '800',
            borderRadius: '16px',
            width: '270px',
            height: '50px',
            color: 'white',
          }}
        >
          Calculate My Credit Score!
        </button>
      </div>
    </div>
  );
}
