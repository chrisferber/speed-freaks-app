import React, { Component } from 'react';

class OnlyAdminWarning extends Component {

  render() {
    return (
     <div>
         <h1>Access Restricted</h1>
         <p>This page may only be viewed if you have administrative rights. If you are an organizer you should have administrative rights to 
             create, delete, and edit track events as well as see all attendees and volunteers for any events you create. If you
             believe you do have administrative rights try logging out and then back in, your session may have timed out. Otherwise
             contact your car club Speed Freaks administrator to grant you administrative access.
         </p>
     </div>
    );
  }
}

export default OnlyAdminWarning;