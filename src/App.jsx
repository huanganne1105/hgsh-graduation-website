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

      <p className="label">
        你的時空裂縫結果是
      </p>

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
