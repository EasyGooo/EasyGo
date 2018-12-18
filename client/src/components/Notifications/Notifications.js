import React, { Component } from 'react'
var ReactDOM = require('react-dom');
 
require('onsenui'); // This needs to be imported to bootstrap the components.
var Ons = require('react-onsenui');
export default class Notifications extends Component {
    constructor(props) {
        super(props)
var MyPage = React.createClass({
    getInitialState: function() {
      return {
        items: [
          {
            title: 'Alert notification',
            fn: () => ons.notification.alert('An error has occurred!')
          },
          {
            title: 'Confirmation',
            fn: () => ons.notification.confirm('Are you ready?')
          },
          {
            title: 'Prompt',
            fn: () => ons.notification.prompt('What\'s your name?')
          },
          {
            title: 'Toast',
            fn: () => ons.notification.toast('Toast')
          }
        ]
      };
    },
  
    renderRow(row) {
      return (
        <Ons.ListItem key={row.title} tappable onClick={row.fn}>
        {row.title}
        </Ons.ListItem>
      );
    },
  
    renderToolbar() {
      return (
        <Ons.Toolbar>
        <div className='center'>Notifications</div>
        </Ons.Toolbar>
      );
    },
  
    render: function() {
      return (
        <Ons.Page renderToolbar={this.renderToolbar}>
        <Ons.List dataSource={this.state.items} renderRow={this.renderRow} />
        </Ons.Page>
      );
    }
  });
  
  ons.ready(function() {
    ReactDOM.render(<MyPage />, document.getElementById('app'));
  })
}}