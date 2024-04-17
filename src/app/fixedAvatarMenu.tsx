"use client";
import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { green, purple, red } from '@mui/material/colors';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';

const FixedAvatarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (link: string) => {
    window.open(link, '_blank');
  };

  const LiveChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.toggle();
    }
  };

  useEffect(() => {
    // Load Tawk.to script when component mounts
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/661e4ab41ec1082f04e2f69e/1hrj57ke5';
    script.async = true;
    script.onload = () => {
      if (window.Tawk_API) {
        // Hide chat widget initially
        window.Tawk_API.hideWidget();
      }
    };
    document.body.appendChild(script);

    // Cleanup function to remove script element
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed-avatar-menu" style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 999 }}>
      <div className={`avatar ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <Avatar sx={{ width: 75, height: 75, bgcolor: green[500], fontSize: "10px", fontWeight: "bold", textAlign: "center" }}>Kontaktirajte <br/> nas!</Avatar>
      </div>
      {isOpen && (
        <div className="menu" style={{ position: 'absolute', bottom: '50px', backgroundColor: "white", color: "black", boxShadow: '0px 0px 20px rgba(0, 0, 0, 2)', borderRadius: '8px', padding: '10px', width: '200px', fontSize: "16px" }}>
            <ul style={{ listStyle: "none", cursor: "default" }}>
                <div style={{float: "right"}}>
                    <CloseIcon onClick={toggleMenu}/>
                </div>
                <br/>
                <li onClick={() => handleMenuItemClick('tel:062789733')} style={{display: "flex", paddingBottom: "10px"}}>
                    <Avatar sx={{bgcolor: green[500] }}><CallIcon/></Avatar>
                    <span style={{margin: "auto"}}>Pozovite nas!</span>
                </li>
                <li style={{display: "flex", paddingBottom: "10px"}} onClick={() => handleMenuItemClick('https://api.whatsapp.com/send?phone=062789733&text=Pozdrav')}>
                    <Avatar sx={{bgcolor: green[500] }}><WhatsAppIcon/></Avatar>
                    <span style={{margin: "auto"}}>WhatsApp</span></li>
                <li style={{display: "flex", paddingBottom: "10px"}} onClick={() => handleMenuItemClick('viber://add?number=38762789733')}>
                    <Avatar sx={{bgcolor: purple[500] }}><WhatsAppIcon/></Avatar>
                    <span style={{margin: "auto"}}>Viber</span></li>
                <li style={{display: "flex", paddingBottom: "10px"}} onClick={() => handleMenuItemClick('mailto:prodajaeurobrand@gmail.com')}>
                    <Avatar sx={{bgcolor: red[500] }}><EmailIcon/></Avatar>
                    <span style={{margin: "auto"}}>Email</span></li>
                <li style={{display: "flex", paddingBottom: "10px"}} onClick={LiveChat}>
                    <Avatar sx={{bgcolor: red[500] }}><MessageIcon/></Avatar>
                    <span style={{margin: "auto", paddingBottom: "10px"}}>Pišite nam!</span></li>
            </ul>
        </div>
      )}
    </div>
  );
};

export default FixedAvatarMenu;

