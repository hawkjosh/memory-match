import { Link } from 'react-router-dom'
import './Home.postcss'

export const Home = () => {
	return (
		<div className='home-container'>
			<h1>Select a category:</h1>
			<Link to='/mlb-match'>
				<button className='mlb-link'>MLB</button>
			</Link>
			<Link to='/nfl-match'>
				<button className='nfl-link'>NFL</button>
			</Link>
		</div>
	)
}
