import './App.css';
import { useState } from 'react';

function ImageButton() {

  const [image, setImage] = useState(null);

  const onClick = checked => {
    fetch('https://picsum.photos/800', {
      method: 'GET',
      mode: "cors"
    })
      .then(res => res.blob())
      .then(blob => {
        setImage([URL.createObjectURL(blob)]);
        console.log(URL.createObjectURL(blob));
      })
      .then(data => {
        // .thenは成功した時の処理を示す場合に使う。
        console.log('Success');
      })
      .catch((error) => {
        // .catchは失敗の時の処理を示す場合に使う。
        console.error('Error:', error);
      });


  };

  return (
    <div className="panel">
      <button onClick={onClick}>
        画像取得
      </button>
      <img src={image} width="800px" />
    </div>
  );
}

function App() {
  return (
    <div className="container is-fluid">
      <ImageButton />
    </div>
  );
}

const root = document.getElementById('root');
//ReactDOM.render(<App />, root);

export default App;
