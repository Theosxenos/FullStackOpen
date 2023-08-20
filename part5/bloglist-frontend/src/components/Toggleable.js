import {useState} from "react";

const Toggleable = (props) => {
    const [visible, setVisible] = useState(false)

    const {buttonLabel, children} = props;

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button type="button" onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Toggleable
