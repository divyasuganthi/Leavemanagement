import './Homepage.css';

export default function Homepage() {
    return (
        <div>
          
            <div className='Content'>
                <h2>Leave Management System</h2>
                <h1>Welcome to the Leave Management System</h1>
                <p>
                    This is your one-stop solution for managing leaves. Here you can apply for leave, manage your leave requests, view your profile, and much more.
                </p>
            </div>
            <br />
            <div className='con'>
                <nav>
                    <ul>
                        <li><h2><a href="/Login">Login</a></h2></li>
                        <li><br /><h2><a href="/Signup">Signup</a></h2></li>
                        <li><br /><h2><a href="/Applyleave">Applyleave</a></h2></li>
                        <li><br /><h2><a href="/Manageleave">Manageleave</a></h2></li>
                        <li><br /><h2><a href="/Profile">Profile</a></h2></li>
                        
                    </ul>
                </nav>
            </div>
        </div>
    );
}
