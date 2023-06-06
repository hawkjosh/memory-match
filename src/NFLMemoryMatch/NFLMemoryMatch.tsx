import { Fragment, useCallback, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { DifficultySelection } from './components/DifficultySelection.tsx'
import { SingleCard } from './components/SingleCard.tsx'

import nflTeams from './data/nfl-teams.json'

import './NFLMemoryMatch.postcss'

interface Card {
	id: number
	name: string
	img: string
	matched: boolean
}

const nfl: Card[] = nflTeams.teams

export const NFLMemoryMatch = () => {
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
		if (selectedOption === 'All NFL Teams') {
			const shuffledCards = [...nfl, ...nfl]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'NFC Conference') {
			const cardsTrimmed = [...nfl].slice(0, 16)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'AFC Conference') {
			const cardsTrimmed = [...nfl].slice(16)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'NFC North') {
			const cardsTrimmed = [...nfl].slice(0, 4)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'NFC South') {
			const cardsTrimmed = [...nfl].slice(4, 8)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'NFC East') {
			const cardsTrimmed = [...nfl].slice(8, 12)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'NFC West') {
			const cardsTrimmed = [...nfl].slice(12, 16)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'AFC North') {
			const cardsTrimmed = [...nfl].slice(16, 20)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'AFC South') {
			const cardsTrimmed = [...nfl].slice(20, 24)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'AFC East') {
			const cardsTrimmed = [...nfl].slice(24, 28)

			const shuffledCards = [...cardsTrimmed, ...cardsTrimmed]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'AFC West') {
			const cardsTrimmed = [...nfl].slice(28)

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
				<div className='header-title'>NFL Memory Match</div>
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
