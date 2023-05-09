import "./Timer.scss";
import { useEffect, useState, useRef } from "react";

 function Timer ({ duration, onTimeUp }){


    const [counter, setCounter] = useState(0);
    const[progressLoaded, setProgressLoaded] = useState(0);
    const intervalRef = useRef();

    useEffect(()=> {
      intervalRef.current =  setInterval(()=>{
             setCounter((cur)=> cur +1 );
        },1000)

        return () => clearInterval(intervalRef.current);
     }, []);

     useEffect(()=> {
       setProgressLoaded((100 * counter / duration ));

       if(counter === duration){
        clearInterval(intervalRef.current)

        setTimeout(()=> {
           onTimeUp();
        }, 1000)
       }
     }, [counter])



    return <div className="timer-loader-container">
         <div
         style={{
            width: `${progressLoaded}%`,
            backgroundColor: `${
                progressLoaded < 40
                ? 'green'
                : progressLoaded < 70
                ? 'orange'
                : 'red'
            }`
         }}
         className="progress"></div>
    </div>
}

export default Timer;