import React from "react"
import "./Covid.css"
import Date from "../Components/Date/Date"
import States from "../Components/States/States"
import Info from "../Components/Info/Info"

function Covid() {
    return (
        <div>
            <Date/>
            <div className="grid-container" >
                <div className="states" >
                    <States />
                </div>
                <div className="info" >
                    <Info />
                </div>
            </div>
        </div>
    )
}

export default Covid