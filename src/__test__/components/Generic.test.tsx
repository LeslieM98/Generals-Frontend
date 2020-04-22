import React from 'react'
import TestComponent from '../TestComponent'
import ReactDOM from 'react-dom'

it("Tests if tests work", () => {
    const div = document.createElement("div")
    ReactDOM.render(<TestComponent></TestComponent>, div)
})