import React from 'react';
import { connect } from 'react-redux';

import { AppBar } from 'material-ui';
import RaisedButton from 'material-ui/lib/raised-button';

import moment from 'moment';

class Header extends React.Component {
  static propTypes = {
    date: React.PropTypes.string,
    packages: React.PropTypes.array,
    location: React.PropTypes.object,
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  render() {
    const date = this.props.date;
    const yesterday = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    const tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    const npmLastDay = moment.utc().subtract(1, 'days').startOf('day').format('YYYY-MM-DD');

    return (
      <AppBar
        id="header"
        style={{
          zIndex: 999,
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: '#bbb',
        }}

        iconElementLeft={
          <RaisedButton
            secondary
            label={yesterday}
            disabled={this.props.packages.length === 0}
            onClick={() => {
              this.context.router.push({
                pathname: `/${yesterday}`,
                query: this.props.location.query,
              });
            }}
          />
        }

        title={date}
        titleStyle={{
          textAlign: 'center',
        }}

        iconStyleRight={{
          marginTop: '13px',
        }}
        iconElementRight={
        <RaisedButton
          secondary
          label={tomorrow}
          disabled={this.props.packages.length === 0 || date >= npmLastDay}
          onClick={() => {
            this.context.router.push({
              pathname: `/${tomorrow}`,
              query: this.props.location.query,
            });
          }}
        />
        }
      />
    );
  }
}

export default connect(
  state => state,
)(Header);
