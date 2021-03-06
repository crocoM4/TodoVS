﻿import React from 'react';
import PropTypes from 'prop-types';
import Collapse from './anims/Collapse';
import Fade from './anims/Fade';
import ButtonCompleteArgument from './ButtonCompleteArgument';
import ButtonDeleteArgument from './ButtonDeleteArgument';
import { toSimpleDateFormat } from '../utils/Common';

class TodoArgument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.renderDate = this.renderDate.bind(this);
  }

  onTitleClick() {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  }

  renderDate() {
    const { argument } = this.props;
    if (argument.completed) {
      return (
        <p className="complete-date">{`completed ${(argument.completedAt) ? toSimpleDateFormat(argument.completedAt) : ''}`}</p>
      );
    }
    return (
      <p className="complete-within-date">{`to complete within ${(argument.todoWithin) ? toSimpleDateFormat(argument.todoWithin) : 'not set'}`}</p>
    );
  }

  render() {
    const { argument, onDelete, onComplete } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="argument-item">
        <div className="argument-header">
          <p
            className={`argument-title ${(argument.completed) ? 'argument-title-completed' : ''}`}
            onClick={() => this.onTitleClick()}
            role="presentation"
          >
            {argument.title}
          </p>
          <Fade in={collapsed}>
            <ButtonDeleteArgument
              onClick={onDelete}
            />
          </Fade>
          {
            onComplete !== undefined &&
            <ButtonCompleteArgument
              onClick={onComplete}
              completed={argument.completed}
            />
          }
        </div>
        <div className="argument-date">
          {this.renderDate()}
        </div>
        <Collapse in={collapsed}>
          <div key={argument.description} className="argument-body">
            <p className="argument-description">
              {
                (argument.description !== undefined && argument.description !== '')
                ? argument.description : <span className="empty">No description to show :(</span>
              }
            </p>
          </div>
        </Collapse>
      </div>
    );
  }
}

TodoArgument.propTypes = {
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  argument: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    category: PropTypes.shape({}).isRequired,
    completedAt: PropTypes.shape({}),
  }).isRequired,
};

TodoArgument.defaultProps = {
  onDelete: undefined,
  onComplete: undefined,
};

export default TodoArgument;
