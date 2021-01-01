import React, { useEffect, useState } from 'react'
import { getAllGames } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const ListGames = props => {
    const [search, setSearch] = useState('')
    const [list, setlist] = useState([])

    useEffect(() => {
        props.getAllGames()
    }, [])

    useEffect(() => {
        setlist(props.schedule.filter(game => {
            return game.opp_team.toLowerCase().includes(search.toLowerCase())
        }))
    }, [search])

    return (
        <div>
            <h1>Schedule</h1>
            <input
                type='search'
                onChange={e => setSearch(e.target.value)}
                placeholder='Search'
                className='titlesides'
            /> 
            {list.length == props.schedule.length ?
                props.schedule.map(ele => (
                    <Link to={`/game/${ele.id}`}>
                        <div className='games'>  
                            <div className='sideflex2'>
                                <p className='schedule'>{ele.opp_team}</p>
                                <p className='schedule'>VS.</p>
                                <p className='schedule'>Hyperspace Dark</p>
                            </div>
                            <div className='sideflex2'>
                                <p className='schedule'>{ele.opp_team_score}</p>
                                <p className='schedule'>-</p>
                                <p className='schedule'>{ele.hd_score}</p>
                            </div>
                            <div className='datetime'>
                                <p className='schedule'>{ele.date}</p>
                                <p className='schedule'>{ele.time}</p>
                            </div>
                        </div>
                    </Link>
                )) :
                list.map(ele => (
                    <Link to={`/game/${ele.id}`}>
                        <div className='games'>  
                            <div className='sideflex2'>
                                <p className='schedule'>{ele.opp_team}</p>
                                <p className='schedule'>VS.</p>
                                <p className='schedule'>Hyperspace Dark</p>
                            </div>
                            <div className='sideflex2'>
                                <p className='schedule'>{ele.opp_team_score}</p>
                                <p className='schedule'>-</p>
                                <p className='schedule'>{ele.hd_score}</p>
                            </div>
                            <div className='datetime'>
                                <p className='schedule'>{ele.date}</p>
                                <p className='schedule'>{ele.time}</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
        schedule: state.schedule
    }
}

export default connect(mapStateToProps, { getAllGames })(ListGames)
