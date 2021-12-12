import { PureComponent } from "react";

import s from "./Attribute.module.css";

class Attribute extends PureComponent {
  render() {
    const attribute = this.props.attribute;
    const selectedAttrs = this.props.selectedAttrs;
    const isSwatch = attribute.type === "swatch";

    const isSelected = (currentItemId, selectedAttrs) => {
      return selectedAttrs.some((attr) => attr.items[0].id === currentItemId);
    };

    return (
      <>
        {isSwatch && (
          <>
            <h2 className={s.title}>{attribute.name}:</h2>
            <ul className={s.list}>
              {attribute.items.map((item) => (
                <li key={item.id} className={s.item}>
                  <div
                    className={
                      isSelected(item.id, selectedAttrs)
                        ? `${s.swatchContainerActive} ${s.swatchContainer}`
                        : s.swatchContainer
                    }
                    style={{
                      backgroundColor: `${item.value}`,
                    }}
                  ></div>
                </li>
              ))}
            </ul>
          </>
        )}
        {!isSwatch && (
          <>
            <h2 className={s.title}>{attribute.name}</h2>
            <ul className={s.list}>
              {attribute.items.map((item) => (
                <li key={item.id} className={s.item}>
                  <div
                    className={
                      isSelected(item.id, selectedAttrs)
                        ? `${s.containerActive} ${s.sizeContainer}`
                        : s.sizeContainer
                    }
                  >
                    <p className={s.text}>{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}

Attribute.defaultProps = {
  selectedAttrs: [],
};

export default Attribute;
