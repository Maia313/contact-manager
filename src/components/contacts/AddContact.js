import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInputGroup from '../layout/TextInputGroup';
// import uuid from 'uuid';

import { connect } from 'react-redux';
import { addContact } from '../../actions/contactActions';

const emptyState = {
  name: '',
  email: '',
  phone: '',
  error: {}
};

class AddContact extends Component {
  state = emptyState;

  onChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  onSubmit = event => {
    event.preventDefault();

    const { name, email, phone } = this.state;

    // Empty Form Input Validation
    if (name === '') {
      this.setState({ error: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      this.setState({ error: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ error: { phone: 'Phone number is required' } });
      return;
    }

    const newContact = {
      // id: uuid(),
      name,
      email,
      phone
    };

    this.props.addContact(newContact);

    // Clear State
    this.setState(emptyState);

    // Redirect to Home page
    this.props.history.push('/');
  };

  render() {
    const { name, email, phone, error } = this.state;
    return (
      <div className="card mb-3">
        <div className="card-header" align="center">
          Add Contact
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              value={name}
              placeholder="Enter Name..."
              onChange={this.onChange}
              error={error.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              value={email}
              placeholder="Enter Email..."
              type="email"
              onChange={this.onChange}
              error={error.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              value={phone}
              placeholder="Enter Phone Number..."
              onChange={this.onChange}
              error={error.phone}
            />
            <input
              type="submit"
              value="Add"
              className="btn btn-block btn-dark"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddContact.propTypes = {
  addContact: PropTypes.func.isRequired
};

export default connect(
  null,
  { addContact }
)(AddContact);
