import React from 'react';
import Button from "react-bootstrap/Button";
import './triggerButton.css'


const Trigger = ({ triggerText, buttonRef, showModal }) => {
    return (
        <Button id='buttonModal'
            ref={buttonRef}
            onClick={showModal}
        >
            {triggerText}
        </Button>
    );
};
export default Trigger;