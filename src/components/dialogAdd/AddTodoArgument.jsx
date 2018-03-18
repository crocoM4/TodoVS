﻿import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DONE } from '../../constants/steps';
import { addTodoArgument } from '../../actions/todoArgumentsActions';

class AddTodoArgument extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
    };
    this.onInputTitleTextChange = this.onInputTitleTextChange.bind(this);
    this.onInputDescriptionTextChange = this.onInputDescriptionTextChange.bind(this);
    this.onButtonAddClick = this.onButtonAddClick.bind(this);
    this.onTodoArgumentCreated = this.onTodoArgumentCreated.bind(this);
  }

  onInputTitleTextChange(e) {
    this.setState({ title: e.target.value });
  }
  onInputDescriptionTextChange(e) {
    this.setState({ description: e.target.value });
  }

  onButtonAddClick() {
    const { options, dispatch } = this.props;
    const { title, description } = this.state;
    if (title === '') {
      return;
    }
    dispatch(addTodoArgument(
      title, description,
      options.selectedCategory, this.onTodoArgumentCreated,
    ));
  }

  onTodoArgumentCreated() {
    const { onNext } = this.props;
    onNext({ stepId: DONE, options: { } });
  }

  render() {
    const { selectedCategory } = this.props.options;
    return (
      <div className="content-add-argument">
        <h2>Add new ARGUMENT</h2>
        <h3>
          for the category:
          <span className="label-category-name">
            {` ${selectedCategory.name}`}
          </span>
        </h3>
        <div className="content-fields">
          <input
            className="main-input"
            type="text"
            placeholder="Type the title"
            onChange={this.onInputTitleTextChange}
          />
          <input
            className="main-input"
            type="text"
            placeholder="Type the description"
            onChange={this.onInputDescriptionTextChange}
          />
        </div>
        <div>
          <button
            className="main-button"
            onClick={this.onButtonAddClick}
          >
            ADD
          </button>
        </div>
      </div>
    );
  }
}

AddTodoArgument.propTypes = {
  dispatch: PropTypes.func.isRequired,
  options: PropTypes.shape({
    selectedCategory: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
};

export default connect()(AddTodoArgument);
