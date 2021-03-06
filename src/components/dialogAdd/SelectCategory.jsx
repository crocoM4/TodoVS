﻿import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import labels from '../../constants/labels';
import Category from '../Category';
import { ADD_ARGUMENT } from '../../constants/steps';
import { showMessageInfo } from '../../actions/messageActions';


class SelectCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: undefined,
    };
    this.onCategoryClick = this.onCategoryClick.bind(this);
    this.onButtonNextClick = this.onButtonNextClick.bind(this);
  }

  onCategoryClick(category) {
    this.setState({ selectedCategory: category });
  }

  onButtonNextClick() {
    const { selectedCategory } = this.state;
    const { onNext, dispatch } = this.props;
    if (selectedCategory === undefined) {
      dispatch(showMessageInfo(labels.msgSelectCategory));
      return;
    }
    onNext({ stepId: ADD_ARGUMENT, options: { selectedCategory } });
  }

  render() {
    const { categoriesList } = this.props;
    const { selectedCategory } = this.state;
    return (
      <div className="content-select-category">
        <h2>Choose a CATEGORY</h2>
        <div id="content-categories">
          {
            categoriesList.map(category => (
              (category.id !== '0')
              ? <Category
                key={category.id}
                category={category}
                selected={selectedCategory !== undefined && category.id === selectedCategory.id}
                onClick={this.onCategoryClick}
              />
              : undefined
            ))
          }
        </div>
        <div>
          <button
            className="main-button"
            onClick={this.onButtonNextClick}
          >
            NEXT
          </button>
        </div>
      </div>
    );
  }
}

SelectCategory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onNext: PropTypes.func.isRequired,
};

const mapStateToProp = state => (
  {
    categoriesList: state.todoFilters.categories,
  }
);

export default connect(mapStateToProp)(SelectCategory);
