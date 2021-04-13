import React,{useState,useEffect} from "react"
import moment from 'moment';
const StateContext = React.createContext();

function ContextProvider(props) {
    const [coviddata,setData] = useState({})
    const [loading,setLoading] = useState(false)
    const [infoData,setInfoData] = useState({})
    // Since yesterdays data is not completely available online , we're visualizing stats from day before yesterday.
    const [date,setDate] = useState(moment().subtract(2, 'days').format('YYYY-MM-DD'))

    const stateNames = {
        "AN":"Andaman and Nicobar Islands",
        "AP":"Andhra Pradesh",
        "AR":"Arunachal Pradesh",
        "AS":"Assam",
        "BR":"Bihar",
        "CH":"Chandigarh",
        "CT":"Chhattisgarh",
        "DL":"Delhi",
        "DN":"Dadra and Nagar Haveli",
        "GA":"Goa",
        "GJ":"Gujarat",
        "HP":"Himachal Pradesh",
        "HR":"Haryana",
        "JH":"Jharkhand",
        "JK":"Jammu and Kashmir",
        "KA":"Karnataka",
        "KL":"Kerala",
        "LA":"Ladakh",
        "LD":"Lakshadweep",
        "MP":"Madhya Pradesh",
        "MH":"Maharashtra",
        "MN":"Manipur",
        "ML":"Meghalaya",
        "MZ":"Mizoram",
        "NL":"Nagaland",
        "OR":"Odisha",
        "PY":"Puducherry",
        "PB":"Punjab",
        "RJ":"Rajasthan",
        "SK":"Sikkim",
        "TN":"Tamil Nadu",
        "TG":"Telangana",
        "TR":"Tripura",
        "UP":"Uttar Pradesh",
        "UT":"Uttarakhand",
        "WB":"West Bengal",
        "DD":"Daman and Diu",
    }

    // Loading data based on Date change using useEffect

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.covid19india.org/v4/data-${date}.json`)
            .then(res => res.json())
            .then(data => {
                const {TT,...cleanData} = data
                setData({...cleanData})
                setInfoData({...cleanData})
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    },[date]) // eslint-disable-next-line react-hooks/exhaustive-deps


    return (
        <StateContext.Provider value={{data:coviddata,loading,infoData,date,setDate,setInfoData,stateNames}} >
            {props.children}
        </StateContext.Provider>
    )
}

export {ContextProvider, StateContext}