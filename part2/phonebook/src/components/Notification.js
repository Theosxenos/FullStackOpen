const Notification = ({message}) => {
    const notificationStyle = {
        background: '#bbf7d0',
        borderColor: '#16a34a',
        borderStyle: 'solid',
        borderRadius: 5,
        color: '#052e16',
        fontSize: 20,
        fontWeight:'bold',
        marginBottom: 10,
        padding: 10,
    }
    if(message) {
        return <div style={notificationStyle}>
            {message}
        </div>
    }
}

export default Notification;