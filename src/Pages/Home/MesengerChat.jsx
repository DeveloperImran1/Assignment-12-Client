"use client";
import React, { Component} from 'react';

import { FacebookProvider, CustomChat } from 'react-facebook';
const MesengerChat = () => {
    
    return (
        <FacebookProvider appId="2187657098240669" chatSupport>
        <CustomChat pageId="100888219208742" minimized={false}/>
      </FacebookProvider> 
      
    );
};

export default MesengerChat;

