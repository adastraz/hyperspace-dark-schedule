import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { editGame } from '../actions'

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
                props.editGame({hd_score: (hdscore+1).toString()}, id)
            } else {
                //hd minus score
                if (hdscore!=0) {
                    setHDscore(hdscore-1)
                    props.editGame({hd_score: (hdscore-1).toString()}, id)
                }
            }
        } else {
            if (operation == '+'){
                //opp add score
                setOPPscore(oppscore+1)
                props.editGame({opp_team_score: (oppscore+1).toString()}, id)
            } else {
                //opp minus score
                if (oppscore !=0) {
                    setOPPscore(oppscore-1)
                    props.editGame({opp_team_score: (oppscore-1).toString()}, id)
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
                    <h1 className='schedule'>{game.opp_team} Score {oppscore}</h1>
                    <p className='schedule'>-</p>
                    <h1 className='schedule'>HD Score {hdscore}</h1>
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
            <button>Edit Game Details</button>
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

export default connect(mapStateToProps, { editGame })(Game)