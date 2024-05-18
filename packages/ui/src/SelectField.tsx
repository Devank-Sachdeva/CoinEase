"use client"

export const Select = ({options, onSelect} : {options: {key: string, value: string}[], onSelect: Function}) => {
    return <select className="bg-gray-50/80 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" onChange={(e) => {
        onSelect(e.target.value)
    }}>
        {options.map(option => <option value={option.key} key={option.key}>{option.value}</option>)}
    </select>
}