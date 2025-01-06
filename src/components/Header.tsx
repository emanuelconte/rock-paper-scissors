interface Props {
    userScore: number;
    machineScore: number;
}

export default function Header({ userScore, machineScore }: Props) {
    return (
        <>
            <div className='bg-[#0E6BA8] text-white text-center p-5'>
                <div>
                    <p className="text-[1rem] font-bold">Scoreboard</p>
                </div>
                <div className='flex lg:justify-center '>
                    <div className="lg:w-1/5 w-1/3 lg:text-[2rem] text-[1.5rem] font-bold">User</div>
                    <div className="lg:w-1/5 w-1/3 lg:text-[2rem] text-[1.5rem] font-bold">{userScore} x {machineScore}</div>
                    <div className="lg:w-1/5 w-1/3 lg:text-[2rem] text-[1.5rem] font-bold">Machine</div>
                </div>
            </div>
        </>
    )
}