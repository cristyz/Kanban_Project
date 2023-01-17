import "./style.scss";

export function BaseSidebar() {
  return (
    <nav>
      <h1>Kanban</h1>

      <div className="menu">
        <div className="menu_session">
          <span className="menu_session__title">All boards (8)</span>

          <div className="menu_session__item menu_session__item_active">
            <span>Platform Launch</span>
          </div>
          <div className="menu_session__item">
            <span>Marketing Plan</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
