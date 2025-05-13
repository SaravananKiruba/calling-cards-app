import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const Comment = ({ author, avatar, content, datetime }) => {
  return (
    <div className="flex items-start mb-4">
      <div className="mr-3">
        {avatar}
      </div>
      <div className="flex-1">
        <div className="mb-1">
          {author && <Text strong className="mr-2">{author}</Text>}
          {datetime && <Text type="secondary" className="text-sm">{datetime}</Text>}
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Comment;
