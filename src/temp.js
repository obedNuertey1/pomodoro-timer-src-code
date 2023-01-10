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
			interval: 0,
			mm: 0,
			mm2: 0,
			sessionInterval: 25,
			breakInterval: 5,
		};
		this.breakIncrement = this.breakIncrement.bind(this);
		this.breakDecrement = this.breakDecrement.bind(this);
		this.sessionIncrement = this.sessionIncrement.bind(this);
		this.sessionDecrement = this.sessionDecrement.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.startStop = this.startStop.bind(this);
		this.reset = this.reset.bind(this);
	}

	breakIncrement(){
		if(this.state.isStartStopClicked === false){
			this.setState(state => {
				if(state.break.breakLength < 60){
					return {
						break: {name: "Break", breakLength: state.break.breakLength + 1},
						mm2: 0
					};
				}
			});
		}
		this.setState(state => ({
			breakInterval: state.break.breakLength
		}));
		this.props.updateIfBlockTruth(false);
		this.props.updateElseBlockTruth(true);
		this.props.updateStruth(true);
		this.props.updateBtruth(false);
	}

	breakDecrement(){
		if(this.state.isStartStopClicked === false){
			this.setState(state => {
				if(state.break.breakLength > 1){
					return {
						break: {name: "Break", breakLength: state.break.breakLength - 1}, mm2: 0
					};
				}
			});
			this.setState(state => ({
				breakInterval: state.break.breakLength
			}));
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
					if(state.session.sessionLength <= 8){
						return {
							session: {name: "Session", sessionLength: state.session.sessionLength + 1},
							timerLabel: state.session.name,
							timeLeft: `0${state.session.sessionLength + 1}:00`, mm: 0
						};
					}else if(state.session.sessionLength > 8 ){
						return {
							session: {name: "Session", sessionLength: state.session.sessionLength + 1},
							timerLabel: state.session.name,
							timeLeft: `${state.session.sessionLength + 1}:00`, mm: 0
						};
					}
				}
			});
			this.setState(state => ({
				sessionInterval: state.session.sessionLength
			}));
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
					if(state.session.sessionLength <= 10){
						return {
							session: {name: "Session", sessionLength: state.session.sessionLength - 1},
							timerLabel: state.session.name,
							timeLeft: `0${state.session.sessionLength - 1}:00`, mm: 0
						};
					}else if(state.session.sessionLength > 10){
						return {
							session: {name: "Session", sessionLength: state.session.sessionLength - 1},
							timerLabel: state.session.name,
							timeLeft: `${state.session.sessionLength - 1}:00`,  mm: 0
						};
					}
				}
			});
			this.setState(state => ({
				sessionInterval: state.session.sessionLength
			}));
		}
		this.props.updateIfBlockTruth(false);
		this.props.updateElseBlockTruth(true);
		this.props.updateStruth(true);
		this.props.updateBtruth(false);
	}

	start(){
		if(this.props.ifBlockTruth === true){
			//this.setState(state => ({timerLabel: state.break.name}));
			if(this.state.breakInterval === 0 && this.state.mm2 === 0 && this.props.bTruth === true){
				this.setState(state => ({mm2:0, breakInterval: state.break.breakLength, sessionInterval: state.session.sessionLength})); // changed breakInterval: state.break.breakLength - 1 to breakInterval: state.break.breakLength
				this.props.updateIfBlockTruth(false);
				this.props.updateElseBlockTruth(true);
				this.props.updateBtruth(false);
				this.props.updateStruth(true);
				//this.setState(state => {
				//	if(state.mm2 === 0 && state.breakInterval > 0){
				//		return {mm2: 0, breakInterval: state.break.breakLength};
				//	}
				//	//else{
				//	//	if(state.mm2 === 59){
				//	//		return {mm2: state.mm2 - 1};
				//	//	}else{
				//	//		return {mm2: state.mm2 - 1};
				//	//	}
				//	//}
				//});
			}else if(this.state.mm2 === 0 && this.state.breakInterval === this.state.break.breakLength){
				this.setState(state => ({timerLabel: state.break.name}));
			}else{
				this.setState(state => {
					if(state.mm2 === 0){
						return {mm2: 59, breakInterval: state.breakInterval - 1, timerLabel: state.break.name};
					}else{
						if(state.mm2 === 59){
							return {mm2: state.mm2 - 1, timerLabel: state.break.name};
						}else{
							return {mm2: state.mm2 - 1, timerLabel: state.break.name};
						}
					}
				});
			}

			this.setState(state => {
				if(state.breakInterval < 10 && state.mm2 < 10){
					return {timeLeft: `0${state.breakInterval}:0${state.mm2}`};
				}else if(state.breakInterval < 10 && state.mm2 >= 10){
					return {timeLeft: `0${state.breakInterval}:${state.mm2}`};
				}else if(state.breakInterval >= 10 && state.mm2 < 10){
					return {timeLeft: `${state.breakInterval}:0${state.mm2}`};
				}else if(state.breakInterval >= 10 && state.mm2 >= 10){
					return {timeLeft: `${state.breakInterval}:${state.mm2}`};
				}
			});

			if(this.state.mm2 === 0 && this.state.breakInterval === this.state.break.breakLength){
				this.setState(state => ({
					mm2: 60,
					breakInterval: state.breakInterval - 1
				}));
			}

		}else if(this.props.elseBlockTruth === true){
			//this.setState(state => ({timerLabel: state.session.name}));
			if(this.state.sessionInterval === 0 && this.state.mm === 0 && this.props.sTruth === true){
				this.setState(state => ({mm: 0, sessionInterval: state.session.sessionLength, breakInterval: state.break.breakLength}));//changed sessionInterval: state.session.sessionLength - 1 to sessionInterval: state.session.sessionLength
				this.props.updateIfBlockTruth(true);
				this.props.updateElseBlockTruth(false);
				this.props.updateStruth(false);
				this.props.updateBtruth(true);
				//this.setState(state => {
				//	if(state.mm2 === 0 && state.sessionInterval > 0){
				//		return {mm2: 0, sessionInterval: state.session.sessionLength};
				//	}
				//	//else{
				//	//	if(state.mm2 === 59){
				//	//		return {mm2: state.mm2 - 1};
				//	//	}else{
				//	//		return {mm2: state.mm2 - 1};
				//	//	}
				//	//}
				//});
			}else if(this.state.sessionInterval === this.state.session.sessionLength && this.state.mm === 0){
				this.setState(state => ({timerLabel: state.session.name}));
			}else{
				this.setState(state => {
					if(state.mm === 0){
						return {timerLabel: state.session.name, mm: 59, sessionInterval: state.sessionInterval - 1};
					}else{
						if(state.mm === 59){
							return {timerLabel: state.session.name, mm: state.mm - 1};
						}else{
							return {timerLabel: state.session.name, mm: state.mm - 1};
						}
					}
				});
			}


			this.setState(state => {
				if(state.sessionInterval < 10 && state.mm < 10){
					return {timeLeft: `0${state.sessionInterval}:0${state.mm}`};
				}else if(state.sessionInterval < 10 && state.mm >= 10){
					return {timeLeft: `0${state.sessionInterval}:${state.mm}`};
				}else if(state.sessionInterval >= 10 && state.mm < 10){
					return {timeLeft: `${state.sessionInterval}:0${state.mm}`};
				}else if(state.sessionInterval >= 10 && state.mm >= 10){
					return {timeLeft: `${state.sessionInterval}:${state.mm}`};
				}
			});

			if(this.state.mm === 0 && this.state.sessionInterval === this.state.session.sessionLength){
				this.setState(state => ({
					mm: 60,
					sessionInterval: state.sessionInterval - 1
				}));
			}

		}
	}
	stop(i){
		clearInterval(i);
		console.log("Stop is clicked");
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
			isStartStopClicked: false,
			mm: 0,
			mm2: 0,
			sessionInterval: 25,
			breakInterval: 5
		});
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

	componentWillUnmount(){
	}

	render(){
		return(
			<div className="mainContainer">
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