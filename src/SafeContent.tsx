/* eslint-disable react/no-danger */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import DOMPurify from "dompurify";

const SafeContent: React.FC<{ content: string }> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default SafeContent;