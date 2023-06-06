import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './Home.tsx'
import { MLBMemoryMatch } from './MLBMemoryMatch/MLBMemoryMatch.tsx'
import { NFLMemoryMatch } from './NFLMemoryMatch/NFLMemoryMatch.tsx'

export const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path='/mlb-match'
					element={<MLBMemoryMatch />}
				/>
				<Route
					path='/nfl-match'
					element={<NFLMemoryMatch />}
				/>
			</Routes>
		</Router>
	)
}
