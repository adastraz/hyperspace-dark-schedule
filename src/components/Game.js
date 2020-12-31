import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const Game = props => {
    const { id } = useParams()
    const [game, setGame] = useState({})
    const [hdscore, setHDscore] = useState(0)
    const [oppscore, setOPPscore] = useState(0)

    useEffect(() => {   
        axios.get(`http://localhost:3300/api/schedule/${id}`)
            .then(res => {
                setGame(res.data)
                setHDscore(parseInt(res.data.hd_score))
                setOPPscore(parseInt(res.data.opp_team_score))
                console.log(res.data)
            })
    }, [])

    const changeScore = (team, operation) => {
        if(team == 'hd') {
            if (operation == '+'){
                //hd add score
                setHDscore(hdscore+1)
                console.log((hdscore+1).toString())
            } else {
                //hd minus score
                if (hdscore!=0) {
                    setHDscore(hdscore-1)
                    console.log((hdscore-1).toString())
                }
            }
        } else {
            if (operation == '+'){
                //opp add score
                setOPPscore(oppscore+1)
                console.log((oppscore+1).toString())
            } else {
                //opp minus score
                if (oppscore !=0) {
                    setOPPscore(oppscore-1)
                    console.log((oppscore-1).toString())
                }
            }
        }
    }

    return (
        <>
            <h1>Hyperspace Dark vs. {game.opp_team}</h1>
            <Link to='/'>List Games</Link>
            <div className='games'>  
                <div className='sideflex2'>
                    <p className='schedule'>{game.opp_team}</p>
                    <p className='schedule'>VS.</p>
                    <p className='schedule'>Hyperspace Dark</p>
                </div>
                <div className='sideflex2'>
                    <p className='schedule'>{game.opp_team} Score {oppscore}</p>
                    <p className='schedule'>-</p>
                    <p className='schedule'>HD Score {hdscore}</p>
                </div>
                <div className='datetime'>
                    <p className='schedule'>{game.date}</p>
                    <p className='schedule'>{game.time}</p>
                </div>
            </div>
            <div className='scorebuttons'>
                <button onClick={() => changeScore('hd', '+')}>HD +1</button>
                <button onClick={() => changeScore('hd', '-')}>HD -1</button>
                <button onClick={() => changeScore('opp', '+')}>OPP +1</button>
                <button onClick={() => changeScore('opp', '-')}>OPP -1</button>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
        schedule: state.schedule
    }
}

export default connect(mapStateToProps, { })(Game)