import { Fragment, useCallback, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { DifficultySelection } from './components/DifficultySelection.tsx'
import { SingleCard } from './components/SingleCard.tsx'

import mlbTeams from './data/mlb-teams.json'

import './MLBMemoryMatch.postcss'

interface Card {
	id: number
	name: string
	image: string
	size: string
	matched: boolean
}

const mlb: Card[] = mlbTeams.teams

export const MLBMemoryMatch = () => {
	const [cards, setCards] = useState<Card[]>([])
	const [turns, setTurns] = useState<number>(0)
	const [choiceOne, setChoiceOne] = useState<Card | null>(null)
	const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)
	const [disabled, setDisabled] = useState<boolean>(false)
	const [gameOver, setGameOver] = useState<boolean>(false)
	const [endMessage, setEndMessage] = useState<string>('')
	const [matches, setMatches] = useState<number>(0)
	const [selectedOption, setSelectedOption] = useState<string>('')

	const handleOptionSelect = (option: string) => {
		setSelectedOption(option)
	}

	const shuffleCards = () => {
		if (selectedOption === 'All MLB Teams') {
			const shuffledCards = [...mlb, ...mlb]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'National League') {
			const cardsTrimmed = [...mlb].slice(0, 15)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'American League') {
			const cardsTrimmed = [...mlb].slice(15)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'NL East') {
			const cardsTrimmed = [...mlb].slice(0, 5)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'NL Central') {
			const cardsTrimmed = [...mlb].slice(5, 10)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'NL West') {
			const cardsTrimmed = [...mlb].slice(10, 15)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'AL East') {
			const cardsTrimmed = [...mlb].slice(15, 20)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'AL Central') {
			const cardsTrimmed = [...mlb].slice(20, 25)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'AL West') {
			const cardsTrimmed = [...mlb].slice(25)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(0)
	}

	const handleChoice = (card: Card) => {
		if (card === choiceOne || card === choiceTwo) {
			return
		}
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns((prevTurns) => prevTurns + 1)
		setDisabled(false)
	}

	const newGame = () => {
		setGameOver(false)
		setMatches(0)
		setCards([])
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(0)
		setSelectedOption('')
	}

	const checkCards = useCallback(() => {
		if (cards.length > 0 && matches === cards.length / 2) {
			setGameOver(true)
			setEndMessage(`Congrats, you finished in ${turns} turns!`)
		}
	}, [cards.length, matches, turns])

	useEffect(() => {
		checkCards()

		if (choiceOne && choiceTwo) {
			setDisabled(true)
			if (choiceOne.name === choiceTwo.name) {
				setMatches((prevCount) => prevCount + 1)
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.name === choiceOne.name) {
							return { ...card, matched: true }
						} else {
							return card
						}
					})
				})
				resetTurn()
			} else {
				setTimeout(() => resetTurn(), 1000)
			}
		}
	}, [checkCards, choiceOne, choiceTwo])

	return (
		<div className='page-wrapper'>
			<div className='page-header'>
				<div className='header-title'>MLB Memory Match</div>
				<div className='operations-container'>
					{cards.length === 0 ? (
						<Fragment>
							<Link to='/'>
								<button className='home-btn'>Home</button>
							</Link>
							<DifficultySelection onSelectOption={handleOptionSelect} />
							<button
								className='start-btn'
								onClick={shuffleCards}>
								Start
							</button>
						</Fragment>
					) : (
						<Fragment>
							<button
								className='new-game-btn'
								onClick={newGame}>
								New Game
							</button>
							<div className='turns-tracker'>Turns: {turns}</div>
						</Fragment>
					)}
				</div>
			</div>
			<div className='page-content'>
				<div className='cards-container'>
					{cards.map((card, index) => (
						<SingleCard
							key={index}
							card={card}
							handleChoice={handleChoice}
							flipped={card === choiceOne || card === choiceTwo || card.matched}
							disabled={disabled}
						/>
					))}
				</div>
				{gameOver && (
					<div className='end-message-container'>
						<div className='end-message'>{endMessage}</div>
						<button
							className='play-again-btn'
							onClick={newGame}>
							Play Again
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
