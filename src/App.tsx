import React, { useState } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const [isAfterReset, setIsAfterReset] = useState(true);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | number | null>(null); // 型を `NodeJS.Timer | number | null` に設定
  const [inputMinute, setInputMinute] = useState<number>(0);// 入力された分
  const [inputSecond, setInputSecond] = useState<number>(0);// 入力された秒

  const [startSecond, setStartSecond] = useState<number>(0);// タイマーを開始した秒


  // 停止再開を行う
  const handleStartStop = () => {
    console.log('handleStartStop');
    if (isActive) {
      // タイマーがアクティブな場合、停止する
      if (intervalId !== null) {
        clearInterval(intervalId as number); // 型キャストを使用
        setIntervalId(null);
      }
    } else {
      // タイマーが非アクティブな場合、再開する
      start(setSeconds, setIsActive, setIntervalId);

    }
    setIsActive(!isActive);
    setIsAfterReset(false);
  };

  // リセット後の開始を行う
  const handleStart = () => {
    console.log(inputSecond);
    console.log(inputMinute);
    setSeconds(inputSecond);
    setStartSecond(inputSecond);

    start(setSeconds, setIsActive, setIntervalId);

    setIsActive(true);
    setIsAfterReset(false);
  }

  // リセットを行う
  const handleReset = () => {
    console.log('handleReset');
    // タイマーをリセット
    if (intervalId !== null) {
      clearInterval(intervalId as number); // 型キャストを使用
      setIntervalId(null);
    }
    setSeconds(startSecond);
    setIsActive(false);
    setIsAfterReset(true);
  };

  // 時間表示を行う
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // 入力した秒を反映する
  const updateSecond = (event: any): void => {
    console.log('updateSecond');
    setInputSecond(event.target.value);
  };

  // 入力した分を反映する
  const updateMinute = (event: any): void => {
    console.log('updateMinute');
    setInputMinute(event.target.value);
  };

  return (
    <div>
      <h1>{formatTime(seconds)}</h1>
      {
        isAfterReset
          ? <button onClick={handleStart}>開始</button>
          : <button onClick={handleStartStop}>{isActive ? '停止' : '再開'}</button>
      }
      <button onClick={handleReset} disabled={isActive}>リセット</button>
      <div>設定
        <input type='number' pattern="^[0-9]+$" onChange={updateMinute}></input>分
        <input type='number' pattern="^[0-9]+$" onChange={updateSecond}></input>秒
      </div>
    </div>
  );
};

export default Timer;

// タイマーを減らす
function start(setSeconds: React.Dispatch<React.SetStateAction<number>>, setIsActive: React.Dispatch<React.SetStateAction<boolean>>, setIntervalId: React.Dispatch<React.SetStateAction<number | NodeJS.Timer | null>>) {
  const id = setInterval(() => {
    setSeconds(prevSeconds => {
      if (prevSeconds <= 1) {
        // タイマーを停止する
        clearInterval(id);
        setIsActive(false);
        return 0; // 時間を0に設定
      }
      return prevSeconds - 1; // 1秒ずつ減らす
    });
  }, 1000);
  setIntervalId(id as unknown as NodeJS.Timer);
}
