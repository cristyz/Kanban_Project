import { classNames as cn } from "../../helpers/class-name";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeProjectSelectedId,
  createNewProject,
  removeProject,
} from "../../store/kanban/slice";
import "./style.scss";

export function BaseSidebar() {
  const kanbanStore = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();

  return (
    <nav>
      <h1>Kanban</h1>

      <div className="menu">
        <div className="menu_session">
          <span className="menu_session__title">
            All Projects ({kanbanStore.projects.length})
          </span>

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
              <span
                className="menu_session__remove_project_button"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeProject(project));
                }}
              >
                &#10006;
              </span>
            </div>
          ))}

          <div
            className="menu_session__create_project_button"
            onClick={() => dispatch(createNewProject())}
          >
            <span>+ Create Project</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
