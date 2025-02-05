import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeminars } from "./redux/Slices/seminarSlice";
import { AppDispatch } from "./redux/store";
import { Seminar } from "./shared/types";
import SeminarItem from "./Components/SeminarItem/SeminarItem";
import SeminarEdit from "./Components/SeminarEdit/SeminarEdit";
import AOS from "aos";
import "./App.css";
import "aos/dist/aos.css";

const fakeArray = [...new Array(12)];

const App: React.FC = () => {
  // Изменил название страницы
  document.title = "Семинары";
  const dispatch = useDispatch<AppDispatch>();
  // Получение семинаров
  const seminars = useSelector(
    (state: { seminar: { seminars: Seminar[] } }) => state.seminar.seminars
  );
  const status = useSelector(
    (state: { seminar: { status: string } }) => state.seminar.status
  );
  const seminarId = useSelector(
    (state: { seminar: { seminarId: number | null } }) =>
      state.seminar.seminarId
  );
  // Запрос семинаров
  React.useEffect(() => {
    dispatch(getSeminars());
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="App">
      <h1>Семинары</h1>
      <ul className="App-seminars">
        {status === "loading" &&
          fakeArray.map((_, index) => (
            <SeminarItem
              id={10000}
              title="Загрузка..."
              description="Загрузка..."
              date="Загрузка..."
              time="Загрузка..."
              photo="Загрузка..."
              key={index}
            />
          ))}
        {status === "loaded" &&
          seminars.map((seminar) => {
            if (!(seminarId === seminar.id))
              return <SeminarItem {...seminar} key={seminar.id} />;
            else return <SeminarEdit {...seminar} key={seminar.id} />;
          })}
      </ul>
    </div>
  );
};

export default App;
