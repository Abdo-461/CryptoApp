import React, { Component } from 'react'
import Landing from './Layout/Landing'
import Navbar from './Layout/Navbar'

export default class Home extends Component {
    render() {
        return (
            <div>
               <Navbar />


               <Landing />
            </div>
        )
    }
}
