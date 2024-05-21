export const InputField = ({ label, inputFunction }: { label: string, inputFunction?: Function }) => {
    return <div className="mb-5">
        <label className="block mb-1"> {label}</label>
        <input type="number" id="helper-text" aria-describedby="helper-text-explanation" className="bg-white/80 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2" placeholder={label} onChange={(e) => {
            if (inputFunction == null) return null;
            return inputFunction(e.target.value)
        }} ></input>
    </div>
}