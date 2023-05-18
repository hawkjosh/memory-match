import { useEffect, useState } from 'react'

import { SingleCard } from './components/SingleCard.tsx'

import data from './data/teams.json'

import './App.css'

interface Card {
	id: number
	name: string
	link: string
	matched: boolean
}

const cardImages: Card[] = data.teams

export const App = () => {
	const [cards, setCards] = useState<Card[]>([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState<Card | null>(null)
	const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)
	const [disabled, setDisabled] = useState(false)

	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }))

		setChoiceOne(null)
		setChoiceTwo(null)
		setCards(shuffledCards)
		setTurns(0)
	}

	const handleChoice = (card: Card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true)
			if (choiceOne.link === choiceTwo.link) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.link === choiceOne.link) {
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
	}, [choiceOne, choiceTwo])

	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns((prevTurns) => prevTurns + 1)
		setDisabled(false)
	}

	useEffect(() => {
		shuffleCards()
	}, [])

	return (
		<div className='page-wrapper'>
			<div className='page-header'>
				<div className='header-title'>MLB Memory Match</div>
				<div className='operations-container'>
					<button
						className='new-game-btn'
						onClick={shuffleCards}>
						New Game
					</button>
					<div className='turns-tracker'>Turns: {turns}</div>
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
			</div>
		</div>
	)
}
