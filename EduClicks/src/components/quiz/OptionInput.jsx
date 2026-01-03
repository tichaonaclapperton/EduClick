export default function OptionInput({
	value,
	onChange,
	checked,
	onSelect,
	label,
}) {
	return (
		<div className="option-row">
			<input
				type="text"
				placeholder={label}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<input
				type="radio"
				checked={checked}
				onChange={onSelect}
			/>
		</div>
	);
}
