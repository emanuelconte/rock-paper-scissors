import { useState } from "react";
import Header from "./components/Header";
import Game from './components/Game';

export default function App() {
  let [userScore, setUserScore] = useState(0);
  let [machineScore, setMachineScore] = useState(0);

  return (
    <>
      <Header userScore={userScore} machineScore={machineScore} />
      <Game setUserScore={setUserScore} setMachineScore={setMachineScore} />
    </>
  )
}