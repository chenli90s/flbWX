import React from 'react';
import Routers from './router';
import './asset/css/public.css';
import Hashes from 'jshashes'

// const SHA1 = new Hashes.SHA1

// console.log('SHA1: ' + SHA1.hex('Sample text!'))

class App extends React.Component {
    render() {
        return (
            <Routers/>
        )
    }
}

export default App;
