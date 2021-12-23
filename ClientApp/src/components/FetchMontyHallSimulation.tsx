import { connect } from 'react-redux';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import './FetchMontyHall.css'
import React from 'react';

type MontyHallProps = {
    inputValue: string;
    choice: boolean;
    dropdownOpen: boolean;
    results: MontyHallSimulation[];
    isLoading: boolean;
    response: boolean;
    countWins: number;
}

    interface myState {
        inputValue: string;
        choice: boolean;
        dropdownOpen: boolean;
        results: MontyHallSimulation[];
        isLoading: boolean;
        response: boolean;
        countWins: number;
    }

    interface MontyHallSimulation {
        wins?: number;
        isSwitchDoor?: boolean;
    }
    
    class FetchMontyHallSimulation extends React.PureComponent<MontyHallProps, myState> {
        constructor(props: any) {
            super(props);
            this.state = {
                inputValue: "",
                dropdownOpen: false,
                choice: false,
                results: [],
                isLoading: false,
                response: false,
                countWins: 0
            };
        };

        public render() {
            return (
                <React.Fragment>
                    {this.sendData()}
                </React.Fragment>
            );
        }
        
        private sendData() {
            return (
                <div className="wrap-container" >
                    <Form>
                        <FormGroup>
                        <Label>
                            <h2>Simulations</h2>
                            <Input type="number" onChange={e => this.updateInputValue(e)}></Input>
                        </Label>
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <legend>Choose whether to switch door or not</legend>
                            <FormGroup check>
                                <Label check>
                                    <Input onClick={() => this.getValueFromDropDown(true)} type="radio" name="radio1" />{' '}
                                    Switch door
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input onClick={() => this.getValueFromDropDown(false)} type="radio"name="radio1" />{' '}
                                    Stay with choosed door
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <Button onClick={() => this.submitSimulation()}>Submit</Button>
            {this.state.response === true 
            ? <h1>Times won: {Object.values(this.state.results)[0]}</h1>
            : <h1></h1>}
                    </Form>
                </div>
            );
        }

        private async getData(){
           await fetch(`${process.env.REACT_APP_BASE_URL}/MontyHallGame/simulation/${this.state.inputValue}/${this.state.choice}`)
            .then(response => response.json())
            .then( data => {
                this.setState({results : data});
            });            
        }
        
        updateInputValue(e: any) {
            this.setState({
              inputValue: e.target.value
            });
          }

        getValueFromDropDown(isSwitched: boolean){
            if(isSwitched){
                this.setState({
                    choice: true
                });
            } else {
                this.setState({
                    choice: false
                });
            }
        }

        async submitSimulation(){
            this.setState({isLoading: true});
            await this.getData();
            this.setState({isLoading: false});
            this.setState({response: true});
        }
    }

    export default connect()(FetchMontyHallSimulation);