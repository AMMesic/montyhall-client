import * as React from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import { connect } from 'react-redux';
import FlipCard from './Card'
import './FetchMontyHall.css'

type MontyHallProps = {
    counter: number;
    montyHall: MontyHall[];
}

interface myState {
    counter: number;
    montyHall: MontyHall[];
    inputValue: number;
}

interface MontyHall {
    door: number;
    goat: boolean;
    car: boolean;
    isOpen: boolean;
    revealGoat: boolean;
}

class FetchMontyHall extends React.PureComponent<MontyHallProps, myState> {
    constructor(props: any) {
        super(props);
        this.state = {
            counter: 0,
            montyHall: [],
            inputValue: 3

        };
    };

    public componentDidMount() {
        this.fetchData();
    }

    private async fetchData(){
        await fetch(`${process.env.REACT_APP_BASE_URL}/MontyHallGame/doors/${this.state.inputValue}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({montyHall: data})
                });
    }

    public render() {
        return (
            <React.Fragment>
                {this.returnData()}
            </React.Fragment>
        );
    }

    flip() {
        this.setState({ counter: this.state.counter + 1 });
    }

    private returnData() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label>
                            <h2>Enter how many doors if you want to play with more doors</h2>
                            <p>It is three doors from start</p>
                            <Input type="number" onChange={e => this.updateInputValue(e)}></Input>
                        </Label>
                        <Button onClick={() => this.submitSimulation()}>Submit</Button>
                    </FormGroup>
                </Form>
                <div onClick={() => this.flip()} className="wrap-container" >
                
                {this.state.montyHall.map((montyhall) =>
                <FlipCard
                key={montyhall.door}
                car={montyhall.car}
                isOpen={!montyhall.isOpen}
                door={montyhall.door}
                goat={montyhall.goat}
                counter={this.state.counter}
                isFlipped="flipped"
                hostGoat={montyhall.revealGoat}
                >
                </FlipCard>
                )}
                </div>
            </div>
            
        );
    }

    updateInputValue(e: any) {
        this.setState({
          inputValue: e.target.value
        });
    }
    
    async submitSimulation(){
        await this.fetchData();
    }
}

export default connect()(FetchMontyHall);
