import React from 'react'
import { connect } from 'react-redux'

const Game = props => {
    return (
        <>
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