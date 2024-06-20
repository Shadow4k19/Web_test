import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyleDigital = styled.div`
    span{
        font-size : 72px;
        justify-content : space-e;
    }
    .text:hover{
        animation : colorChange 2s ease-in-out;
    }
     @keyframes colorChange {
        0% {
            color: black;
        }
        50% {
            color: red;
        }
        100% {
            color: black;
        }
    }
`;

const Digital_Clock: React.FC = () => {
    useEffect(() => {
        const hrs = document.getElementById("hrs");
        const min = document.getElementById("min");
        const sec = document.getElementById("sec");

        const updateClock = () => {
            const currentTime = new Date();
            if (hrs && min && sec) {
                hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
                min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
                sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
            }
        };

        const intervalId = setInterval(updateClock, 1000);
        updateClock();

        return () => clearInterval(intervalId);
    }, []);

    return (
        <StyleDigital>
            <div className="container">
                <div className="clock">
                    <span id="hrs" className='text'>00</span>
                    <span>:</span>
                    <span id="min" className='text'>00</span>
                    <span>:</span>
                    <span id="sec" className='text'>00</span>
                </div>
            </div>
        </StyleDigital>
    );
}

export default Digital_Clock;
