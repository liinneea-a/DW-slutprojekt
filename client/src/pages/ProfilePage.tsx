import * as React from 'react';
import { CSSProperties } from "react";

function ProfilePage() {
    return (
        <div style={loginPageLayout}>
          <h1>Change your profile below</h1>
          <div style={tempFormLayout}>
          </div>
        </div>
    )
}

export default ProfilePage

const loginPageLayout: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem'
}

const tempFormLayout: CSSProperties = {
  display: 'flex',
  gap: '2rem',
  alignItems: 'center'
}