import { useEffect, useState } from "react"

const CountDown = ({ onTimeUp }) => {
    const [count, setCount] = useState(300)

    const toHHMMSS = (secs) => {
        const secNum = parseInt(secs, 10)
        const hours = Math.floor(secNum / 3600)
        const minutes = Math.floor(secNum / 60) % 60
        const seconds = secNum % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    useEffect(() => {
        if (count === 0) return onTimeUp()

        const timer = setInterval(() => {
            setCount(count - 1)
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [count])

    return (
        <div className="countdown-container">
            {toHHMMSS(count)}
        </div>
    )
}

export default CountDown