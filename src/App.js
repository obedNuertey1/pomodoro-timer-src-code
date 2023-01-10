import React, { startTransition } from 'react';
import './style.css';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Card, Nav, Col, Row, Image} from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import thunk from 'redux-thunk';
import {PropTypes} from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faSquareCaretUp, faSquareCaretDown, faPlay, faPause, faRotate} from "@fortawesome/free-solid-svg-icons";
import beep from "./audio/25+5 clock alarm.mp3";


//#######################REDUX PART 1############################
const [UPDATE_S_TRUTH, UPDATE_B_TRUTH, UPDATE_IF_BLOCK_TRUTH, UPDATE_ELSE_BLOCK_TRUTH, UPDATE_MM, UPDATE_MM2, UPDATE_SESSION_INTERVAL, UPDATE_BREAK_INTERVAL] = ["UPDATE_S_TRUTH", "UPDATE_B_TRUTH", "UPDATE_IF_BLOCK", "UPDATE_ELSE_BLOCK", "UPDATE_MM", "UPDATE_MM2", "UPDATE_SESSION_INTERVAL", "UPDATE_BREAK_INTERVAL"];

//sTruth
const sTruthAction = (sTruth)=>({
	type: UPDATE_S_TRUTH,
	sTruth: sTruth
});

const sTruthReducer = (state=true, action) => {
	switch(action.type){
		case UPDATE_S_TRUTH:
			return action.sTruth;
		default:
			return state;
	}
};
//###############

//bTruth
const bTruthAction = (bTruth) => ({
	type: UPDATE_B_TRUTH,
	bTruth: bTruth
});

const bTruthReducer = (state=false, action) => {
	switch(action.type){
		case UPDATE_B_TRUTH:
			return action.bTruth;
		default:
			return state;
	}
};
//########################################

//ifBlockTruth
const ifBlockTruthAction = (ifBlockTruth) => ({
	type: UPDATE_IF_BLOCK_TRUTH,
	ifBlockTruth: ifBlockTruth
});

const ifBlockReducer = (state=false, action) => {
	switch(action.type){
		case UPDATE_IF_BLOCK_TRUTH:
			return action.ifBlockTruth;
		default:
			return state;
	}
};
//##################################

//elseBlockTruth
const elseBlockTruthAction = (elseBlockTruth) => ({
	type: UPDATE_ELSE_BLOCK_TRUTH,
	elseBlockTruth: elseBlockTruth
});

const elseBlockReducer = (state=true, action) => {
	switch(action.type){
		case UPDATE_ELSE_BLOCK_TRUTH:
			return action.elseBlockTruth;
		default:
			return state;
	}
};

//mmTruth
const mmAction = (mm) => ({
	type: UPDATE_MM,
	mm: mm
});

const mmReducer = (state=0, action)=>{
	switch(action.type){
		case UPDATE_MM:
			return action.mm;
		default:
			return state;
	}
}
//################################################

//mm2Truth
const mm2Action = (mm2) => ({
	type: UPDATE_MM2,
	mm2: mm2
});

const mm2Reducer = (state=0, action) => {
	switch(action.type){
		case UPDATE_MM2:
			return action.mm2;
		default:
			return state;
	}
};
//#####################################################

//sessionInterval
const sessionIntervalAction = (sessionInterval)=>({
	type: UPDATE_SESSION_INTERVAL,
	sessionInterval: sessionInterval
});

const sessionIntervalReducer = (state=25, action)=>{
	switch(action.type){
		case UPDATE_SESSION_INTERVAL:
			return action.sessionInterval;
		default:
			return state;
	}
};
//###########################################

//breakInterval
const breakIntervalAction = (breakInterval) => ({
	type: UPDATE_BREAK_INTERVAL,
	breakInterval: breakInterval
});

const breakIntervalReducer = (state=5, action) => {
	switch(action.type){
		case UPDATE_BREAK_INTERVAL:
			return action.breakInterval;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	sTruth: sTruthReducer,
	bTruth: bTruthReducer,
	ifBlockTruth: ifBlockReducer,
	elseBlockTruth: elseBlockReducer,
	mm: mmReducer,
	mm2: mm2Reducer,
	sessionInterval: sessionIntervalReducer,
	breakInterval: breakIntervalReducer
});

const store = createStore(rootReducer);


//###############################################################
class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			break: {
				name: "Break",
				breakLength: 5
			},
			session: {
				name: "Session",
				sessionLength: 25
			},
			timeLeft: "25:00",
			timerLabel: "Session",
			toggleStartStop: false,
			isStartStopClicked: false,
			interval: 0
		};
		this.breakIncrement = this.breakIncrement.bind(this);
		this.breakDecrement = this.breakDecrement.bind(this);
		this.sessionIncrement = this.sessionIncrement.bind(this);
		this.sessionDecrement = this.sessionDecrement.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.startStop = this.startStop.bind(this);
		this.reset = this.reset.bind(this);
		this.alarmColor = this.alarmColor.bind(this);
	}

	breakIncrement(){
		if(this.state.isStartStopClicked === false){
			if(this.state.break.breakLength < 60){
				this.props.update_mm2(0);
				this.setState(state => ({
					break: {name: "Break", breakLength: state.break.breakLength + 1}
				}));
				this.props.updateBreakInterval(this.state.break.breakLength + 1);
			}
		}
		this.props.updateIfBlockTruth(false);
		this.props.updateElseBlockTruth(true);
		this.props.updateStruth(true);
		this.props.updateBtruth(false);
	}

	breakDecrement(){
		if(this.state.isStartStopClicked === false){
			if(this.state.break.breakLength > 1){
				this.props.update_mm2(0);
				this.setState(state => ({
					break: {name: "Break", breakLength: state.break.breakLength - 1}}));
					this.props.updateBreakInterval(this.state.break.breakLength - 1);
				}
		}
		this.props.updateIfBlockTruth(false);
		this.props.updateElseBlockTruth(true);
		this.props.updateStruth(true);
		this.props.updateBtruth(false);
	}

	sessionIncrement(){
		if(this.state.isStartStopClicked === false){
			this.setState(state => {
				if(state.session.sessionLength < 60){
					this.props.updateSessionInterval(state.session.sessionLength + 1);
					if(state.session.sessionLength <= 8){
						this.props.update_mm(0);
						return {
							session: {name: "Session", sessionLength: state.session.sessionLength + 1},
							timerLabel: state.session.name,
							timeLeft: `0${state.session.sessionLength + 1}:00`
						};
					}else if(state.session.sessionLength > 8 ){
						this.props.update_mm(0);
						return {
							session: {name: "Session", sessionLength: state.session.sessionLength + 1},
							timerLabel: state.session.name,
							timeLeft: `${state.session.sessionLength + 1}:00`
						};
					}
				}
			});
		}
		this.props.updateIfBlockTruth(false);
		this.props.updateElseBlockTruth(true);
		this.props.updateStruth(true);
		this.props.updateBtruth(false);
	}

	sessionDecrement(){
		if(this.state.isStartStopClicked === false){
			this.setState(state => {
				if(state.session.sessionLength > 1){
					this.props.updateSessionInterval(state.session.sessionLength - 1);
					if(state.session.sessionLength <= 10){
						this.props.update_mm(0);
						return {
							session: {name: "Session", sessionLength: state.session.sessionLength - 1},
							timerLabel: state.session.name,
							timeLeft: `0${state.session.sessionLength - 1}:00`
						};
					}else if(state.session.sessionLength > 10){
						this.props.update_mm(0);
						return{
							session: {name: "Session", sessionLength: state.session.sessionLength - 1},
							timerLabel: state.session.name,
							timeLeft: `${state.session.sessionLength - 1}:00`
						};
					}
				}
			});
		}
		this.props.updateIfBlockTruth(false);
		this.props.updateElseBlockTruth(true);
		this.props.updateStruth(true);
		this.props.updateBtruth(false);
	}

	start(){
		if(this.props.ifBlockTruth === true){
			//if(this.props.sessionInterval < 1){
			//	$('.display').addClass('changeToRed');
			//}else{
			//	$('.display').removeClass('changeToRed');
			//}
			if(this.props.breakInterval === 0 && this.props.mm2 === 0 && this.props.bTruth === true){
				//$('#beep').trigger("play");
				this.setState(state => ({timerLabel: state.session.name}));
				this.props.update_mm2(0);
				this.props.updateSessionInterval(this.state.session.sessionLength);
				this.props.updateBreakInterval(this.state.break.breakLength)
				this.props.updateIfBlockTruth(false);
				this.props.updateElseBlockTruth(true);
				this.props.updateBtruth(false);
				this.props.updateStruth(true);
			}else if(this.props.mm2 === 0 && this.props.breakInterval === this.state.break.breakLength){
				this.setState(state => ({timerLabel: state.break.name}));
			}else{
				if(this.props.mm2 === 0){
					this.props.updateBreakInterval(this.props.breakInterval - 1);
					this.props.update_mm2(59);
					this.setState(state => ({timerLabel: state.break.name}));
				}else{
					if(this.props.mm2 === 59){
						this.props.update_mm2(this.props.mm2 - 1);
						this.setState(state => ({timerLabel: state.break.name}));
					}else{
						this.props.update_mm2(this.props.mm2 - 1);
						this.setState(state => ({timerLabel: state.break.name}));
					}
				}
			}
			
			this.setState(() => {
				if(this.props.breakInterval < 10 && this.props.mm2 < 10){
					return {timeLeft: `0${this.props.breakInterval}:0${this.props.mm2}`};
				}else if(this.props.breakInterval < 10 && this.props.mm2 >= 10){
					return {timeLeft: `0${this.props.breakInterval}:${this.props.mm2}`};
				}else if(this.props.breakInterval >= 10 && this.props.mm2 < 10){
					return {timeLeft: `${this.props.breakInterval}:0${this.props.mm2}`};
				}else if(this.props.breakInterval >= 10 && this.props.mm2 >= 10){
					return {timeLeft: `${this.props.breakInterval}:${this.props.mm2}`};
				}
			});
			
			if(this.props.mm2 === 0 && this.props.breakInterval === this.state.break.breakLength){
				this.props.update_mm2(59);
				this.props.updateBreakInterval(this.props.breakInterval - 1);
			}
			
		}else if(this.props.elseBlockTruth === true){
			//if(this.props.sessionInterval < 1){
			//	$('.display').addClass('changeToRed');
			//}else{
			//	$('.display').removeClass('changeToRed');
			//}
			if(this.props.sessionInterval === 0 && this.props.mm === 0 && this.props.sTruth === true){
				//$('#beep').trigger("play");
				this.setState(state => ({timerLabel: state.break.name}));
				this.props.update_mm(0);
				this.props.updateBreakInterval(this.state.break.breakLength);
				this.props.update_mm2(0);
				this.props.updateSessionInterval(this.state.session.sessionLength);
				this.props.updateIfBlockTruth(true);
				this.props.updateElseBlockTruth(false);
				this.props.updateStruth(false);
				this.props.updateBtruth(true);
			}else if(this.props.sessionInterval === this.state.session.sessionLength && this.props.mm === 0){
				this.setState(state => ({timerLabel: state.session.name}));
			}else{
				if(this.props.mm === 0){
					this.props.updateSessionInterval(this.props.sessionInterval - 1);
					this.props.update_mm(59);
					this.setState(state => ({timerLabel: state.session.name}));
					console.log("334 works");
				}else{
					if(this.props.mm === 59){
						this.props.update_mm(this.props.mm - 1);
						this.setState(state => ({timerLabel: state.session.name}));
						console.log("339 works");
					}else{
						this.props.update_mm(this.props.mm - 1);
						this.setState(state => ({timerLabel: state.session.name}));
						console.log("343 works");
					}
					console.log("345 works");
				}
			}
			
			
			this.setState(() => {
				if(this.props.sessionInterval < 10 && this.props.mm < 10){
					return {timeLeft: `0${this.props.sessionInterval}:0${this.props.mm}`};
				}else if(this.props.sessionInterval < 10 && this.props.mm >= 10){
					return {timeLeft: `0${this.props.sessionInterval}:${this.props.mm}`};
				}else if(this.props.sessionInterval >= 10 && this.props.mm < 10){
					return {timeLeft: `${this.props.sessionInterval}:0${this.props.mm}`};
				}else if(this.props.sessionInterval >= 10 && this.props.mm >= 10){
					return {timeLeft: `${this.props.sessionInterval}:${this.props.mm}`};
				}
			});
			
			if(this.props.mm === 0 && this.props.sessionInterval === this.state.session.sessionLength){
				this.props.update_mm(59);
				this.props.updateSessionInterval(this.props.sessionInterval - 1);
			}
		}
	}
	stop(i){
		clearInterval(i);
	}

	startStop(){
		if(this.state.toggleStartStop === false){
			let val = setInterval(this.start, 1000);
			this.setState({
				toggleStartStop: true,
				isStartStopClicked: true,
				interval: val 
			});
		}else if(this.state.toggleStartStop === true){
			this.stop(this.state.interval);
			this.setState({
				toggleStartStop: false,
				isStartStopClicked: false,
			});
		}
	}

	reset(){
		clearInterval(this.state.interval);
		this.setState({
			break: {
				name: "Break",
				breakLength: 5
			},
			session: {
				name: "Session",
				sessionLength: 25
			},
			timeLeft: "25:00",
			timerLabel: "Session",
			interval: 0,
			toggleStartStop: false,
			isStartStopClicked: false
		});
		$('#beep').trigger('pause');
		$('#beep').currentTime = 0;
		this.props.update_mm2(0);
		this.props.update_mm(0);
		this.props.updateBreakInterval(5);
		this.props.updateSessionInterval(25);
		this.props.updateIfBlockTruth(false);
		this.props.updateElseBlockTruth(true);
		this.props.updateStruth(true);
		this.props.updateBtruth(false);
	}

	shouldComponentUpdate(nextState, nextProps){
		return true;
	}

	componentWillMount(){
		$('body').addClass('myBackground');
	}

	componentDidMount(){
	}

	alarmColor(){
		if((this.props.sessionInterval === 0 && this.props.mm <=59)||(this.props.breakInterval === 0 && this.props.mm2 <= 59)){
			$('.display').addClass('changeToRed');
		}else{
			$('.display').removeClass('changeToRed');
		}

		if((this.props.sessionInterval === 0 && this.props.mm === 0)||(this.props.breakInterval === 0 && this.props.mm2 === 0)){
			$('#beep').trigger("play");
		}
	}

	componentWillUnmount(){
	}

	render(){
		this.alarmColor();
		return(
			<div className="mainContainer">
				<audio className='clip' id='beep' src={beep}></audio>
				<div className="clockContainer">
					<div className="title clockComponent">POMODORO TIMER</div>
					<div className="timeLengths clockComponent">
						<div className="breakComponent lengthComponents">
							<div id="break-label">Break Length</div>
							<div className="elements">
								<button id="break-increment" onClick={this.breakIncrement}><FontAwesomeIcon icon={faArrowUp} className="fontAwesome" /></button>
								<div id="break-length">{this.state.break.breakLength}</div>
								<button id="break-decrement" onClick={this.breakDecrement}><FontAwesomeIcon icon={faArrowDown} className="fontAwesome" /></button>
							</div>
						</div>
						<div className="sessionComponent lengthComponents">
							<div id="session-label">Session Length</div>
							<div className="elements">
								<button id="session-increment" onClick={this.sessionIncrement}><FontAwesomeIcon icon={faArrowUp} className="fontAwesome" /></button>
								<div id="session-length">{this.state.session.sessionLength}</div>
								<button id="session-decrement" onClick={this.sessionDecrement}><FontAwesomeIcon icon={faArrowDown} className="fontAwesome" /></button>
							</div>
						</div>
					</div>
					<div className="display clockComponent">
						<div id="timer-label">{this.state.timerLabel}</div>
						<div id='time-left' >{this.state.timeLeft}</div>
					</div>
					<div className="displayControls clockComponent">
						<button id="start_stop" onClick={this.startStop}><FontAwesomeIcon icon={faPlay} className="fontAwesome" /><FontAwesomeIcon icon={faPause} /></button>
						<button id="reset" onClick={this.reset}><FontAwesomeIcon icon={faRotate} className="fontAwesome" /></button>
					</div>
				</div>
			</div>
		);
	}
};

//REDUX PART 2
const mapStateToProps = (state) => ({
	sTruth: state.sTruth,
	bTruth: state.bTruth,
	ifBlockTruth: state.ifBlockTruth,
	elseBlockTruth: state.elseBlockTruth,
	mm: state.mm,
	mm2: state.mm2,
	sessionInterval: state.sessionInterval,
	breakInterval: state.breakInterval
});

const mapDispatchToProps = (dispatch) => ({
	updateStruth: (sTruth) => (dispatch(sTruthAction(sTruth))),
	updateBtruth: (bTruth) => (dispatch(bTruthAction(bTruth))),
	updateIfBlockTruth: (ifBlockTruth) => (dispatch(ifBlockTruthAction(ifBlockTruth))),
	updateElseBlockTruth: (elseBlockTruth) => (dispatch(elseBlockTruthAction(elseBlockTruth))),
	update_mm: (mm)=> (dispatch(mmAction(mm))),
	update_mm2: (mm2) => (dispatch(mm2Action(mm2))),
	updateSessionInterval: (sessionInterval) => (dispatch(sessionIntervalAction(sessionInterval))),
	updateBreakInterval: (breakInterval) => (dispatch(breakIntervalAction(breakInterval)))
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Main);

export default class AppWrapper extends React.Component{
	render(){
		return(
			<Provider store={store}>
				<Container />
			</Provider>
		);
	}
}
//###################################

//export default Main;
