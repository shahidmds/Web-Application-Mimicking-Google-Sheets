import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSheetData } from '../store';
import { parseFormula } from '../utils/formulaParser';

const Sheet = () => {
  const dispatch = useDispatch();
  const sheetData = useSelector((state) => state.sheet.data);
  const [selectedCell, setSelectedCell] = useState(null);
  const [formulaInput, setFormulaInput] = useState('');

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
    setFormulaInput(sheetData[row][col] || '');
  };

  const handleCellChange = (e, row, col) => {
    const newValue = e.target.value;
    const newData = sheetData.map((row) => [...row]);
    newData[row][col] = newValue;
    dispatch(setSheetData(newData));
  };

  const applyFormula = () => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    const newData = sheetData.map((row) => [...row]);
    newData[row][col] = parseFormula(formulaInput, sheetData);
    dispatch(setSheetData(newData));
    toast.success('Formula applied successfully!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const addRow = () => {
    const newRow = Array(sheetData[0].length).fill('');
    const newData = [...sheetData, newRow];
    dispatch(setSheetData(newData));
    toast.success('Row added successfully!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const addColumn = () => {
    const newData = sheetData.map((row) => [...row, '']);
    dispatch(setSheetData(newData));
    toast.success('Column added successfully!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div style={styles.sheetContainer}>
      <div style={styles.formulaBar}>
        <input
          type="text"
          value={formulaInput}
          onChange={(e) => setFormulaInput(e.target.value)}
          style={styles.formulaInput}
        />
        <button style={styles.applyButton} onClick={applyFormula}>Apply</button>
      </div>
      <div style={styles.controls}>
        <button style={styles.controlButton} onClick={addRow}>Add Row</button>
        <button style={styles.controlButton} onClick={addColumn}>Add Column</button>
      </div>
      <div style={styles.spreadsheet}>
        {sheetData.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                value={cell}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                style={styles.cell}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  formulaBar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  formulaInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #E0E0E0',
  },
  applyButton: {
    background: 'linear-gradient(135deg, #4CAF50, #81C784)',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  controlButton: {
    background: 'linear-gradient(135deg, #2196F3, #64B5F6)',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  },
  spreadsheet: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  row: {
    display: 'flex',
    gap: '10px',
  },
  cell: {
    flex: 1,
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #E0E0E0',
    backgroundColor: '#FFFFFF',
    transition: 'background 0.2s ease',
  },
};

export default Sheet;