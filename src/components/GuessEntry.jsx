import { useState } from "react"
import Button from "react-bootstrap/esm/Button"

export const GuessEntry = () => {

    const [currentColor, setCurrentColor] = useState("#000000")


    return (

        <div className="d-flex justify-content-center">
            <div className="flex-column text-center">
                <h5 className="display-5">Please choose a color:</h5>
                <input
                    id="colorPicker"
                    type="color"
                    onChange={(e) => {
                        setCurrentColor(e.target.value)
                    }}
                />
                <div className="text-center">
                    <Button onClick={(e) => {
                        console.log("Current color: " + currentColor)
                    }}>Submit Guess</Button>
                </div>
            </div>
        </div>
    )
}

export default GuessEntry;
