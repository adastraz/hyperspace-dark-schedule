import axios from 'axios'
export const FETCHING_START = 'FETCHING_START'
export const FETCHING_ERROR = 'FETCHING_ERROR'
export const FETCHING_SUCCESS = 'FETCHING_SUCCESS'

export const getAllGames = () => dispatch => {
    dispatch({ type: FETCHING_START })
    axios.get('http://localhost:3300/api/schedule')
        .then(res => {
            dispatch({ type: FETCHING_SUCCESS, payload: res.data })
        })
        .catch(err => dispatch({ type: FETCHING_ERROR, payload: err}))
}

export const postGame = game => dispatch => {
    dispatch({ type: FETCHING_START })
    axios.post('http://localhost:3300/api/schedule', game)
        .then(res => {
            axios.get('http://localhost:3300/api/schedule')
                .then(res1 => {
                    dispatch({ type: FETCHING_SUCCESS, payload: res1.data })
                })
                .catch(err => dispatch({ type: FETCHING_ERROR, payload: err}))
        })
        .catch(err => dispatch({ type: FETCHING_ERROR, payload: err}))
}