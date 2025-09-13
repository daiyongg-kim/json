import React, { useState, useCallback } from 'react';

interface JSONTreeViewProps {
  data: any;
  theme: 'dark' | 'light';
  depth?: number;
}

const JSONTreeView: React.FC<JSONTreeViewProps> = ({ data, theme, depth = 0 }) => {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggleCollapse = useCallback((path: string) => {
    setCollapsed(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  }, []);

  const renderValue = (value: any, key: string, path: string): React.ReactNode => {
    const isCollapsed = collapsed.has(path);
    const indent = depth * 20;
    const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const keyColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
    const stringColor = theme === 'dark' ? 'text-green-400' : 'text-green-600';
    const numberColor = theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600';
    const booleanColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-600';
    const nullColor = theme === 'dark' ? 'text-red-400' : 'text-red-600';

    if (value === null) {
      return (
        <div className="flex items-start" style={{ marginLeft: `${indent}px` }}>
          <span className={keyColor}>"{key}"</span>
          <span className={textColor}>: </span>
          <span className={nullColor}>null</span>
          <span className={textColor}>,</span>
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div className="flex items-start" style={{ marginLeft: `${indent}px` }}>
          <span className={keyColor}>"{key}"</span>
          <span className={textColor}>: </span>
          <span className={booleanColor}>{value.toString()}</span>
          <span className={textColor}>,</span>
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <div className="flex items-start" style={{ marginLeft: `${indent}px` }}>
          <span className={keyColor}>"{key}"</span>
          <span className={textColor}>: </span>
          <span className={numberColor}>{value}</span>
          <span className={textColor}>,</span>
        </div>
      );
    }

    if (typeof value === 'string') {
      return (
        <div className="flex items-start" style={{ marginLeft: `${indent}px` }}>
          <span className={keyColor}>"{key}"</span>
          <span className={textColor}>: </span>
          <span className={stringColor}>"{value}"</span>
          <span className={textColor}>,</span>
        </div>
      );
    }

    if (Array.isArray(value)) {
      const itemCount = value.length;
      return (
        <div>
          <div 
            className="flex items-start cursor-pointer hover:bg-gray-700 hover:bg-opacity-20 rounded px-1"
            style={{ marginLeft: `${indent}px` }}
            onClick={() => toggleCollapse(path)}
          >
            <span className="mr-1 select-none">{isCollapsed ? '▶' : '▼'}</span>
            <span className={keyColor}>"{key}"</span>
            <span className={textColor}>: [</span>
            {isCollapsed && <span className={textColor}>...] ({itemCount} items),</span>}
          </div>
          {!isCollapsed && (
            <>
              {value.map((item, index) => (
                <div key={index}>
                  {typeof item === 'object' && item !== null ? (
                    Array.isArray(item) ? (
                      <JSONTreeView 
                        data={{ [`[${index}]`]: item }} 
                        theme={theme}
                        depth={depth + 1}
                      />
                    ) : (
                      <div style={{ marginLeft: `${(depth + 1) * 20}px` }}>
                        <span className={textColor}>{'{'}</span>
                        <JSONTreeView 
                          data={item} 
                          theme={theme}
                          depth={depth + 2}
                        />
                        <span className={textColor} style={{ marginLeft: `${(depth + 1) * 20}px` }}>
                          {'}'}
                          {index < value.length - 1 && ','}
                        </span>
                      </div>
                    )
                  ) : (
                    <div style={{ marginLeft: `${(depth + 1) * 20}px` }}>
                      {typeof item === 'string' ? (
                        <span className={stringColor}>"{item}"</span>
                      ) : typeof item === 'number' ? (
                        <span className={numberColor}>{item}</span>
                      ) : typeof item === 'boolean' ? (
                        <span className={booleanColor}>{item.toString()}</span>
                      ) : item === null ? (
                        <span className={nullColor}>null</span>
                      ) : (
                        <span className={textColor}>{String(item)}</span>
                      )}
                      {index < value.length - 1 && <span className={textColor}>,</span>}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ marginLeft: `${indent}px` }}>
                <span className={textColor}>],</span>
              </div>
            </>
          )}
        </div>
      );
    }

    if (typeof value === 'object') {
      const keys = Object.keys(value);
      const itemCount = keys.length;
      return (
        <div>
          <div 
            className="flex items-start cursor-pointer hover:bg-gray-700 hover:bg-opacity-20 rounded px-1"
            style={{ marginLeft: `${indent}px` }}
            onClick={() => toggleCollapse(path)}
          >
            <span className="mr-1 select-none">{isCollapsed ? '▶' : '▼'}</span>
            <span className={keyColor}>"{key}"</span>
            <span className={textColor}>: {'{'}</span>
            {isCollapsed && <span className={textColor}>...{'}'} ({itemCount} keys),</span>}
          </div>
          {!isCollapsed && (
            <>
              <JSONTreeView 
                data={value} 
                theme={theme}
                depth={depth + 1}
              />
              <div style={{ marginLeft: `${indent}px` }}>
                <span className={textColor}>{'},'},</span>
              </div>
            </>
          )}
        </div>
      );
    }

    return null;
  };

  if (depth === 0) {
    const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    
    if (Array.isArray(data)) {
      const [isRootCollapsed, setIsRootCollapsed] = useState(false);
      return (
        <div className="font-mono text-sm">
          <div 
            className="cursor-pointer hover:bg-gray-700 hover:bg-opacity-20 rounded px-1"
            onClick={() => setIsRootCollapsed(!isRootCollapsed)}
          >
            <span className="mr-1 select-none">{isRootCollapsed ? '▶' : '▼'}</span>
            <span className={textColor}>[</span>
            {isRootCollapsed && <span className={textColor}>...] ({data.length} items)</span>}
          </div>
          {!isRootCollapsed && (
            <>
              {data.map((item, index) => (
                <div key={index}>
                  {typeof item === 'object' && item !== null ? (
                    Array.isArray(item) ? (
                      <JSONTreeView 
                        data={{ [`[${index}]`]: item }} 
                        theme={theme}
                        depth={1}
                      />
                    ) : (
                      <div style={{ marginLeft: '20px' }}>
                        <span className={textColor}>{'{'}</span>
                        <JSONTreeView 
                          data={item} 
                          theme={theme}
                          depth={2}
                        />
                        <span className={textColor} style={{ marginLeft: '20px' }}>
                          {'}'}
                          {index < data.length - 1 && ','}
                        </span>
                      </div>
                    )
                  ) : (
                    <div style={{ marginLeft: '20px' }}>
                      {renderPrimitiveValue(item, theme)}
                      {index < data.length - 1 && <span className={textColor}>,</span>}
                    </div>
                  )}
                </div>
              ))}
              <span className={textColor}>]</span>
            </>
          )}
        </div>
      );
    } else if (typeof data === 'object' && data !== null) {
      return (
        <div className="font-mono text-sm">
          <span className={textColor}>{'{'}</span>
          {Object.entries(data).map(([key, value], index, array) => (
            <div key={key}>
              {renderValue(value, key, `root.${key}`)}
            </div>
          ))}
          <span className={textColor}>{'}'}</span>
        </div>
      );
    } else {
      return (
        <div className="font-mono text-sm">
          {renderPrimitiveValue(data, theme)}
        </div>
      );
    }
  }

  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          {renderValue(value, key, `${depth}.${key}`)}
        </div>
      ))}
    </>
  );
};

const renderPrimitiveValue = (value: any, theme: 'dark' | 'light') => {
  const stringColor = theme === 'dark' ? 'text-green-400' : 'text-green-600';
  const numberColor = theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600';
  const booleanColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-600';
  const nullColor = theme === 'dark' ? 'text-red-400' : 'text-red-600';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

  if (typeof value === 'string') {
    return <span className={stringColor}>"{value}"</span>;
  } else if (typeof value === 'number') {
    return <span className={numberColor}>{value}</span>;
  } else if (typeof value === 'boolean') {
    return <span className={booleanColor}>{value.toString()}</span>;
  } else if (value === null) {
    return <span className={nullColor}>null</span>;
  } else {
    return <span className={textColor}>{String(value)}</span>;
  }
};

export default JSONTreeView;