import { useState } from 'react';
import './TxtFileLoader.css';

const TxtFileLoader = () => {
  const [txtFileContent, setTxtFileContent] = useState('');
  const [wordCountObj, setWordCountObj] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const handleTxtFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (fileExtension !== 'txt') {
        setError('Invalid file format. Only .txt files are allowed.');
      } else {
        reader.onload = (e) => {
          const fileContent = e.target.result;
          if (fileContent.trim() === '') {
            setError('File is empty.');
            setTxtFileContent('');
            setWordCountObj({});
            setShowResults(false);
          } else {
            setTxtFileContent(fileContent);
            countWordsInFile(fileContent);
            setShowResults(true);
            setError('');
          }
        };
        reader.onerror = (e) => {
          setError('Error occurred while reading the file.');
          //log into console
          console.log(`Error occurred while reading the file.: ${e}`);
        };
        reader.readAsText(file);
      }
    }
  };

  const countWordsInFile = (content) => {
    const words = content.split(/\s+/);
    const wordCountMap = {};
    words.forEach((word) => {
      wordCountMap[word] = (wordCountMap[word] || 0) + 1;
    });
    setWordCountObj(wordCountMap);
  };

  return (
    <div className='container'>
      <h2 data-testid='upload-helper-text'>
        Upload a .txt file to count the number of times each word appears in the
        file
      </h2>
      <input
        data-testid='txt-file-input'
        type='file'
        accept='.txt'
        onChange={handleTxtFileChange}
      />
      {error && (
        <div data-testid='error-msg' className='error'>
          Error: {error}
        </div>
      )}
      {showResults && (
        <>
          <h2>Results</h2>
          <div className='results'>
            <div className='content-section'>
              <h3 data-testid='file-content-heading'>Uploaded File Content:</h3>
              <pre>{txtFileContent}</pre>
            </div>
            <div className='word-count-section'>
              <h3>Word Count:</h3>
              <ul>
                {Object.entries(wordCountObj).map(([word, count]) => (
                  <li key={word}>{`${word}: ${count}`}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TxtFileLoader;
