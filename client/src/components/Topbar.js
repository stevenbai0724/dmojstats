import {useState, useEffect, useRef} from 'react'
import { makeStyles} from "@material-ui/core";
import Search from '../assets/search.png';

const useStyles = makeStyles((theme) => ({

    textYellow: {
        color: "#FCDB05",
        fontSize: "30",
    },
    textGray: {
        color: "#AAAAAA",
        fontSize: "30",
    },
    bar: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: "10%",
        backgroundColor: "#3B3B3B",
    },
    titleWrap: {
        marginLeft: "10%",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        width: "27%",
        
    },
    searchWrap: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: "4px",
        borderStyle: "solid",
        width: "40%",   
        height: "45px",
        borderColor: "#605D5D",
        borderRadius: 10,
    },
    searchBox: {
        borderWidth: "0px",
        width: "100%",
        border: "none",
        background: "transparent",
        color: 'white',
        fontSize: 20,
        height: "100%",
        display: "flex",
        flexDirection: "row",
        '&:focus' : {
            outline: "none",
        }
    },
    img: {
        height: "50%",
        marginLeft: "10px",
        marginRight: "10px",
    },
    
}))
function App({prop}) {
    const [user, setUser] = useState('');
    const [step, setStep] = useState(1);

    const search = evt => {
        if(evt.key === "Enter"){
            console.log('user: ' + user)
            setStep(step+1)
            prop(user)
            
        }
    }
    const classes = useStyles();

    const isMounted = useRef(false);
    useEffect (() => {

        if(isMounted.current){
            console.log("re-render")

            const postBody = {
                user: user
            }
    
            fetch('/api/user', {
                method: "POST",
                body: JSON.stringify(postBody),
                headers: { 'Content-Type': 'application/json'}
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        }
        else {
            isMounted.current = true;
        }
    }, [step])
        



    return (
        <div className = {classes.bar}>
            <div className = {classes.titleWrap}>
                <h1 className = {classes.textYellow}>DM</h1><h1 className = {classes.textGray}>OJ</h1><h1 className = {classes.textYellow}>ST</h1><h1 className = {classes.textGray}>ATS</h1>
            </div>

            <div className = {classes.searchWrap}>

            <img src = {Search} alt = "search" className = {classes.img}/>

            <input
                type = "text"
                className = {classes.searchBox}
                placeholder = "Search for a user..."
                onChange = {e => setUser(e.target.value)}
                onKeyPress = {search}

            >
            </input>

            </div>
            
        </div>
  );
}

export default App;