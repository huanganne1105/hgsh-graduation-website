import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import "./style.css";

const BASE = import.meta.env.BASE_URL;

const ASSETS = {
  home: BASE + "images/home.png",
  logo: BASE + "images/logo.png",
  bg1: BASE + "images/bg1.png",
  bg2: BASE + "images/bg2.png",
};
Object.values(ASSETS).forEach((src) => {
  const img = new Image();
  img.src = src;
});
const RESULT_IMAGES = [
  BASE + "images/cat.png",
  BASE + "images/dove.png",
  BASE + "images/dog.png",
  BASE + "images/star.png",
  BASE + "images/unicorn.png",
  BASE + "images/unicorn1.png",
];

RESULT_IMAGES.forEach((src) => {
  const img = new Image();
  img.src = src;
});

const quiz = {
  results: {
    dove: {
      name: "自由的粉紅鴿子",
      image: BASE + "images/dove.png",
      description: "你像一隻自由飛行的粉紅鴿，人生沒有標準答案。你不一定照著大家期待的路走，但總能找到最舒服的方向。",
    },
    unicorn: {
      name: "浪漫獨角獸",
      images: [
        BASE + "images/unicorn.png",
        BASE + "images/unicorn1.png",
      ],
      description: "你自帶粉紅泡泡濾鏡，總能在日常裡發現浪漫。\n對你來說，青春不是行程表，而是一場閃閃發光的相遇。",
    },
    star: {
      name: "神秘星星",
      image: BASE + "images/star.png",
      description: "你看起來冷靜又有點厭世，但其實很清楚自己要什麼。你不一定熱情外放，卻有自己的宇宙和節奏。",
    },
    happy: {
      name: "快樂 Happy 小天使",
      image: BASE + "images/dog.png",
      description: "你是校園裡的正能量代表，遇到事情總能用可愛又堅定的方式面對，你的存在對竹女的大家本身就很有安定感。\n無論何時你都能在草原上無憂無慮地奔跑。致：和我們一起畢業的 Happy",
    },
    cat: {
      name: "傲嬌小橘渣男",
      image: BASE + "images/cat.png",
      description: "你嘴上可能很嗆，心裡其實超在乎。\n你有自己的個性和底線，不輕易被馴服，但熟了之後超可愛。\n摸完或吃完食物的你總是轉身就走，因此被戲稱渣男，而一直出現在校園的你，早已被我們當竹女的一員。\n致：天上的傲嬌小橘 / OK貓",
    },
  },

  questions: [
    {
      text: "在進竹女的第一天\n你聽到了一個聲音在指引你\n你覺得他是誰？",
      options: [
        { text: "未來的自己", type: "star" },
        { text: "過往的朋友", type: "unicorn" },
        { text: "阿忠老師", type: "happy" },
        { text: "天神", type: "dove" },
        { text: "竹女交流群的各位", type: "cat" },
      ],
    },
    {
      text: "你在竹女怎麼找到生態池的？",
      options: [
        { text: "我玩皮克敏知道的", type: "happy" },
        { text: "我進竹女前就知道", type: "star" },
        { text: "我不需要知道", type: "dove" },
        { text: "我看到這題才知道", type: "unicorn" },
        { text: "我知道了我又不知道了", type: "cat" },
      ],
    },
    {
      text: "我記得每隻校貓校狗的名字\n你呢？",
      options: [
        { text: "我高一就記得了", type: "unicorn" },
        { text: "我還沒進校園就知道了", type: "happy" },
        { text: "我不在意貓貓狗狗", type: "star" },
        { text: "我只記得住一兩隻", type: "cat" },
        { text: "原來竹女有校貓校狗？", type: "dove" },
      ],
    },
    {
      text: "請選擇你的午餐",
      options: [
        { text: "OK", type: "cat" },
        { text: "便當", type: "happy" },
        { text: "訂外送", type: "dove" },
        { text: "自己帶午餐", type: "unicorn" },
        { text: "不吃", type: "star" },
      ],
    },
    {
      text: "又到了下次會考時間\n你會鼓勵學妹來竹女嗎？",
      options: [
        { text: "筷陶！！！", type: "star" },
        { text: "竹女是烏托邦！快來", type: "happy" },
        { text: "考得上就來啊", type: "cat" },
        { text: "想來就來，想走就走", type: "dove" },
        { text: "你會遇到你的粉紅泡泡，快來 ❤️", type: "unicorn" },
      ],
    },
    {
      text: "你平常穿什麼衣服？",
      options: [
        { text: "穿學校規定衣服", type: "happy" },
        { text: "我不穿衣服", type: "star" },
        { text: "抓到哪件穿哪件", type: "dove" },
        { text: "穿情侶裝", type: "unicorn" },
        { text: "你管我穿什麼", type: "cat" },
      ],
    },
    {
      text: "你放學會去做什麼？",
      options: [
        { text: "去運動", type: "happy" },
        { text: "去補習", type: "star" },
        { text: "先吃東西再說", type: "cat" },
        { text: "直接回家", type: "dove" },
        { text: "約會", type: "unicorn" },
      ],
    },
  ],
};

function pickResult(answers) {
  const scores = Object.keys(quiz.results).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});

  answers.forEach((type) => {
    scores[type]++;
  });

  const max = Math.max(...Object.values(scores));
  const winners = Object.keys(scores).filter((key) => scores[key] === max);
  const key = winners[Math.floor(Math.random() * winners.length)];

  return {
    key,
    scores,
    result: quiz.results[key],
  };
}

function App() {
  const [page, setPage] = useState("home");
  const [answers, setAnswers] = useState([]);
  const [firstAnswer, setFirstAnswer] = useState("");

  const current = answers.length;
  const done = current >= quiz.questions.length;
  const final = done ? pickResult(answers) : null;

  function reset() {
    setAnswers([]);
    setFirstAnswer("");
    setPage("home");
  }

  function choose(type, text) {
    if (current === 0) {
      setFirstAnswer(text);
    }

    setAnswers((prev) => [...prev, type]);
  }

  if (page === "home") {
    return (
      <main className="phone home-page">
        <img className="bg" src={ASSETS.home} alt="home" />
        <img className="home-logo" src={ASSETS.logo} alt="Serendipity" />
        <button
          className="start-hitbox"
          onClick={() => setPage("quiz")}
          aria-label="回到高一"
        />
      </main>
    );
  }

  if (!done) {
    const q = quiz.questions[current];

    return (
      <main className="phone quiz-page">
        <img
          className="bg"
          src={current % 2 === 0 ? ASSETS.bg1 : ASSETS.bg2}
          alt=""
        />

        <motion.section
          key={current}
          className="question-card"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="progress">
            {current + 1} / {quiz.questions.length}
          </div>

          <h1>
            {current > 0 && firstAnswer ? (
              <>
                <span className="first-answer">{firstAnswer}：</span>
                {"\n"}
                {q.text}
              </>
            ) : (
              q.text
            )}
          </h1>

          <div className="options">
            {q.options.map((option, index) => (
              <button
                key={index}
                onClick={() => choose(option.type, option.text)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </motion.section>
      </main>
    );
  }

  return (
    <main className="phone result-page">
      <img className="bg" src={ASSETS.bg1} alt="" />

      <motion.section
        className="result-card"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {final.key === "unicorn" ? (
          <div className="result-images">
            <img
              className="result-image unicorn-image"
              src={BASE + "images/unicorn.png"}
              alt="浪漫獨角獸"
            />

            <img
              className="result-image unicorn-image"
              src={BASE + "images/unicorn1.png"}
              alt="浪漫獨角獸"
            />
          </div>
        ) : (
          <img
            className={`result-image ${final.key}-image`}
            src={final.result.image}
            alt={final.result.name}
          />
        )}

        <p className="label">你的時空裂縫結果是</p>

        <h1>{final.result.name}</h1>

        <p className="desc result-description">
          {final.result.description}
        </p>

        <button className="retry" onClick={reset}>
          <RotateCcw size={18} />
          再體驗一次高中生活
        </button>
      </motion.section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
