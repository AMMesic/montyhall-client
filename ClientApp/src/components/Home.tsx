import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
  <div>
    <h1>Welcome to the Monty Hall Game</h1>
    <p>Monty Hall game is where you play the game with cars.</p>
    <p>Simulation is where you pass in how many time you want to simulate the game and whether you want to stay with the choosen door or switch.</p>
    
    <ul>
      <li><strong>Monty Hall Game</strong>Behind the doors is 2 goats and 1 car. To win the game, you need to pick the door where the car is. After your first pick of door, you'll get another chance wether you want to stay with that door or change.</li>
      <li><strong>Monty Hall Simulation</strong>In here you can simulate how many iterations you want to play the game. This simulation demostrates the chances to win if you stay with the chosen door or switch.</li>
    </ul>
  </div>
);

export default connect()(Home);

