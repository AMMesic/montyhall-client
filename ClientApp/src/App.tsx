import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import FetchMonty from './components/FetchMontyHall';
import FetchMontyHallSimulation from './components/FetchMontyHallSimulation'

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-monty' component={FetchMonty} />
        <Route path='/montyhall-simulation' component={FetchMontyHallSimulation} />
    </Layout>
);

