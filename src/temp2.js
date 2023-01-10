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
			if(this.state.session.sessionLength < 60 && this.state.session.sessionLength > 1){
				if(this.state.session.sessionLength <= 8){
					this.props.update_mm(0);
					this.setState(state => ({
						session: {name: "Session", sessionLength: state.session.sessionLength + 1},
						timerLabel: state.session.name,
						timeLeft: `0${state.session.sessionLength + 1}:00`
					}));
				}else if(this.state.session.sessionLength > 8 ){
					this.props.update_mm(0);
					this.setState(state => ({
						session: {name: "Session", sessionLength: state.session.sessionLength + 1},
						timerLabel: state.session.name,
						timeLeft: `${state.session.sessionLength + 1}:00`
					}));
				}
				this.props.updateSessionInterval(this.state.session.sessionLength + 1);
			}
		}
		this.props.updateIfBlockTruth(false);
		this.props.updateElseBlockTruth(true);
		this.props.updateStruth(true);
		this.props.updateBtruth(false);
	}

	sessionDecrement(){
		if(this.state.isStartStopClicked === false){
			if(this.state.session.sessionLength > 1 && this.state.session.sessionLength < 60){
				if(this.state.session.sessionLength <= 10){
					this.props.update_mm(0);
					this.setState(state => ({
						session: {name: "Session", sessionLength: state.session.sessionLength - 1},
						timerLabel: state.session.name,
						timeLeft: `0${state.session.sessionLength - 1}:00`
					}));
				}else if(this.state.session.sessionLength > 10){
					this.props.update_mm(0);
					this.setState(state => ({
						session: {name: "Session", sessionLength: state.session.sessionLength - 1},
						timerLabel: state.session.name,
						timeLeft: `${state.session.sessionLength - 1}:00`
					}));
				}
				this.props.updateSessionInterval(this.state.session.sessionLength - 1);
			}
		}
		this.props.updateIfBlockTruth(false);
		this.props.updateElseBlockTruth(true);
		this.props.updateStruth(true);
		this.props.updateBtruth(false);
	}

	start(){
		if(this.props.ifBlockTruth === true){
			if(this.props.breakInterval === 0 && this.props.mm2 === 0 && this.props.bTruth === true){
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
			if(this.props.sessionInterval === 0 && this.props.mm === 0 && this.props.sTruth === true){
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
			let val = setInterval(this.start, 500);
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
				<p>this.props.sessionInterval = {this.props.sessionInterval}, this.props.breakInterval = {this.props.breakInterval}, this.props.mm = {this.props.mm}, this.props.mm2 = {this.props.mm2}</p>
			</div>
		);
	}
};
