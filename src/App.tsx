import React, { useState } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | number | null>(null); // 型を `NodeJS.Timer | number | null` に設定
  const [inputMinute, setInputMinute] = useState<number>(0);// 入力された分
  const [inputSecond, setInputSecond] = useState<number>(0);// 入力された秒

  const [startSecond, setStartSecond] = useState<number>(0);// タイマーを開始した秒



  const handleStartStop = () => {
    console.log('handleStartStop');
    if (isActive) {
      // タイマーがアクティブな場合、停止する
      if (intervalId !== null) {
        clearInterval(intervalId as number); // 型キャストを使用
        setIntervalId(null);
      }
    } else {
      // タイマーが非アクティブな場合、開始する
      //入力した数字を取得
      console.log(inputSecond);
      setSeconds(inputSecond);
      setStartSecond(inputSecond);

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
      setIntervalId(id as unknown as NodeJS.Timer); // 型キャストを使用
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    console.log('handleReset');
    // タイマーをリセット
    if (intervalId !== null) {
      clearInterval(intervalId as number); // 型キャストを使用
      setIntervalId(null);
    }
    setSeconds(startSecond);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const updateSecond = (event): void => {
    console.log('updateSecond');
    setInputSecond(event.target.value);
  };

  // const updateSecond = (second: number) => {
  //   console.log('updateSecond');
  //   //入力値を内部の変数inputSecondに反映する
  //   setInputSecond(second);
  // };
  //予期された型は、型 'DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>' に対してここで宣言されたプロパティ 'onChange' から取得されています
  //が出たので上記に修正

  return (
    <div>
      <h1>{formatTime(seconds)}</h1>
      <button onClick={handleStartStop}>{isActive ? '停止' : '開始'}</button>
      <button onClick={handleReset} disabled={isActive}>リセット</button>
      <div>設定
        <input value={inputMinute} type='number' pattern="^[0-9]+$" onChange={updateSecond}></input>分
        <input type='number' pattern="^[0-9]+$" onChange={updateSecond}></input>秒
      </div>
    </div>
  );
};

export default Timer;