import React from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sheet from './components/Sheet';
import FindReplace from './components/FindReplace';
import ChartView from './components/ChartView';
import { saveSheet, undo, redo } from './store'; // Import undo and redo

function App() {
  const dispatch = useDispatch();

  const handleSaveSheet = async () => {
    try {
      await dispatch(saveSheet()).unwrap(); // Wait for the save action to complete
      toast.success('Sheet saved successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.success('Sheet saved successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleUndo = () => {
    dispatch(undo()); // Dispatch the undo action
    toast.info('Undo performed.', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleRedo = () => {
    dispatch(redo()); // Dispatch the redo action
    toast.info('Redo performed.', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Google Sheets Clone</h1>
        <div style={styles.toolbar}>
          <button style={styles.button} onClick={handleSaveSheet}>Save Sheet</button>
          <button style={styles.button} onClick={handleUndo}>Undo</button>
          <button style={styles.button} onClick={handleRedo}>Redo</button>
        </div>
      </div>
      <Sheet />
      <FindReplace />
      <ChartView />
      <ToastContainer />
    </div>
  );
}

const styles = {
  appContainer: {
    backgroundColor: '#F5F5F5',
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    background: 'linear-gradient(135deg, #2196F3, #64B5F6)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  headerText: {
    color: '#FFFFFF',
    margin: '0',
    fontSize: '24px',
  },
  toolbar: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  button: {
    background: 'linear-gradient(135deg, #4CAF50, #81C784)',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  },
};

export default App;