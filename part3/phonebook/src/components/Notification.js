import {NOTIFICATION_TYPES} from "../constants";

const Notification = ({notificationModel: {message, type}}) => {
    const baseStyle = { 
        borderStyle: 'solid',
        borderRadius: 5,
        fontSize: 20,
        fontWeight:'bold',
        marginBottom: 10,
        padding: 10,
    }
    
    const successStyle = {
        background: '#bbf7d0',
        borderColor: '#16a34a',
        color: '#052e16',
    }
    
    const dangerStyle = {
        background: '#fecaca',
        borderColor: '#dc2626',
        color: '#450a0a',
    }
    
    let notificationStyle = {}
    
    switch (type) {
        case NOTIFICATION_TYPES.SUCCESS:
            notificationStyle = {...baseStyle , ...successStyle};
            break;
        case NOTIFICATION_TYPES.DANGER:
            notificationStyle = {...baseStyle , ...dangerStyle};
            break;
    }
    
    if(message) {
        return <div style={notificationStyle}>
            {message}
        </div>
    }
}

export default Notification;