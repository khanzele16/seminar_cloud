import React from "react";
import "./SeminarItem.css";
import { Seminar } from "../../shared/types";
import { Edit, Trash } from "lucide-react";
import { deleteSeminar, editSeminarId } from "../../redux/Slices/seminarSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

function SeminarItem({
  id,
  title,
  description,
  date,
  time,
}: Seminar): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const onSumbitRemove = () => {
    dispatch(deleteSeminar(id));
  }
  return (
    <div data-aos='fade-right' className="Seminar">
      <div className="Seminar-info">
        <div className="Seminar-info-top">
          <h2 id="seminar-title">{title}</h2>
          <div className="Seminar-info-top-options">
            <Edit size={18} onClick={() => dispatch(editSeminarId(id))} />
            <Trash size={18} onClick={() => onSumbitRemove()} />
          </div>
        </div>
        <p id="seminar-description">{description}</p>
      </div>
      <p id="seminar-time">{`${time}, ${date} г.`}</p>
    </div>
  );
}

export default SeminarItem;
