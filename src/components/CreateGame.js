import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {  } from '../actions'

const CreateGame = () => {
    const [visability, setVisability] = useState(false)
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
        console.log(newgame)
        setNewgame({
            opp_team: '',
            opp_teamimg: '',
            date: '',
            game: '',
            time: ''
        })
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
                    />
                    <input
                        type='text'
                        name='opp_teamimg'
                        id='opp_teamimg'
                        onChange={handleChanges}
                        value={newgame.opp_teamimg}
                    />
                    <input
                        type='text'
                        name='game'
                        id='game'
                        onChange={handleChanges}
                        value={newgame.game}
                        placeholder='Game type ("rl" or "valorant")'
                    />
                    <button type='submit'>Post</button>
                </form>
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

export default connect(mapStateToProps, {  })(CreateGame)