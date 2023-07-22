import { useState } from 'react'

const Button = ({text, handleClick}) => {
    return <button onClick={handleClick}>{text}</button>
}

const Statistics = ({values : {good, neutral, bad, all, average, positive}}) => {
    // const  = values;

    return <table>
        <tbody>
            <StatisticLine statText='good' statAmount={good}/>
            <StatisticLine statText='neutral' statAmount={neutral}/>
            <StatisticLine statText='bad' statAmount={bad}/>
            <StatisticLine statText='all' statAmount={all}/>
            <StatisticLine statText='average' statAmount={average}/>
            <StatisticLine statText='positive' statAmount={positive}/>
        </tbody>
    </table>
}

const StatisticLine = ({statText, statAmount}) => {
    const formattedText = statText === 'positive' ? statAmount + ' %' : statAmount;
    return <tr>
        <td>{statText}</td>
        <td>{formattedText}</td>
    </tr>;
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const [all, setAll] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState(0)

    const handleGoodClick = () => {
        const newGood = good + 1;
        setGood(newGood);
        calculateAndSetStats(newGood, neutral, bad);
    }

    const handleNeutralClick = () => {
        const newNeutral = neutral + 1;
        setNeutral(newNeutral);
        calculateAndSetStats(good, newNeutral, bad);
    }

    const handleBadClick = () => {
        const newBad = bad + 1;
        setBad(newBad);
        calculateAndSetStats(good, neutral, newBad);
    }

    const calculateAndSetStats = (good, neutral, bad) => {
        const all = good + neutral + bad;
        setAll(all);

        const avgScoreGood = good * 1;
        const avgScoreNeutral = neutral * 0;
        const avgScoreBad = bad * -1;

        setAverage((avgScoreGood + avgScoreNeutral + avgScoreBad) / all);
        setPositive((good / all) * 100);
    }

    const canShowStatistics = () => good > 0 || bad > 0 || neutral > 0

    return (
        <div>
            <h1>give feedback</h1>
            <Button text='good' handleClick={handleGoodClick}/>
            <Button text='neutral' handleClick={handleNeutralClick}/>
            <Button text='bad' handleClick={handleBadClick}/>
            <h1>statistics</h1>
            {canShowStatistics() ? (
                <>
                    <Statistics values={{good, neutral, bad, all, average, positive}} />
                </>
            ) : 
                <div>No Feedback given</div>
            }

        </div>
    )
}

export default App