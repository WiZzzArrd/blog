import React from "react";
import style from "./notfound.module.scss";

export default function NotFound() {
  return (
    <div className={style.block}>
      <h2 className={style.title}>404</h2>
      <p className={style.text}>Страница не найдена...</p>
    </div>
  );
}
