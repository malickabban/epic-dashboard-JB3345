"use client"
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '20vh' }}>
                <h1 style={{ fontSize: '2em', textAlign: 'center' }}>Privacy Policy</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <p style={{ fontSize: '1.5em', textAlign: 'center' }}>
                {"We do not use any real patient information in this dashboard.\n\n\n" +
                " These are all examples and generated data provided by HAPI." +
                " As a result these patients might have similar names to real patients but are not real patients." + 
                " They also may have medications/diagnoses that one would not find in a real practice. This dashboard is for educational purposes only."}
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;