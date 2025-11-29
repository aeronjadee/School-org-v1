// This file appears to be a duplicate or alternative to MemberTable.jsx
// If you need a different implementation, you can use this file
// Otherwise, MemberTable.jsx is already being used in Members.jsx

import React from 'react';
import MemberTable from './MemberTable';

// Re-export MemberTable as MembersTable for backward compatibility
const MembersTable = (props) => {
  return <MemberTable {...props} />;
};

export default MembersTable;

