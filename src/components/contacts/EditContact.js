import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getContact, updateContact } from '../../actions/contactActions';

const emptyState = {
  name: '',
  email: '',
  phone: '',
  errors: {}
};
class EditContact extends Component {
  state = emptyState;

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContact(id);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email, phone } = nextProps.contact;
    this.setState({
      name,
      email,
      phone
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email, phone } = this.state;
    const { id } = this.props.match.params;

    // Check For Errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const updatedContact = {
      id,
      name,
      email,
      phone
    };

    this.props.updateContact(updatedContact);

    // Clear State
    this.setState(emptyState);

    this.props.history.push('/');
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Edit Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
            />
            <input
              type="submit"
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contact: state.contactReducer.contact
});

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getContact, updateContact }
)(EditContact);
