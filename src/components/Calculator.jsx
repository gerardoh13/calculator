import React from "react";
import { Card, Button, Col, Row } from 'react-bootstrap';
import '../App.css'


class Calculator extends React.Component {
    state = {
        firstVal: '0',
        operator: '',
        currentVal: '0',
        equalPress: false
    }

    equals = () => {
        let answer = this.answerSwitch()
            this.setState({
                currentVal: answer,
                firstVal: '0',
                operator: '',
                equalPress: true
            })
    }
    answerSwitch = () => {
        const { currentVal, firstVal, operator } = this.state
        let answer = 0
        let first = parseFloat(firstVal)
        let current = parseFloat(currentVal)
        switch (operator) {
            case '*':
                answer = first * current
            break;
            case '/':
                answer = first / current
            break;
            case '+':
                answer = first + current
            break;
            case '-':
                answer = first - current
            break;
            default:
                console.log('default')
        }
        console.log(answer)
        return answer
    }
    handleNums = (e) => {
        const { currentVal, equalPress } = this.state
        let val = e.target.value
        if (val === '.' && currentVal.includes('.')){
            return
        }
        if (equalPress){
            this.setState({
                currentVal: val,
                firstVal: '0',
                operator: '',
                equalPress: false
            })
        }
        else if (currentVal === '0'){
            this.setState({currentVal: val})
        } else {
            this.setState ({currentVal: currentVal + val})
        }
    }
    
    handleOp = (e) => {
        const { operator, equalPress, currentVal } = this.state
        let op = e.target.value
        if (equalPress){
            this.setState({
                equalPress: false
            })
        }
        if (op === '-' && currentVal === '0'){
            this.setState({
                currentVal: op
            })
            return
        }
        if (operator !== '' && !Number.isInteger(parseFloat(currentVal))){
            this.setState({
                operator: op,
                currentVal: '0'
            })
            return
        }
        if (operator !== '' && Number.isInteger(parseFloat(currentVal))){
            if (currentVal === '0'){
                this.setState({
                    operator: op
                })
                return
            }
            this.setState({
                firstVal: this.answerSwitch(),
                currentVal: '0',
                operator: op
            })
        } else {
            this.setState({
                firstVal: currentVal,
                currentVal: '0', 
                operator: op
            })
        }
    }

    clear = () => {
        this.setState({
            currentVal: '0',
            firstVal: '0',
            operator: '',
            equalPress: false
        })
    }
    backSpace = () => {
        const { currentVal } = this.state
        let split = currentVal.split('')
        if (split.length === 1 && split[0] === '0'){
            return
        } else if (split.length === 1 && split[0] !== '0'){
            this.setState({
                currentVal: '0'
            })
        } else {
            split.pop()
            split.join('')
            this.setState({
                currentVal: split.join('')
            })
        }
    }
    render() {
        return (
            <div>
                <Card className="m-auto border">
                <div className="display">
                <h3 >{this.state.firstVal} {this.state.operator}</h3>
                <h1 id="display" >{this.state.currentVal}</h1>
                </div>
                <Row>
                <Col md={6} xs={6} className="padr">
                    <Button id="clear" className=" btn-danger block" onClick={this.clear}>AC</Button>
                </Col>
                <Col md={3} xs={3} className="pad">
                    <Button id="divide" value={'/'} onClick={this.handleOp} className="btn-secondary block">/</Button>
                </Col>
                <Col md={3} xs={3} className='padl'>
                    <Button id="multiply" value={'*'} onClick={this.handleOp} className="btn-secondary block">X</Button>
                </Col>
                </Row>
                <Row>
                <Col md={3} xs={3} className='padr'>
                    <Button id="seven" value={'7'} onClick={this.handleNums} className=" btn-dark block">7</Button>
                </Col>
                <Col md={3} xs={3} className='pad'>
                    <Button id="eight" value={'8'} onClick={this.handleNums} className="btn-dark block">8</Button>
                </Col>
                <Col md={3} xs={3} className='pad'>
                    <Button id="nine" value={'9'} onClick={this.handleNums} className="btn-dark block">9</Button>
                </Col>
                <Col md={3} xs={3} className='padl'>
                    <Button id="subtract" value={'-'} onClick={this.handleOp} className="btn-secondary block">-</Button>
                </Col>
                </Row>
                <Row>
                <Col md={3} xs={3} className='padr'>
                    <Button id="four" value={'4'} onClick={this.handleNums} className=" btn-dark block">4</Button>
                </Col>
                <Col md={3} xs={3} className='pad'>
                    <Button id="five" value={'5'} onClick={this.handleNums} className="btn-dark block">5</Button>
                </Col>
                <Col md={3} xs={3} className='pad'>
                    <Button id="six" value={'6'} onClick={this.handleNums} className="btn-dark block">6</Button>
                </Col>
                <Col md={3} xs={3} className='padl'>
                    <Button id="add" value={'+'} onClick={this.handleOp} className="btn-secondary block">+</Button>
                </Col>
                </Row>
                <Row>
                <Col md={3} xs={3} className='padr'>
                    <Button id="one" value={'1'} onClick={this.handleNums} className=" btn-dark block">1</Button>
                </Col>
                <Col md={3} xs={3} className='pad'>
                    <Button id="two" value={'2'} onClick={this.handleNums} className="btn-dark block">2</Button>
                </Col>
                <Col md={3} xs={3} className='pad'>
                    <Button id="three" value={'3'} onClick={this.handleNums} className="btn-dark block">3</Button>
                </Col>
                <Col md={3} xs={3} className='padl'>
                    <Button onClick={this.backSpace} className="btn-secondary block">del</Button>
                </Col>
                </Row>
                <Row>
                <Col md={6} xs={6} className='padr'>
                    <Button id="zero" value={'0'} onClick={this.handleNums} className=" btn-dark block">0</Button>
                </Col>
                <Col md={3} xs={3} className='pad'>
                    <Button id="decimal" value={'.'} onClick={this.handleNums} className="btn-dark block">.</Button>
                </Col>
                <Col md={3} xs={3} className='padl'>
                    <Button id="equals" onClick={this.equals} className="btn-primary block">=</Button>
                </Col>
                </Row>
                </Card>
                <br/>
                <p className="footer">by gerardoh13</p>
            </div>
        );
    }
}

export default Calculator