import React, { useState } from 'react'

interface DifficultySelectionProps {
	onSelectOption: (option: string) => void
}

export const DifficultySelection = ({
	onSelectOption,
}: DifficultySelectionProps) => {
	const [selectedOption, setSelectedOption] = useState<string>('')

	const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(e.target.value)
		onSelectOption(e.target.value)
	}

	return (
		<div className='difficulty-selection'>
			<select
				value={selectedOption}
				onChange={handleOptionChange}>
				<option
					defaultValue=''>
					Select an option:
				</option>
				<optgroup label='Easy'>
					<option value='NL East'>NL East</option>
					<option value='NL Central'>NL Central</option>
					<option value='NL West'>NL West</option>
					<option value='AL East'>AL East</option>
					<option value='AL Central'>AL Central</option>
					<option value='AL West'>AL West</option>
				</optgroup>
				<optgroup label='Medium'>
					<option value='National League'>National League</option>
					<option value='American League'>American League</option>
				</optgroup>
				<optgroup label='Hard'>
					<option value='All MLB Teams'>All MLB Teams</option>
				</optgroup>
			</select>
		</div>
	)
}
