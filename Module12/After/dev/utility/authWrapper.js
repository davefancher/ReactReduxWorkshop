import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export default function(AuthComponent) {
  class IsAuthenticated extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      const authenticated = localStorage.getItem("username");
      if (!authenticated) {
        this.context.router.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      const authenticated = localStorage.getItem("username");
      if (!authenticated) {
        this.context.router.history.push('/');
      }
    }

    render() {
      return <AuthComponent {...this.props} />
    }
  }

  return withRouter(IsAuthenticated);
}
