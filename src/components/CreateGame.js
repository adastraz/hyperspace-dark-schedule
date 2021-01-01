import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { postGame } from '../actions'

const CreateGame = props => {
    const [visability, setVisability] = useState(false)
    const [error, setError] = useState(false)
    const [newgame, setNewgame] = useState({
        opp_team: '',
        opp_teamimg: '',
        date: '',
        game: '',
        time: ''
    })

    const handleChanges = e => {
        setNewgame({
            ...newgame,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        if (newgame.opp_team.length > 0 && newgame.date.length > 0 && newgame.time.length > 0 && newgame.game === 'rl' || newgame.game === 'valorant') {
            console.log('meets requirements')
            props.postGame(newgame)
            setNewgame({
                opp_team: '',
                opp_teamimg: '',
                date: '',
                game: '',
                time: ''
            })
        } else {
            console.log('does not')
            setError(true)
        }
        
    }

    return (
        <>
            <button onClick={() => setVisability(!visability)}>Create Game</button>
            <div className={visability ? 'create' : 'hidden'}>
                <form onSubmit={submitForm}>
                    <input
                        type='time'
                        name='time'
                        id='time'
                        onChange={handleChanges}
                        value={newgame.time}
                    />
                    <input
                        type='date'
                        name='date'
                        id='date'
                        onChange={handleChanges}
                        value={newgame.date}
                    />
                    <input
                        type='text'
                        name='opp_team'
                        id='opp_team'
                        onChange={handleChanges}
                        value={newgame.opp_team}
                        placeholder='team name'
                    />
                    <input
                        type='text'
                        name='opp_teamimg'
                        id='opp_teamimg'
                        onChange={handleChanges}
                        value={newgame.opp_teamimg}
                        placeholder='link to other teams logo'
                    />
                    <input
                        type='text'
                        name='game'
                        id='game'
                        onChange={handleChanges}
                        value={newgame.game}
                        placeholder='"rl" or "valorant"'
                    />
                    <button type='submit'>Post</button>
                </form>
                <button className={error ? 'create' : 'hidden'} onClick={() => setError(!error)}>Does not meet requirements</button>
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

export default connect(mapStateToProps, { postGame })(CreateGame)