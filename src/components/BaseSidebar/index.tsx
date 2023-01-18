import { classNames as cn } from "../../helpers/class-name";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeProjectSelectedId } from "../../store/kanban/slice";
import "./style.scss";

export function BaseSidebar() {
  const kanbanStore = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();

  return (
    <nav>
      <h1>Kanban</h1>

      <div className="menu">
        <div className="menu_session">
          <span className="menu_session__title">All boards (8)</span>

          {kanbanStore.projects.map((project) => (
            <div
              className={cn("menu_session__item", {
                menu_session__item_active:
                  project.id === kanbanStore.projectSelectedId,
              })}
              key={project.id}
              onClick={() => dispatch(changeProjectSelectedId(project.id))}
            >
              <span>{project.title}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
