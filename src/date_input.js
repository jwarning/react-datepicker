/** @jsx React.DOM */

var DateUtil = require('./util/date');

var DateInput = React.createClass({

  getDefaultProps: function() {
    return {
      dateFormat: 'YYYY-MM-DD'
    };
  },

  getInitialState: function() {
    return {
      value: this.props.date ?
        this.props.date.format(this.props.dateFormat) :
        this.props.date
    };
  },

  componentDidMount: function() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps: function(newProps) {
    this.toggleFocus(newProps.focus);

    this.setState({
      value: newProps.date ?
        newProps.date.format(this.props.dateFormat) :
        newProps.date
    });
  },

  toggleFocus: function(focus) {
    if (focus) {
      this.refs.input.getDOMNode().focus();
    } else {
      this.refs.input.getDOMNode().blur();
    }
  },

  handleChange: function(event) {
    var date = moment(event.target.value, this.props.dateFormat, true);

    if (this.isValueAValidDate()) {
      this.setState({
        value: event.target.value
      });

      this.props.setSelected(new DateUtil(date));
    } else {
      this.setState({
        value: null
      });

      this.props.setSelected(null);
    }
  },

  isValueAValidDate: function() {
    var date = moment(event.target.value, this.props.dateFormat, true);

    return date.isValid();
  },

  handleKeyDown: function(event) {
    switch(event.key) {
    case "Enter":
      event.preventDefault();
      this.props.handleEnter();
      break;
    }
  },

  handleClick: function(event) {
    this.props.handleClick(event);
  },

  render: function() {
    return <input
      ref="input"
      type="text"
      value={this.state.value}
      placeholder={this.props.placeholderText}
      onClick={this.handleClick}
      onKeyDown={this.handleKeyDown}
      onFocus={this.props.onFocus}
      onChange={this.handleChange}
      className="datepicker__input" />;
  }
});

module.exports = DateInput;
