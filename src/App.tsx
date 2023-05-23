import { Fragment, useEffect, useState } from 'react'

import { DifficultySelection } from './components/DifficultySelection.tsx'
import { SingleCard } from './components/SingleCard.tsx'

import allTeams from './data/all-mlb-teams.json'
import americanLeague from './data/all-american-teams.json'
import nationalLeague from './data/all-national-teams.json'
import alEast from './data/american-east-teams.json'
import alCentral from './data/american-central-teams.json'
import alWest from './data/american-west-teams.json'
import nlEast from './data/national-east-teams.json'
import nlCentral from './data/national-central-teams.json'
import nlWest from './data/national-west-teams.json'

import './App.css'

interface Card {
	id: number
	name: string
	image: string
	size: string
	matched: boolean
}

const allMlbTeams: Card[] = allTeams.teams
const americanLeagueTeams: Card[] = americanLeague.teams
const nationalLeagueTeams: Card[] = nationalLeague.teams
const alEastTeams: Card[] = alEast.teams
const alCentralTeams: Card[] = alCentral.teams
const alWestTeams: Card[] = alWest.teams
const nlEastTeams: Card[] = nlEast.teams
const nlCentralTeams: Card[] = nlCentral.teams
const nlWestTeams: Card[] = nlWest.teams

export const App = () => {
	const [cards, setCards] = useState<Card[]>([])
	const [turns, setTurns] = useState<number>(0)
	const [choiceOne, setChoiceOne] = useState<Card | null>(null)
	const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)
	const [disabled, setDisabled] = useState<boolean>(false)
	const [selectedOption, setSelectedOption] = useState<string>('')

	const handleOptionSelect = (option: string) => {
		setSelectedOption(option)
	}

	const shuffleCards = () => {
		if (selectedOption === 'All MLB Teams') {
			const shuffledCards = [...allMlbTeams, ...allMlbTeams]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'American League') {
			const shuffledCards = [...americanLeagueTeams, ...americanLeagueTeams]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'National League') {
			const shuffledCards = [...nationalLeagueTeams, ...nationalLeagueTeams]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'AL East') {
			const shuffledCards = [...alEastTeams, ...alEastTeams]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'AL Central') {
			const shuffledCards = [...alCentralTeams, ...alCentralTeams]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'AL West') {
			const shuffledCards = [...alWestTeams, ...alWestTeams]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'NL East') {
			const shuffledCards = [...nlEastTeams, ...nlEastTeams]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'NL Central') {
			const shuffledCards = [...nlCentralTeams, ...nlCentralTeams]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		if (selectedOption === 'NL West') {
			const shuffledCards = [...nlWestTeams, ...nlWestTeams]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({ ...card, id: Math.random() }))

			setCards(shuffledCards)
		}
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(0)
		setSelectedOption('')
	}

	const handleChoice = (card: Card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true)
			if (choiceOne.name === choiceTwo.name) {
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
	}, [choiceOne, choiceTwo])

	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns((prevTurns) => prevTurns + 1)
		setDisabled(false)
	}

	const newGame = () => {
		setCards([])
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(0)
		setSelectedOption('')
	}

	return (
		<div className='page-wrapper'>
			<div className='page-header'>
				<div className='header-title'>MLB Memory Match</div>
				<div className='operations-container'>
					{cards.length === 0 ? (
						<Fragment>
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
			</div>
		</div>
	)
}
