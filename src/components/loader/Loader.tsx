import style from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.spinner}></div>
    </div>
  );
};