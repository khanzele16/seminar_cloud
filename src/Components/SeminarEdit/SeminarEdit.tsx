import React from "react";
import { Seminar } from "../../shared/types";
import "./SeminarEdit.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  addSeminar,
  editSeminar,
  editSeminarId,
} from "../../redux/Slices/seminarSlice";

function SeminarEdit({
  id,
  title,
  description,
  date,
  time,
}: Seminar): JSX.Element {
  const [seminar, setSeminar] = React.useState<Seminar>({
    id,
    title: title ? `${title} — изменяй` : "",
    description: description ? `${description} — изменяй` : "",
    date,
    time,
    photo: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const seminarItem = React.useRef();
  const onSumbitEdit = () => {
    if (id) {
      if (seminar.title && seminar.description) {
        dispatch(editSeminar(seminar));
        dispatch(editSeminarId(null));
      } else {
        alert("Введите название и описание семинара");
      }
    } else {
      console.log("id не найден");
    }
  };
  const onSumbitCancel = () => {
    dispatch(editSeminarId(null));
  };
  return (
    <div ref={seminarItem} className="EditSeminar">
      <div className="EditSeminar-info">
        <div className="EditSeminar-info-top">
          <input
            id="seminar-title"
            type="text"
            placeholder="Название семинара"
            value={seminar.title}
            onChange={(e) => setSeminar({ ...seminar, title: e.target.value })}
          />
        </div>
        <input
          id="seminar-description"
          type="text"
          placeholder="Описание семинара"
          value={seminar.description}
          onChange={(e) =>
            setSeminar({ ...seminar, description: e.target.value })
          }
        />
      </div>
      <p id="seminar-time">{`${time}, ${date}`} г.</p>
      <div className="EditSeminar-bottom-options">
        <button onClick={onSumbitEdit} id="button-save">
          Сохранить
        </button>
        <button onClick={onSumbitCancel} id="button-remove">
          Отменить
        </button>
      </div>
    </div>
  );
}

export default SeminarEdit;


