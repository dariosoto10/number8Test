import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import { regularExpressions } from './libs/regularExpressions'
import CalendarLayout from './CalendarLayout'
import './CalendarUI.css';

class CalendarUI extends Component {
  constructor (props) {
    super(props);
    this.state = {
      startDate: '',
      countryCode: '',
      numberDays: '',
      formErrors: {startDate: '', countryCode: '', numberDays: ''},
      startDateValid: false,
      passwordValid: false,
      numberDays: 0,
      formValid: false,
      displayCalendar: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  addDays = (date, days) => {
    var result = new Date(date)
    result.setDate(result.getDate() + days )
    return result
  }

  goBack = () => {
    this.setState({displayCalendar: false})
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let startDateValid = this.state.startDateValid;
    let countryCodeValid = this.state.countryCodeValid;
    let numberDaysValid = this.state.numberDays

    switch(fieldName) {
      case 'startDate':
        startDateValid = value.match(regularExpressions.startDate);
        fieldValidationErrors.startDate = startDateValid ? '' : ' is invalid';
        break;
      case 'countryCode':
        countryCodeValid = value.match(regularExpressions.countryCode);
        fieldValidationErrors.countryCode = countryCodeValid ? '': ' is too short';
        break;
      case 'numberDays':
        numberDaysValid = value.length > 0 ? '' : 'need be > 0'
        fieldValidationErrors.numberDays = numberDaysValid
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    startDateValid: startDateValid,
                    countryCodeValid: countryCodeValid,
                    numberDaysValid: numberDaysValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.startDateValid && this.state.countryCodeValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (

      <div className="demoForm">
        { !this.state.displayCalendar ?
          <div>
          <h2>Setting a calendar</h2>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.startDate)}`}>
            <label htmlFor="startDate">Start Date</label>
            <input type="startDate" required className="form-control" name="startDate"
              placeholder="For Example 07/11/1992"
              value={this.state.startDate}
              onChange={this.handleUserInput}  />
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.countryCode)}`}>
            <label htmlFor="countryCode">Country Code</label>
            <input type="countryCode" className="form-control" name="countryCode"
              placeholder="For Example US"
              value={this.state.countryCode}
              onChange={this.handleUserInput}  />
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.numberDays)}`}>
            <label htmlFor="numberDays">Number Days</label>
            <input type="numberDays" className="form-control" name="numberDays"
              onChange={this.handleUserInput}  />
          </div>
          <button className="btn btn-primary" disabled={!this.state.formValid} onClick={() => {this.setState({displayCalendar: true})}}>show calendar</button>
          </div>: <CalendarLayout goBack={() => {this.goBack()}} date={this.state.startDate} max={this.addDays(this.state.startDate, this.state.numberDays - 1)} calendarType={this.state.countryCode != 'US' ? 'ISO 8601' : 'US'}/>
        }

      </div>
    )
  }
}

export default CalendarUI;
