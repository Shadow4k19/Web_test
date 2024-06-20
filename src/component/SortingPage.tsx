import { useState } from "react";
import styled from "styled-components";

const SortingStyle = styled.div`
.section{
    height: auto;
    min-height: 100vh;
}

.container {
    display: flex;
    flex-direction: column;
    padding: 0 0 5% 0; 
    overflow-x: hidden;
    background-color: #CCBEBE;
    border-radius: 5px;
  }
  
  .text-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    text-align: center;
    padding: 2% 0 0 0;
  }
  
  .btn-container {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .btn-container button {
    margin: 5px;
  }
  
  @media screen and (max-width: 768px) {
    .btn-container {
      flex-direction: column;
      align-items: center;
      grid-gap: 20px;
    }
  
    .btn-container button {
      margin: 5px 0;
    }

    .container{
        padding-top: 20%;
    }
  }
  @media screen and (max-width: 900px) and (max-height: 600px){
    .btn-container{
        grid-template-columns: repeat(3, auto);
        grid-gap: 20px;
    } 
  }
`
const SortingPage : React.FC = () =>{
    const [list, setList] = useState([4,1,3]);

    const getRandomNumber = (min : number, max : number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
    
    const addRandomNumber = () => {
        const randomNumber = getRandomNumber(1, 100);
        setList(prevList => [...prevList, randomNumber]);
    };

    const resetnumber = () =>{
        setList([]);
        for(let i = 0 ; i < 3 ; i++){
            const randomNumber = getRandomNumber(1, 100);
            setList(prevList => [...prevList, randomNumber]);
        }
    }
    const shuffle = () =>{
    const shuffledList = [...list];
    for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
    setList(shuffledList);
    }

    const bubbleSort = () => {
        const sortedList = [...list];
        const n = sortedList.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (sortedList[j] > sortedList[j + 1]) {
                    const temp = sortedList[j];
                    sortedList[j] = sortedList[j + 1];
                    sortedList[j + 1] = temp;
                }
            }
        }
        setList(sortedList);
    };

    const selectionsort = () =>{
        const sortlist = [...list];
        const n = sortlist.length;
        for(let i = 0 ; i < n -1 ; i++){
            let min = i;
            for(let j = i + 1 ; j < n ; j++){
                if(sortlist[j] < sortlist[min]){
                    min = j;
                }
            }
            if(min !== i){
                const temp = sortlist[min];
                sortlist[min] = sortlist[i];
                sortlist[i] = temp;
            }
            setList(sortlist);
        }
        return;
    }
    
    const patition = (low : number , high : number) : number =>{
        let pivot = list[high];
        let i = low - 1;
        for(let j = low ; j <= high - 1 ; j++){
            if(list[j] < pivot){
                i++;
                swap(i , j)
            }
        }
        swap(i+1, high);
        return i+1;
    }

    const quicksort = (low : number , high : number) =>{
        if(low < high){
            let pi = patition(low, high);
            quicksort(low,pi-1);
            quicksort(pi+1,high);
            setList([...list])
        }
        return;
    }

    const callquick = () =>{
        const n = list.length;
        quicksort(0 , n-1);
    }

    const swap =(a : number , b : number) : void =>{
        const temp = list[a];
        list[a] = list[b];
        list[b] = temp;  
        return;
    } 
    return(
        <SortingStyle>
            <div className="section">
                <div className="container">
                    <div className="text-container">
                    <p className="home-text">List value: {list.join(", ")}</p>
                    </div>
                    <div className="btn-container">
                    <button onClick={shuffle}>Shuffle</button>
                    <button onClick={bubbleSort}>BBsort</button>
                    <button onClick={selectionsort}>SelectSort</button>
                    <button onClick={callquick}>QuickSort</button>
                    <button onClick={addRandomNumber}>Random Number</button>
                    <button onClick={resetnumber}>Reset</button>
                    </div>
                </div>
        </div>
        </SortingStyle>
    )
}
export default SortingPage;