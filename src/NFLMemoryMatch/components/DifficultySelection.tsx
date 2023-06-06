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
				<option defaultValue=''>Select an option:</option>
				<optgroup label='Easy'>
					<option value='NFC North'>NFC North</option>
					<option value='NFC South'>NFC South</option>
					<option value='NFC East'>NFC East</option>
					<option value='NFC West'>NFC West</option>
					<option value='AFC North'>AFC North</option>
					<option value='AFC South'>AFC South</option>
					<option value='AFC East'>AFC East</option>
					<option value='AFC West'>AFC West</option>
				</optgroup>
				<optgroup label='Medium'>
					<option value='NFC Conference'>NFC Conference</option>
					<option value='AFC Conference'>AFC Conference</option>
				</optgroup>
				<optgroup label='Hard'>
					<option value='All NFL Teams'>All NFL Teams</option>
				</optgroup>
			</select>
		</div>
	)
}
