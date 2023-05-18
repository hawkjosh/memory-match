interface Card {
	id: number
	name: string
	link: string
	matched: boolean
	backgroundSize: string
}

interface SingleCardProps {
	card: Card
	handleChoice: (card: Card) => void
	flipped: boolean
	disabled: boolean
}

export const SingleCard = ({
	card,
	handleChoice,
	flipped,
	disabled,
}: SingleCardProps) => {
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card)
		}
	}

	return (
		<div className='card'>
			<div
				className={flipped ? 'card-front flipped' : 'card-front'}
				style={{ backgroundImage: `url(${card.link})`, backgroundSize: card.backgroundSize }}
			/>
			<div
				className={flipped ? 'card-back flipped' : 'card-back'}
				style={{
					backgroundImage:
						'url(https://www.mlbstatic.com/team-logos/league-on-dark/1.svg)',
				}}
				onClick={handleClick}
			/>
		</div>
	)
}
