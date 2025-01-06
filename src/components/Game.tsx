import { useState } from "react";
import Modal from "./Modal";

interface Props {
    setUserScore: React.Dispatch<React.SetStateAction<number>>;
    setMachineScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Game({ setMachineScore, setUserScore }: Props) {
    let options = ["👊🏼", "🖐🏼", "✌🏼"]
    const [winner, setWinner] = useState("Make your move")
    const [machineSquare, setMachineSquare] = useState("?")
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [allowedPlay, setAllowedPlay] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false)

    const machineChoice = () => {
        return options[Math.floor(Math.random() * 3)]
    }

    const handleSelectItem = (userOption: string) => {
        if (!allowedPlay) {
            handlePlayAgain(false)
            return
        }
        let machineOption = machineChoice()
        setMachineSquare(machineOption)
        setSelectedOption(userOption)
        setAllowedPlay(false)

        if (
            (userOption === options[0] && machineOption === options[2]) ||
            (userOption === options[2] && machineOption === options[1]) ||
            (userOption === options[1] && machineOption === options[0])) {

            setUserScore((prevScore) => {
                const newScore = prevScore + 1;
                setWinner("User won")
                return newScore
            })

        } else if (
            (userOption === options[2] && machineOption === options[0]) ||
            (userOption === options[1] && machineOption === options[2]) ||
            (userOption === options[0] && machineOption === options[1])) {

            setMachineScore((prevScore) => {
                const newScore = prevScore + 1;
                setWinner("Machine won")
                return newScore
            })

        } else if (userOption === machineOption) {
            setWinner("Tie. No winners.")
        } else {
            setWinner("Select your move and the machine will select automaticaly")
        }
    }
    const handlePlayAgain = (restart: boolean) => {
        if (restart) {
            setUserScore(0)
            setMachineScore(0)
        }
        setSelectedOption(null)
        setWinner("Make your move")
        setAllowedPlay(true)
        setMachineSquare("?")
    }

    return (
        <>
            <div className='flex flex-col lg:flex-row justify-center p-5'>
                <div className='flex lg:flex-col lg:items-center lg:justify-start justify-center lg:w-1/5'>
                    <div className={`cursor-pointer lg:mb-5 lg:w-[10rem] lg:h-[10rem] w-[7rem] h-[7rem] p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${selectedOption && selectedOption !== options[0] ? 'hidden' : 'flex'} justify-center items-center`} onClick={() => handleSelectItem(options[0])}>
                        <p className=" text-[3rem]">{options[0]}</p>
                    </div>
                    <div className={`cursor-pointer lg:mb-5 lg:w-[10rem] lg:h-[10rem] w-[7rem] h-[7rem] p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${selectedOption && selectedOption !== options[1] ? 'hidden' : 'flex'} justify-center items-center`} onClick={() => handleSelectItem(options[1])}>
                        <p className=" text-[3rem]">{options[1]}</p>
                    </div>
                    <div className={`cursor-pointer lg:mb-5 lg:w-[10rem] lg:h-[10rem] w-[7rem] h-[7rem] p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${selectedOption && selectedOption !== options[2] ? 'hidden' : 'flex'} justify-center items-center`} onClick={() => handleSelectItem(options[2])}>
                        <p className=" text-[3rem]">{options[2]}</p>
                    </div>
                </div>
                <div className='flex flex-col text-center items-center lg:w-1/5'>
                    <p className="font-bold text-[2rem] my-5">{winner}</p>
                    <button
                        onClick={() => handlePlayAgain(false)}
                        className="w-1/2 text-white font-bold rounded-lg px-3 py-2 mb-5 transition ease-in bg-[#E84855] hover:bg-[#ff7480]"
                    >Play Again</button>
                    <button
                        onClick={() => handlePlayAgain(true)}
                        className="w-1/2 text-white font-bold rounded-lg px-3 py-2 mb-5 transition ease-in bg-[#E84855] hover:bg-[#ff7480]"
                    >New Game</button>
                    <button
                        onClick={() => setOpen(true)}
                        className="w-1/2 text-white font-bold rounded-lg px-3 py-2 mb-5 transition ease-in bg-[#0E6BA8] hover:bg-[#72b9e8]">Rules</button>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl">The Basics of the Game</h1>
                            <p>Despite its underlying complexity, the game's rules are straightforward. Players deliver hand signals representing rock, paper, or scissors, with the outcome determined by these three rules:</p>
                            <ol>
                                <li>Rock wins against scissors.</li>
                                <li>Scissors win against paper.</li>
                                <li>Paper wins against rock.</li>
                            </ol>
                            <hr className="border-t-sold border-1 border-grey" />
                            <div className="flex flex-row justify-center">
                                <button className="border border-neutral-300 rounded-lg py-2 px-3 bg-[#0E6BA8] hover:bg-[#72b9e8] text-white" onClick={() => setOpen(false)}>Close</button>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className='flex flex-col items-center lg:w-1/5'>
                    <div className="lg:w-[10rem] lg:h-[10rem] w-[7rem] h-[7rem] p-5 bg-white border border-gray-200 rounded-lg shadow flex justify-center items-center">
                        <p className=" text-[3rem]">{machineSquare}</p>
                    </div>
                </div>
            </div>
        </>
    )
}