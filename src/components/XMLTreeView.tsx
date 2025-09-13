import React, { useState } from 'react';

interface XMLTreeViewProps {
  xmlDoc: Document;
  theme: 'dark' | 'light';
}

interface XMLNodeViewProps {
  node: Node;
  theme: 'dark' | 'light';
  depth: number;
}

const XMLNodeView: React.FC<XMLNodeViewProps> = ({ node, theme, depth }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const indent = depth * 20;
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const tagColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
  const attrNameColor = theme === 'dark' ? 'text-green-400' : 'text-green-600';
  const attrValueColor = theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600';
  const textValueColor = theme === 'dark' ? 'text-orange-400' : 'text-orange-600';

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim();
    if (!text) return null;
    
    return (
      <div style={{ marginLeft: `${indent}px` }} className={`${textValueColor} font-mono text-sm`}>
        "{text}"
      </div>
    );
  }

  if (node.nodeType === Node.COMMENT_NODE) {
    return (
      <div style={{ marginLeft: `${indent}px` }} className="text-gray-500 font-mono text-sm italic">
        &lt;!-- {node.textContent} --&gt;
      </div>
    );
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;
    const hasChildren = element.childNodes.length > 0;
    const attributes = Array.from(element.attributes);
    
    // Check if element only contains text
    const onlyTextContent = element.childNodes.length === 1 && 
                           element.childNodes[0].nodeType === Node.TEXT_NODE;
    const textContent = onlyTextContent ? element.textContent?.trim() : '';

    return (
      <div className="font-mono text-sm">
        <div 
          style={{ marginLeft: `${indent}px` }}
          className="flex items-start cursor-pointer hover:bg-opacity-10 hover:bg-blue-500 rounded px-1"
          onClick={() => hasChildren && !onlyTextContent && setIsExpanded(!isExpanded)}
        >
          {hasChildren && !onlyTextContent && (
            <span className={`mr-1 ${textColor}`}>
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
          <span className={tagColor}>&lt;{element.tagName}</span>
          {attributes.map((attr, index) => (
            <span key={index}>
              {' '}
              <span className={attrNameColor}>{attr.name}</span>
              <span className={textColor}>=</span>
              <span className={attrValueColor}>"{attr.value}"</span>
            </span>
          ))}
          {onlyTextContent ? (
            <>
              <span className={tagColor}>&gt;</span>
              <span className={textValueColor}>{textContent}</span>
              <span className={tagColor}>&lt;/{element.tagName}&gt;</span>
            </>
          ) : hasChildren ? (
            <span className={tagColor}>&gt;</span>
          ) : (
            <span className={tagColor}>/&gt;</span>
          )}
        </div>
        
        {hasChildren && !onlyTextContent && isExpanded && (
          <div>
            {Array.from(element.childNodes).map((child, index) => (
              <XMLNodeView 
                key={index} 
                node={child} 
                theme={theme} 
                depth={depth + 1}
              />
            ))}
            <div style={{ marginLeft: `${indent}px` }} className={tagColor}>
              &lt;/{element.tagName}&gt;
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

const XMLTreeView: React.FC<XMLTreeViewProps> = ({ xmlDoc, theme }) => {
  const rootElement = xmlDoc.documentElement;
  
  if (!rootElement) {
    return (
      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
        No valid XML structure found
      </div>
    );
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded p-2`}>
      <XMLNodeView node={rootElement} theme={theme} depth={0} />
    </div>
  );
};

export default XMLTreeView;