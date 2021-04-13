import React, { useContext, useEffect, useState } from "react"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { StateContext } from "../Context/Contextprovider";
import "./States.css"

function States() {
    const {data,setInfoData,stateNames} = useContext(StateContext)
    const StatesObj = Object.fromEntries(Object.keys(data).map(state => [state,true]))
    const [stateObj,setStateObj] = useState(StatesObj)
    const [checkAll,setcheckAll] = useState(true)
    console.log(stateObj)

    // Changing each state of individual state checkbox
    const handleChange = (event) => {
        const {name} = event.target
        setStateObj(prevState => {
            return {...prevState,[name]:!prevState[name]}
        })
    }

    // checking and updating "select all" option based on trues in checkbox object
    useEffect(() => {
        let temp = Object.values(stateObj)
        if (temp.every(check => check === true)) {
            setcheckAll(true)
        }
        else {
            setcheckAll(false)
        }
        const infData = Object.keys(stateObj).filter(temp => stateObj[temp] === true)
        setInfoData(Object.fromEntries(infData.map(state => [state,data[state]])))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[stateObj]) 
    
    const checkTrue = () => {
        setStateObj(Object.assign({},Object.fromEntries(Object.keys(stateObj).map(state => [state,true]))))
    }

    const checkFalse = () => {
        setStateObj(Object.assign({},Object.fromEntries(Object.keys(stateObj).map(state => [state,false]))))
    }

    const handleCheck= (event) => {
        const {checked} = event.target
        checked ? checkTrue() : checkFalse()
    }

    const checkboxes = Object.keys(data)
    .map(checkbox => <FormControlLabel 
                            key={checkbox}
                            control={
                              <Checkbox
                                checked= {stateObj[checkbox]}
                                name={checkbox}
                                color="secondary"
                                onChange={handleChange}
                              />
                            }
                            label={stateNames[checkbox]}
                        />)
    


    return (
        <div className="statesdiv" >
            <FormControlLabel
                control={
                  <Checkbox
                    name="selectlist"
                    color="primary"
                    checked={checkAll}
                    onChange={handleCheck}
                  />
                }
                label="Select All"
            />
            {checkboxes}
        </div>
    )
}

export default States