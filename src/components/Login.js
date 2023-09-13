const Login = () => {
    return (
        <div>
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="form-control"
            />

            <label htmlFor="password" className="form-label">Password</label>
            <input type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="form-control"
            />
        </div>
    );
}

export default Login;