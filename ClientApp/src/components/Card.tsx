import * as React from 'react';
import './Card.css';
import car from '../Assets/Car.png';
import goat from '../Assets/Goat.png';
import door from '../Assets/Door.png';

interface MyProps {
    door: number;
    goat: boolean;
    car?: boolean;
    isOpen: boolean;
    counter: number;
    isFlipped: string;
    hostGoat: boolean;
}

interface MyState {
    flip: boolean;
    isOpen: boolean;
    isCar?: boolean;
}
var revealedCar: boolean = false;
var count: number = 0;

class FlipCard extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            flip: false,
            isOpen: false,
        };
    };

    flip() {
        console.log(this.props.isOpen);
        this.setState({ flip: !this.state.flip });
        this.setState({ isCar: this.props.car });
        this.setState({ isOpen: this.props.isOpen });
        count += 1;
    }

    render() {
        return <div onClick={() => this.flip()} className="poster-container">
            <div className={this.getCard()} id={this.props.door.toString()}>
                <div className="pic">
                    <h1><img src={door} /> </h1>
                </div>
                <div className="pic back" >{this.getCarOrGoat()}</div>
            </div>
        </div>
    }

    getCarOrGoat = () => {
        if (count >= 2) {
            return this.props.car ? <img src={car} /> : <img src={goat} />;
        }

        if (this.props.goat && this.state.flip) {
            return "Open Door or switch?";
        }

        if (this.props.car && this.state.flip) {
            return "Open Door or switch?";
        }

        if (this.props.goat && !this.state.flip) {
            return this.props.car ? <img src={car} /> : <img src={goat} />;
        }
    }

    getCard = () => {
        if (this.state.flip) {
            if(this.state.isCar){
                revealedCar = true;
            }
            return "poster flipped";
        }

        if(revealedCar && this.props.hostGoat && count >= 1){
            console.log("true")
            return "poster flipped";
        }

        if ((this.props.hostGoat && count >= 1 && !revealedCar) || (this.props.goat && count >= 1 && !revealedCar)) {
            return "poster flipped";
        }

        if (this.props.counter >= 2) {
            return "poster flipped";
        }

        if (!this.state.flip) {
            return "poster";
        }
    }
}

     
export default FlipCard;