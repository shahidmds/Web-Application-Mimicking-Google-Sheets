import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const ChartView = () => {
  const sheetData = useSelector((state) => state.sheet.data);

  const chartData = sheetData
    .filter((row) => row.length >= 2 && !isNaN(row[1]))
    .map((row, index) => ({
      name: row[0] || `Row ${index + 1}`,
      value: parseFloat(row[1]) || 0,
    }));

  return (
    <div style={styles.chartContainer}>
      <h2 style={styles.chartTitle}>Chart Representation</h2>
      {chartData.length > 0 ? (
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      ) : (
        <p style={styles.noDataMessage}>No valid data for chart. Please enter numeric values in Column B.</p>
      )}
    </div>
  );
};

const styles = {
  chartContainer: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  chartTitle: {
    color: '#333333',
    marginBottom: '20px',
  },
  noDataMessage: {
    color: '#666666',
  },
};

export default ChartView;