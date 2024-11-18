import React, { useState } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(120);// タイマーに使用する秒
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
    setStartSecond(seconds);

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
    const displayMinutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    return `${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
  };

  // 入力した秒を反映する
  const updateSecond = (event: any): void => {
    setInputSecond(event.target.value);
    console.log('updateSecond,inputSecond:' + inputSecond);
  };

  // 入力した分を反映する
  const updateMinute = (event: any): void => {
    setInputMinute(event.target.value);
    console.log('updateMinute,inputMinute:' + inputMinute);
  };

  // 入力した分秒をタイマーに反映する
  const updateTimer = (event: any): void => {
    console.log('updateTimer');
    const result = inputMinute * 60 + inputSecond;//TODO 文字列計算される（1:44を入れると6044=100分44秒にされる）
    setSeconds(result);
    console.log("seconds:" + seconds);
    setIsAfterReset(true);
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
        <button onClick={updateTimer} disabled={isActive}>入力内容をタイマーに反映する</button>
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
