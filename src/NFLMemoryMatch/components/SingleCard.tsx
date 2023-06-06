interface Card {
	id: number
	name: string
	img: string
	matched: boolean
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
				style={{
					backgroundImage: `url(${card.img})`,
				}}
			/>
			<div
				className={flipped ? 'card-back flipped' : 'card-back'}
				onClick={handleClick}
			/>
		</div>
	)
}
