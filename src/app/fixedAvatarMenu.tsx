"use client";
import React, { useState } from 'react';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import { Avatar } from '@mui/material';
import { green, purple, red } from '@mui/material/colors';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';

const FixedAvatarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (link: string) => {
    window.open(link, '_blank');
  };

  const LiveChat = () => {
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/661e4ab41ec1082f04e2f69e/1hrj57ke5';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();
  }

  return (
    <div className="fixed-avatar-menu" style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 999 }}>
      <div className={`avatar ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <Avatar sx={{ width: 75, height: 75, bgcolor: green[500], fontSize: "10px", fontWeight: "bold", textAlign: "center" }}>Kontaktirajte <br/> nas!</Avatar>
      </div>
      {isOpen && (
        <div className="menu" style={{ position: 'absolute', bottom: '50px', backgroundColor: "white", color: "black", boxShadow: '0px 0px 20px rgba(0, 0, 0, 2)', borderRadius: '8px', padding: '10px', width: '200px', fontSize: "16px" }}>
          <ul style={{ listStyle: "none", cursor: "default" }}>
            <li onClick={() => handleMenuItemClick('tel:061306145')} style={{display: "flex", paddingBottom: "10px"}}>
                <Avatar sx={{bgcolor: green[500] }}><CallIcon/></Avatar>
                <span style={{margin: "auto"}}>Pozovite nas!</span>
            </li>
            <li style={{display: "flex", paddingBottom: "10px"}} onClick={() => handleMenuItemClick('https://api.whatsapp.com/send?phone=061306145&text=Hello')}>
                <Avatar sx={{bgcolor: green[500] }}><WhatsAppIcon/></Avatar>
                <span style={{margin: "auto"}}>WhatsApp</span></li>
            <li style={{display: "flex", paddingBottom: "10px"}} onClick={() => handleMenuItemClick('viber://add?number=061306145')}>
                <Avatar sx={{bgcolor: purple[500] }}><WhatsAppIcon/></Avatar>
                <span style={{margin: "auto"}}>Viber</span></li>
            <li style={{display: "flex", paddingBottom: "10px"}} onClick={() => handleMenuItemClick('mailto:prodajaeurobrand@gmail.com')}>
                <Avatar sx={{bgcolor: red[500] }}><EmailIcon/></Avatar>
                <span style={{margin: "auto"}}>Email</span></li>
            <li style={{display: "flex", paddingBottom: "10px"}} onClick={() => LiveChat()}>
                <Avatar sx={{bgcolor: red[500] }}><MessageIcon/></Avatar>
                <span style={{margin: "auto", paddingBottom: "10px"}}>Pišite nam!</span></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FixedAvatarMenu;
