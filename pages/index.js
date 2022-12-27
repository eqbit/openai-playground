import Head from "next/head";
import { useState } from "react";
import css from "./index.module.scss";
import { Modal } from "../modules/modal";

const Home = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');

  async function handleSubmit(event) {
    event?.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.results.data.map(item => item.url));
    } catch(error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleTextAreaKeyPressed = ({ metaKey, keyCode }) => {
    if (metaKey && keyCode === 13 && !isLoading) handleSubmit();
  }

  const handleClear = () => {
    setInput('');
  }

  return (
    <div>
      <Head>
        <title>Generate something</title>
        <link rel="icon" href={"/dog.png"} />
      </Head>

      <div className={css.wrapper}>
        <div className={css.leftContainer}>
          <form onSubmit={handleSubmit}>
          <textarea
              name="prompt"
              placeholder="Enter a prompt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={css.textarea}
              onKeyDown={handleTextAreaKeyPressed}
          />
            <div className={css.buttons}>
              <input type="submit" value="Generate" className={css.submit} disabled={isLoading} />
              <button type="button" className={css.clear} onClick={handleClear}>Clear</button>
            </div>
          </form>
        </div>

        <div className={css.result}>
          {isLoading ? (
              <div className={css.loading}><img src="/loading.png" alt="" className={css.loading}/></div>
          ) : (
              <div className={css.images}>
                {result.map(src => (
                    <div className={css.imageWrapper} onClick={() => {
                      setModalSrc(src);
                      setIsModalOpen(true);
                    }}>
                      <img src={src} alt="" className={css.image}/>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img src={modalSrc} alt='' />
      </Modal>
    </div>
  );
}

export default Home;
