export const parseFormula = (formula, data) => {
    if (!formula.startsWith('=')) return formula; // Not a formula
  
    try {
      let expression = formula.substring(1); // Remove '='
  
      // Replace cell references (e.g., A1, B2) with actual values
      expression = expression.replace(/([A-Z]+)(\d+)/g, (_, col, row) => {
        const colIndex = col.charCodeAt(0) - 65; // Convert A -> 0, B -> 1, etc.
        const rowIndex = parseInt(row, 10) - 1;
        return data[rowIndex]?.[colIndex] || '0'; // Default to 0 if empty
      });
  
      // Handle functions
      if (expression.startsWith('SUM(')) {
        const range = getRangeValues(expression, data);
        return range.reduce((acc, val) => acc + parseFloat(val || 0), 0);
      }
      if (expression.startsWith('AVERAGE(')) {
        const range = getRangeValues(expression, data);
        return range.reduce((acc, val) => acc + parseFloat(val || 0), 0) / range.length;
      }
      if (expression.startsWith('MAX(')) {
        return Math.max(...getRangeValues(expression, data));
      }
      if (expression.startsWith('MIN(')) {
        return Math.min(...getRangeValues(expression, data));
      }
      if (expression.startsWith('COUNT(')) {
        return getRangeValues(expression, data).filter((val) => !isNaN(val)).length;
      }
  
      return eval(expression); // Evaluate simple math operations
    } catch (e) {
      return 'Error'; // Invalid formula
    }
  };
  
  // Helper function to extract range values (e.g., A1:A5)
  const getRangeValues = (expression, data) => {
    const match = expression.match(/\((.*?)\)/);
    if (!match) return [];
    const [start, end] = match[1].split(':');
    const [col1, row1] = [start[0], parseInt(start.substring(1), 10)];
    const [col2, row2] = [end[0], parseInt(end.substring(1), 10)];
  
    const colIndex1 = col1.charCodeAt(0) - 65;
    const colIndex2 = col2.charCodeAt(0) - 65;
  
    const values = [];
    for (let r = row1 - 1; r <= row2 - 1; r++) {
      for (let c = colIndex1; c <= colIndex2; c++) {
        values.push(parseFloat(data[r]?.[c] || 0));
      }
    }
    return values;
  };