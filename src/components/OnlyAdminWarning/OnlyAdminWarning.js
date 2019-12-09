import React, { Component } from 'react';

// This component is a very basic, unstyled custom message that is rendered if a non admin user knows the url of an admin only view
// The navigation bar will only conditionally render if the user is an admin, so this component should not be used too frequently
// Rendered from AdminProtectedRoute
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
} // End OnlyAdminWarning component

export default OnlyAdminWarning;