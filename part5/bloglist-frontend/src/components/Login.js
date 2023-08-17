const Login = ({onFormSubmit}) => (
    <div>
        <h2>log in to application</h2>
        <form onSubmit={onFormSubmit}>
            <label>username</label><input id="username" type="text"/><br/>
            <label>password</label><input id="password" type="password"/><br/>
            <button type="submit">login</button>
        </form>
    </div>
)
