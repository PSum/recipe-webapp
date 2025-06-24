import { Link } from 'wasp/client/router'
import { logout } from 'wasp/client/auth'

export function Header() {
	return (
		<header className="flex justify-around">
			<div className='flex'>
				<Link to="/">Homepage</Link>
				<Link to="/addrecipe">Add Recipe</Link>
			</div>
			<button onClick={logout}>Logout</button>
		</header>
	)

}
